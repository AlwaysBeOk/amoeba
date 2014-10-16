var express = require('express'),
  router = express.Router(),
  _ = require('underscore'),
  mongoose = require('mongoose'),
  Api = mongoose.model('Api'),
  validator = require('../lib/validator');

module.exports = function (app) {
  app.use('/apis', router);
};

var DEFAULT_SEARCH_RESULT_AMOUNT = 5,
  MAX_SEARCH_RESULT_AMOUNT = 10;

router.route('/')
//创建
.post(function (req, res, next) {
  req.api = req.body;

  try {
    normalizeKeys(req.api);
  }
  catch (err) {
    err.status = 400;
    return next(err);
  }

  findConflictedApi(req.api, function (err, conflictedApi) {
    if (err) return next(err);
    if (conflictedApi !== null) {
      //存在冲突的 api
      var err = new Error('API Conflicted');
      err.status = 409;
      res.set({
        'X-Conflicted-API-Path': conflictedApi.path
      });
      return next(err);
    }
    else {
      console.log('no api conflicted, continue.')
      return next();
    }
  });
})
.post(function (req, res, next) {
  res.api = new Api(req.api);
  res.api.save(function(err) {
    if (err) return next(err);
    next();
  });
})
.post(echo)
//搜索
.get(function queryParser (req, res, next) {
  var query = req.param('q'),
    amount = Math.floor(req.param('amount'));
  if (query === undefined) {
    var err = new Error('Param \'q\' Required');
    err.status = 400;
    return next(err);
  }
  if (amount < 1) amount = DEFAULT_SEARCH_RESULT_AMOUNT;
  if (amount > MAX_SEARCH_RESULT_AMOUNT) amount = MAX_SEARCH_RESULT_AMOUNT;

  var queryItems = query.split(' ');
  query = {};
  var path = queryItems.shift();
  if (path.length === 0) {
    var err = new Error('Query Illegal, Path Required');
    err.status = 400;
    return next(err);
  }
  path = new RegExp(path);
  _.each(queryItems, extendQuery, query);
  query.path = path;
  req.query = query;
  req.options = {
    amount: amount
  };
  console.log('Query: ', req.query, 'Options: ', req.options);
  next();
})
.get(function search(req, res, next) {
  Api.find(req.query, null, { limit: req.options.amount }, function(err, apis) {
    if (err) return next(err);
    res.apis = apis;
    next();
  });
})
.get(function echo(req, res, next) {
  res.json(_.map(res.apis, dropDbInfo));
});

router.route('/:namespace/:path')
.all(function paramsNormalizer (req, res, next) {
  req.api = {
    namespace: req.params.namespace,
    path: req.params.path
  };

  try {
    normalizeKeys(req.api);
  }
  catch (err) {
    err.status = 400;
    return next(err);
  }

  next();
})

//获取
.get(apiMatcher)
.get(echo)

//更新
.patch(apiMatcher)
.patch(function (req, res, next) {
  _.extend(res.api, req.body);
  var keyChanged = res.api.isModified('path') || res.api.isModified('namespace');
  if (keyChanged) {
    //检查是否合法
    try {
      normalizeKeys(res.api);
    }
    catch (err) {
      err.status = 400;
      err.message += " For Target API";
      return next(err);
    }
    findConflictedApi(res.api, function (err, conflictedApi) {
      if (err) return next(err);
      if (conflictedApi !== null) {
        //存在冲突的 api
        var err = new Error('API Conflicted');
        err.status = 409;
        res.set({
          'X-Conflicted-API-Path': conflictedApi.path
        });
        return next(err);
      }
      else {
        console.log('no api conflicted, continue.')
        return next();
      }
    });
  }
  else {
    console.log('no api keys change, continue.')
    next();
  }
})
.patch(function (req, res, next) {
  var r = res.api.save(function(err){
    if (err) return next(err);
    next();
  });
})
.patch(echo)

.put(apiMatcher)
.put(function (req, res, next) {
  //从 body 中获取新的 api，忽略其中的 namespace 与 path 字段
  var newApi = _.extend({}, req.body, req.api);
  res.api.update(newApi, { overwrite: true }, function(err) {
    if (err) return next(err);
    Api.findById(res.api.id, function(err, api) {
      if (err) return next(err);
      res.api = api;
      next();
    });
  });
})
.put(echo)

//删除（不允许）
.delete(function (req, res, next) {
  var err = new Error('Method Not Allowed');
  err.status = 405;
  next(err);
});

function normalizeKeys (api) {
  if (!api.namespace) {
    throw new Error('Namespace Required');
  }
  if (!api.path) {
    throw new Error('Path Required');
  }

  if (api.path[0] !== '/') {
    api.path = '/' + api.path;
  }

  if (!validator.namespace.test(api.namespace)) {
    throw new Error('Illegal Namespace');
  }
  if (!validator.path.test(api.path)) {
    throw new Error('Illegal Path');
  }
  return api;
}

//检查是否已经存在存在冲突的 api
function findConflictedApi (api, callback) {
  var condition = {
    namespace: api.namespace,
    path: api.path
  };
  //排除自身
  if (api._id) {
    condition._id = { $ne: api._id }
  }
  Api.findOne(condition, 'path', callback);
}

function apiMatcher(req, res, next) {
  Api.findOne({
    namespace: req.api.namespace,
    path: req.api.path
  }, function (err, api) {
    if (err) return next(err);
    if (api === null) {
      //没有匹配的 api
      var err = new Error('API Not Found');
      err.status = 404;
      return next(err);
    }
    res.api = api;
    next();
  });
}

//去掉不需要的数据库相关字段
function dropDbInfo (api) {
  if (api.toJSON) api = api.toJSON();
  return _.extend({}, api, {
    _id: undefined,
    __v: undefined //mongoose revision index
  });
}
function dropKeys (api) {
  if (api.toJSON) api = api.toJSON();
  return _.extend({}, api, {
    path: undefined,
    namespace: undefined
  });
}
function echo (req, res, next) {
  res.json(dropKeys(dropDbInfo(res.api)));
}

function extendQuery(item) {
  if (typeof this !== 'object') return;
  var itemParts = item.split(':'),
    conditionKey = itemParts[0],
    conditionValue = itemParts[1];
  if (conditionKey === '') return;
  if (conditionValue === undefined) conditionValue = true;
  this[conditionKey] = conditionValue;
  return this;
}