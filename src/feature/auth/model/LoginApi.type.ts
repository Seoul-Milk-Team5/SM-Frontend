export interface LoginRequest {
  employeeId: string;
  password: string;
}

export interface LoginRespnse {
  role?: string;
  code: string;
  message: string;
  result: {};
  success: boolean;
}
