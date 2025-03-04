export interface ApiResponse {
  code: number;
  message: string;
  result: ResponseItem[];
  success: boolean;
}
  
interface ResponseItem {
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
  isTemporary: boolean;
  createdAt: string; // ISO 8601 날짜 문자열
}
  