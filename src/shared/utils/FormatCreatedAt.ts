export function FormatCreatedAt(createdAt: number[]): string {
    if (!createdAt || createdAt.length < 3) return "날짜 없음";
  
    const [year, month, day] = createdAt;
    
    const shortYear = String(year).slice(2);
  
    const formattedMonth = String(month).padStart(2, "0");
    const formattedDay = String(day).padStart(2, "0");
  
    return `${shortYear}.${formattedMonth}.${formattedDay}`;
  }
  