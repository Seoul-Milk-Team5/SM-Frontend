import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";
import { MyPasswordChangeRequest, PasswordCheckResponse } from "../model";

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

export async function myPasswordChangeRequest(
  token: string,
  body: MyPasswordChangeRequest
): Promise<PasswordCheckResponse> {
  const HEADER = getFetchHeader(token, "a");

  try {
    return await baseHttpClient().patch<PasswordCheckResponse, MyPasswordChangeRequest>(
      "api/members/password",
      HEADER,
      body
    );
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
