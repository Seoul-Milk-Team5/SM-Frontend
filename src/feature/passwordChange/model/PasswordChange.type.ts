export interface FormData {
  userId: string;
  email: string;
  authNumber: string;
  password: string;
  rePassword: string;
}

export interface Errors {
  [key: string]: string;
}

export interface IsButtonDisabled {
  userId: boolean;
  email: boolean;
  authNumber: boolean;
}

export interface EmailPostResponse {
  code: number | string;
  message: string;
  result: { errorClass: string; errorMessage: string } | string;
  success: boolean;
}

export interface EmailVerificationResponse {
  code: number | string;
  message: string;
  result: { errorClass: string; errorMessage: string } | string;
  success: boolean;
}

export interface EmployeeIdResponse {
  code: number | string;
  message: string;
  result: { errorClass: string; errorMessage: string } | string;
  success: boolean;
}
