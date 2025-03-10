export interface PasswordCheckResponse {
  code: string;
  message: string;
  result: string | { errorClass: string; errorMessage: string };
  success: string;
}
