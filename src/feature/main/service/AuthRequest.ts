import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";
import { AuthRequestBody, AuthResponse, ReAuthResponse } from "../model";

export async function authRequest(token: string, body: AuthRequestBody): Promise<AuthResponse> {
  const HEADER = getFetchHeader(token, "a");
  console.log(body);

  try {
    return await baseHttpClient().post<AuthResponse, AuthRequestBody>("valid/non-verified", HEADER, body);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function reAuthRequest(token: string, key: string): Promise<ReAuthResponse> {
  const HEADER = getFetchHeader(token, "a");
  const keyObject = {
    key: key,
  };
  try {
    return await baseHttpClient().post<ReAuthResponse, { key: string }>("valid/verified", HEADER, keyObject);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
