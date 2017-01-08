export class Api {
  namespace: String;
  path: String;
  route: ApiItem[];
  disabled: boolean;
}

export class ApiItem {
  description: String = '';
  response : ApiResponseConfig
}

export class ApiResponseConfig {
  content: ApiResponse;
  inherited: boolean;
}

export class ApiResponse {
  status: String = '200';
  type: String = 'json';
  body: String = '';
}
