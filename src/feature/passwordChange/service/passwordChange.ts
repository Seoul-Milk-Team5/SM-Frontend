import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";
import { PasswordResponse } from "../model";

export async function passwordChangeRequest(body: {
  employeeId: string;
  password1: string;
  password2: string;
}): Promise<PasswordResponse> {
  const HEADER = getFetchHeader("", "b");
  console.log(body);
  try {
    return await baseHttpClient().patch<PasswordResponse, { employeeId: string; password1: string; password2: string }>(
      "api/members/users/password/reset",
      HEADER,
      body
    );
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
