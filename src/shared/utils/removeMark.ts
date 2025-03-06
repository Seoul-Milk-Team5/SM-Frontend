export function removeMark(url: string): string {
    // URL의 끝이 '?'로 끝나는지 확인하고, 있으면 제거
    if (url.endsWith('?')) {
      return url.slice(0, -1);  // 마지막 문자인 '?'을 제거
    }
    return url;  // '?'이 없으면 그대로 반환
  }
  