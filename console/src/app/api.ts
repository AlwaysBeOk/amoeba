export class Api {
  namespace: String;
  path: String;
  route: ApiItem[];
  disabled: boolean;

  constructor () {
    this.route = [new ApiItem];
  }
}

export class ApiItem {
  description: String = '';
  response : ApiResponseConfig;

  constructor () {
    this.response = new ApiResponseConfig();
  }
}

export class ApiResponseConfig {
  content: ApiResponse;
  inherited: boolean = false;

  constructor () {
    this.content = new ApiResponse();
  }
}

export class ApiResponse {
  status: String = '200';
  type: String = 'json';
  body: String = '{}';
}
