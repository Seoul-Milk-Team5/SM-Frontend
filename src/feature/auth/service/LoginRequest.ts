import { getFetchHeader } from "@/shared/utils";
import { baseHttpClient } from "@/shared/api";
import { LoginRequestBody } from "../model";

export async function LoginRequest(body: LoginRequestBody): Promise<string> {
  const HEADER = getFetchHeader("", "b");
  try {
    return await baseHttpClient().post<string, LoginRequestBody>("login", HEADER, body);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
