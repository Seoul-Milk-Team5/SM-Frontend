export interface AuthRequestBody {
  loginTypeLevel: string;
  userName: string;
  phoneNo: string;
  identity: string;
  telecom: string;
  taxInvoiceInfoList: {
    supplierRegNumber: string;
    contractorRegNumber: string;
    approvalNo: string;
    reportingDate: string;
    supplyValue: string;
  }[];
}

export interface AuthResponse {
  code: number | string;
  message: string;
  result:
    | {
        key: string;
      }
    | { errorClass: string; errorMessage: string }
    | string;
  success: boolean;
}

export interface ReAuthResponse {
  code: number | string;
  message: string;
  result: { errorClass: string; errorMessage: string } | string;
  success: boolean;
}
