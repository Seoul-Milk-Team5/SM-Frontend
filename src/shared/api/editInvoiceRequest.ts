import { baseHttpClient } from ".";
import { getFetchHeader } from "../utils";

interface ChangeInvoiceParams {
  taxInvoiceId: number;
  issueId: string;
  erDat: string;
  suId: string;
  ipId: string;
  chargeTotal: number;
}

interface ChangeInvoiceResult {
  taxInvoiceId: number;
  issueId: string;
  erDat: string;
  suId: string;
  ipId: string;
  chargeTotal: number;
}

interface ChangeInvoiceResponse {
  code: number;
  message: string;
  result: ChangeInvoiceResult;
  success: boolean;
}

export async function editInvoiceRequest(
  token: string,
  data: ChangeInvoiceParams
): Promise<ChangeInvoiceResult> {
  const url = "api/validation/history/change";
  const HEADER = getFetchHeader(token, "a");

  try {
    const response = await baseHttpClient().post<ChangeInvoiceResponse, ChangeInvoiceParams>(url, HEADER, data);
    
    if (!response.success) {
      throw new Error(`API 요청 실패: ${response.message}`);
    }
    
    return response.result;
  } catch (error) {
    console.error("필수 컬럼 수정 API 요청 실패", error);
    throw error;
  }
}
