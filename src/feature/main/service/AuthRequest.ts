import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";
import { AuthRequestBody, AuthResponse, ReAuthResponse } from "../model";

export async function authRequest(token: string, body: AuthRequestBody): Promise<AuthResponse> {
  const HEADER = getFetchHeader(token, "a");

  try {
    return await baseHttpClient().post<AuthResponse, AuthRequestBody>("valid/non-verified", HEADER, body);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function reAuthRequest(token: string, key: string): Promise<ReAuthResponse> {
  const HEADER = getFetchHeader(token, "a");

  try {
    return await baseHttpClient().post<ReAuthResponse, string>("valid/verified", HEADER, key);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
