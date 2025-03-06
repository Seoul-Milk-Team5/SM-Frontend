import { getFetchHeader } from "../utils";
import { baseHttpClient } from ".";
import { ApprovedData } from "../model";


export async function ApprovedGetRequest(
  token: string,
  taxInvoiceId: number,
): Promise<ApprovedData> {
  const url = `api/validation/history/modal/${taxInvoiceId}`;
  const HEADER = getFetchHeader(token, "a");

  try{
    const response = await baseHttpClient().get<ApprovedData>(url, HEADER);
    return response;
  } catch (error) {
    console.log("상세 정보를 불러오는데 실패했습니다.", error);
    throw error;
  }
}