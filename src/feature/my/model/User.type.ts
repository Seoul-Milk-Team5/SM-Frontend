export interface UserInformationResponse {
  code: number;
  message: string;
  result: {
    id: number;
    name: string;
    email: string;
    employeeId: string;
    role: string;
  };
  success: boolean;
}
