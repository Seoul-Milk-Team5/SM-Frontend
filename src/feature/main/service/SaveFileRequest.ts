import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";
import { SaveFileGetResponse } from "../model";

export async function saveFileGetRequest(token: string): Promise<SaveFileGetResponse> {
  const HEADER = getFetchHeader(token, "a");
  try {
    return await baseHttpClient().get<SaveFileGetResponse>("api/tax/tmp", HEADER);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

// export async function saveFilePostRequest(token: string): Promise<SaveFileResponse> {
//   const HEADER = getFetchHeader(token, "a");
//   try {
//     return await baseHttpClient().post<SaveFileResponse>("api/tax/tmp/mark", HEADER);
//   } catch (error) {
//     console.error("Fetch error:", error);
//     throw error;
//   }
// }
