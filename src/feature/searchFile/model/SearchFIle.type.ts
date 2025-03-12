interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
  
interface Pageable {
  offset: number;
  sort: Sort;
  pageNumber: number;
  unpaged: boolean;
  pageSize: number;
  paged: boolean;
}
  
export interface ContentItem {
  id: number;
  suBusinessName: string;
  ipBusinessName: string;
  createdAt: number[]; // ISO8601 날짜 형식
  url: string;
  processStatus: "UNAPPROVED" | "APPROVED" | "REJECTED"; // 상태값을 Enum으로 정의 가능
}
  
interface Page {
  totalElements: number;
  totalPages: number;
  size: number;
  content: ContentItem[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}
  
  interface Result {
    page: Page;
    total: number;
    approved: number;
    rejected: number;
    unapproved: number;
  }
  
  export interface ApiResponse {
    code: number;
    message: string;
    result: Result;
    success: boolean;
  }
  