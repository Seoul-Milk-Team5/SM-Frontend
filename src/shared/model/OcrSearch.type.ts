export interface ApiResponse {
  code: number;
  message: string;
  result:Result;
  success: boolean;
}
  
export interface Result {
  totalElements: number;
  totalPages: number;
  size: number;
  content:InvoiceContent[];
  number: number;
  sort:Sort;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}
  
export interface InvoiceContent {
  id: number;
  employeeId: string;
  status: string;
  issueId: string;
  ipId: string;
  suId: string;
  chargeTotal: number;
  taxtotal: number;
  grandTotal: number;
  erDat: string;
  ipBusinessName: string;
  suBusinessName: string;
  ipName: string;
  suName: string;
  ipEmail: string;
  suEmail: string;
  imageUrl: string;
  errorDetails: string[];
  isTemporary: string;
  createAt: number[];
  writer: string;
}
  
interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
  
export interface Pageable {
  offset: number;
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}
  
export interface SearchParams {
  provider?: string,
  consumer?: string,
  employeeId?: string,
  date?: string,
  period?: number,
  status?: "UNAPPROVED" | "APPROVED" | "REJECTED" | null,
  page?: number,
  size?: number,
}