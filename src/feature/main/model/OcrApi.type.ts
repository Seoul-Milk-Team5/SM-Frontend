export interface OcrPostResponse {
  code: number;
  message: string;
  result: OcrData[];
  success: boolean;
}

export interface OcrData {
  extractedData: {
    issueId: string;
    suId: string;
    ipId: string;
    erDat: string;
    chargeTotal: string;
  };
  processStatus: "PENDING" | "UNAPPROVED";
}
