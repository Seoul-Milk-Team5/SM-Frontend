const processStatuses = ["ALL", "UNAPPROVED", "APPROVED", "REJECTED"] as const; //전체, 검증실패, 승인, 반려
type ProcessStatus = typeof processStatuses[number];

export const getStatusLabel = (status: ProcessStatus) => {
  switch (status) {
    case "ALL":
      return "전체";
    case "UNAPPROVED":
      return "검증실패";
    case "APPROVED":
      return "승인";
    case "REJECTED":
      return "반려";
    default:
      return status; // 예외 처리
  }
};
