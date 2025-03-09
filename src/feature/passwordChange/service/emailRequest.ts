import { getFetchHeader } from "@/shared/utils";
import { EmailPostResponse } from "../model";
import { baseHttpClient } from "@/shared/api";

export async function emailPostRequest(token: string, body: string): Promise<EmailPostResponse> {
  const HEADER = getFetchHeader(token, "a");

  try {
    return await baseHttpClient().post<EmailPostResponse, string>("api/emails/verifiation-requests", HEADER, body);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function emailVerificationRequest(token: string, body: string): Promise<EmailPostResponse> {
  const HEADER = getFetchHeader(token, "a");

  try {
    return await baseHttpClient().post<EmailPostResponse, string>("api/emails/verifiations", HEADER, body);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
