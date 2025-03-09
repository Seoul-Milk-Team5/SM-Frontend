export function formatDate(input: string): string {
  // Case 1: "25.03.08" 형식 (YY.MM.DD) → 그대로 반환
  if (/^\d{2}\.\d{2}\.\d{2}$/.test(input)) {
    return input;
  }

  // Case 2: "2025-03-08T09:29:52.861Z" 형식 (ISO 8601)
  const date = new Date(input);
  if (isNaN(date.getTime())) return "유효하지 않은 날짜"; // 유효하지 않은 입력 처리

  const year = date.getFullYear().toString().slice(2); // 연도의 마지막 두 자리
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // 월
  const day = date.getDate().toString().padStart(2, "0"); // 일

  return `${year}.${month}.${day}`;
}
