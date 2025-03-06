import { getFetchHeader } from "../utils";
import { baseHttpClient } from ".";
import { ModalData } from "../model";



export async function InvoiceViewRequest(
  token: string,
  taxInvoiceId: number,
): Promise<ModalData> {
  const url = `api/validation/history/modal/${taxInvoiceId}`;
  const HEADER = getFetchHeader(token, "a");

  try{
    const response = await baseHttpClient().get<ModalData>(url, HEADER);
    return response;
  } catch (error) {
    console.log("상세 정보를 불러오는데 실패했습니다.", error);
    throw error;
  }
}