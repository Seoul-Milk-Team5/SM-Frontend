import { getFetchHeader } from "@/shared/utils";
import { ApiResponse } from "../model/SearchFIle.type";
import { baseHttpClient } from "@/shared/api";

export async function searchFileGetRequest(token : string): Promise<ApiResponse> {
  const HEADER = getFetchHeader(token, "a");
  try{
    return await baseHttpClient().get<ApiResponse>("api", HEADER);
  } catch (error) {
    console.log(error);
    throw error;
  }
}