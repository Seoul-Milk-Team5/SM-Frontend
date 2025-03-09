import { getFetchHeader } from "@/shared/utils";
import { EmailPostResponse, EmailVerificationResponse } from "../model";
import { baseHttpClient } from "@/shared/api";

export async function emailPostRequest(body: string): Promise<EmailPostResponse> {
  const HEADER = getFetchHeader("", "b");

  try {
    return await baseHttpClient().post<EmailPostResponse, string>(
      `api/emails/verification-requests?email=${body}`,
      HEADER,
      ""
    );
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function emailVerificationRequest(body: {
  email: string;
  authCode: string;
}): Promise<EmailVerificationResponse> {
  const HEADER = getFetchHeader("", "b");

  try {
    return await baseHttpClient().post<EmailVerificationResponse, string>(
      `api/emails/verifications?email=${body.email}&authCode=${body.authCode}`,
      HEADER,
      ""
    );
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
