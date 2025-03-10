import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";
import { PasswordCheckResponse } from "../model/Password.type";

export async function passwordCheckRequest(token: string, password: string): Promise<PasswordCheckResponse> {
  const HEADER = getFetchHeader(token, "a");

  const passwordObject = {
    password: password,
  };

  try {
    return await baseHttpClient().post<PasswordCheckResponse, { password: string }>(
      "api/members/password/verify",
      HEADER,
      passwordObject
    );
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
