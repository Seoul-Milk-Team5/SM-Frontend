import { getFetchHeader } from "@/shared/utils";
import { EmployeeIdResponse } from "../model";
import { baseHttpClient } from "@/shared/api";

export async function employeeIdCheckRequest(employeeId: string): Promise<EmployeeIdResponse> {
  const HEADER = getFetchHeader("", "b");

  try {
    return await baseHttpClient().get<EmployeeIdResponse>(`api/members/exists/${employeeId}`, HEADER);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
