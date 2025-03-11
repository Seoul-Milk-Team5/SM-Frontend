export async function DownloadExcel(token: string, taxInvoiceId: number[]) {
    if (taxInvoiceId.length === 0) {
      alert("내보낼 항목을 선택하세요.");
      return;
    }
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const url = `${BASE_URL}/api/ocr/excel-file?taxInvoiceIds=${taxInvoiceId.join(",")}`;
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // Excel 파일 형식
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const blob = await response.blob(); // 파일 데이터 가져오기
      const urlObject = window.URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = urlObject;
      a.download = "tax_invoice.xlsx"; // 원하는 파일명 지정
      document.body.appendChild(a);
      a.click();
  
      document.body.removeChild(a);
      window.URL.revokeObjectURL(urlObject);
    } catch (error) {
      console.error("엑셀 파일 다운로드 실패", error);
      alert("엑셀 파일을 다운로드하는데 실패했습니다.");
    }
  }
  