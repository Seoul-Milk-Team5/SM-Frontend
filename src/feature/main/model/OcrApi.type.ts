export interface OcrPostResponse {
  code: number;
  message: string;
  result: OcrData[];
  success: boolean;
}

export interface OcrData {
  extractedData: {
    approval_number: string;
    recipient_registration_number: string;
    supplier_registration_number: string;
    issue_date: string;
    chargeTotal: string;
  };
}
