import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";

interface ApiResponse {
  code: number;
  message: string;
  result: boolean;
  success: string;
}

export async function EmployeeIdExists(token: string, employeeId: string): Promise<ApiResponse> {
  const HEADER = getFetchHeader(token, "a");

  try{
    const url = `api/members/exists/${employeeId}`;
    const response = await baseHttpClient().get<ApiResponse>(url, HEADER);
    return response;
  } catch (error) {
    console.log("중복확인에 실패했습니다.", error);
    throw error;
  }
}