export interface PasswordCheckResponse {
  code: string;
  message: string;
  result: string | { errorClass: string; errorMessage: string };
  success: string;
}

export interface MyPasswordChangeRequest {
  currentPassword: string;
  newPassword1: string;
  newPassword2: string;
}
