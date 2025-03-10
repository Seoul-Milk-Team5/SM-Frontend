import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";
import { UserInformationResponse } from "../model";

export async function userInformationRequest(token: string): Promise<UserInformationResponse> {
  const HEADER = getFetchHeader(token, "a");

  try {
    return await baseHttpClient().get<UserInformationResponse>("api/members/myPage", HEADER);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
