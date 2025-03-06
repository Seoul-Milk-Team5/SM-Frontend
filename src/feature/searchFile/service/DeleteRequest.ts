import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";

export async function DeleteRequest(
  taxInvoiceIdList : number[],
  token: string,
) {
  const url = "api/validation/history";
  const HEADER = getFetchHeader(token, "a");

  try{
    const response = await baseHttpClient().delete(url, HEADER, { taxInvoiceIdList });
    return response;
  } catch (error) {
    console.log("삭제하는데 실패했습니다.", error);
    throw error;
  }
}