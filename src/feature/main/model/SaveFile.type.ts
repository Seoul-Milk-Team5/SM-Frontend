export interface SaveFileGetResponse {
  code: number;
  message: string;
  result: {
    totalElements: number;
    totalPages: number;
    size: number;
    content: [
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
        isTemporary: string;
        createdAt: string;
      },
    ];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    pageable: {
      offset: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      pageNumber: number;
      pageSize: number;
      paged: boolean;
    };
  };
}

export interface SaveFilePostResponse {
  code: number;
  message: string;
  result:
    | string
    | {
        errorClass: string;
        errorMessage: string;
      };
  success: boolean;
}
