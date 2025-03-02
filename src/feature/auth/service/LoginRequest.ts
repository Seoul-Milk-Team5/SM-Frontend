import { getFetchHeader } from "@/shared/utils";
import { baseHttpClient } from "@/shared/api";
import { LoginRequest, LoginRespnse } from "../model";

export async function loginRequest(body: LoginRequest): Promise<LoginRespnse> {
  const HEADER = getFetchHeader("", "b");
  try {
    return await baseHttpClient().post<LoginRespnse, LoginRequest>("login", HEADER, body);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
