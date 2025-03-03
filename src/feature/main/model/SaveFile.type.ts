export interface SaveFileGetResponse {
  code: number;
  message: string;
  result: [
    {
      id: number;
      employeeId: string;
      status: string;
      issueId: string;
      ipId: string;
      suId: string;
      taxTotal: number;
      erDat: string;
      ipBusinessName: string;
      suBusinessName: string;
      ipName: string;
      suName: string;
      imageUrl: string;
      errorDetails: string[];
    },
  ];
  success: boolean;
}
