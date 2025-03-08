import { baseHttpClient } from ".";
import { getFetchHeader } from "../utils";


interface ApiResponse {
  code: number;
  message: string;
  result:Result;
  success: boolean;
}

interface Result {
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

interface InvoiceContent {
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
  createAt: string;
}

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

interface searchParams {
  provider?: string,
  consumer?: string,
  employeeId?: string,
  date?: string,
  period?: number,
  status?: "UNAPPROVED" | "APPROVED" | "REJECTED" | null,
  page?: number,
  size?: number,
}

export async function OcrSearchRequest(token: string, params: searchParams): Promise<ApiResponse> {
  const HEADER = getFetchHeader(token, "a");
  const url = '/api/ocr/search';

  try{
    const response = await baseHttpClient().get<ApiResponse>(url, HEADER, params);
    return response;
  } catch (error) {
    console.log("내 업무 조회 실패", error);
    throw error;
  }
}