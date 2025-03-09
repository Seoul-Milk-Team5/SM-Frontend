import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";
import { PasswordResponse } from "../model";

export async function passwordChangeRequest(body: { password1: string; password2: string }): Promise<PasswordResponse> {
  const HEADER = getFetchHeader("", "b");

  try {
    return await baseHttpClient().post<PasswordResponse, { password1: string; password2: string }>(
      "api/members/users/password/reset",
      HEADER,
      body
    );
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
