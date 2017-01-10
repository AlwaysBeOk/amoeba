export class Api {
  namespace: string;
  path: string;
  route: ApiItem[];
  disabled: boolean;

  constructor () {
    this.route = [new ApiItem];
  }
}

export class ApiItem {
  description: string = 'Default API';
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
  status: string = '200';
  type: string = 'json';
  body: string = '{}';
}
