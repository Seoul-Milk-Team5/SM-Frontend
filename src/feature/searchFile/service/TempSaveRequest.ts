import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";


export async function TempSaveRequest(
  taxInvoiceIdList: number[],
  token: string
) {
  const url = "api/validation/history/temp";
  const HEADER = getFetchHeader(token, "a");

  try{
    const response = await baseHttpClient().post(url, HEADER, { taxInvoiceIdList });
    return response;
  } catch (error) {
    console.error("임시저장에 실패했습니다.", error);
    throw error;
  }
}