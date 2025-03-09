import { baseHttpClient } from ".";
import { ApiResponse, SearchParams } from "../model";
import { getFetchHeader } from "../utils";

export async function OcrSearchRequest(token: string, params: SearchParams): Promise<ApiResponse> {
  const HEADER = getFetchHeader(token, "a");
  const url = '/api/ocr/search';

  try{
    const response = await baseHttpClient().get<ApiResponse>(url, HEADER, params);
    return response;
  } catch (error) {
    console.log("내 업무 조회 실패", error);
    throw error;
  }
}