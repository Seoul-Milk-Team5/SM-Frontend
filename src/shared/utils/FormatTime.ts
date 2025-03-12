export function formatTimeFromFiles(fileCount: number): string {
  // 총 초 계산 (파일 개수 * 2초)
  const totalSeconds = fileCount * 3;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // "MM분 SS초" 형식으로 반환
  return `${String(minutes).padStart(2, "0")}분 ${String(seconds).padStart(2, "0")}초`;
}
