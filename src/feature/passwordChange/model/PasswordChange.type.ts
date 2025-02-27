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
