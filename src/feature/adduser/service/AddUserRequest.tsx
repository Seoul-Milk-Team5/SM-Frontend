import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";

interface Employee {
  name: string;
  employeeId: string;
  role: string;
}
  
interface EmployeeResponse {
  code: number;
  message: string;
  result: Employee;
  success: boolean;
}
  

export async function AdduserRequest(
  token: string,
  employee: Employee
): Promise<EmployeeResponse> {
  const HEADER = getFetchHeader(token, "a");
  try{
    const url = 'api/admin/members/register/tmp';
    const response = await baseHttpClient().post<EmployeeResponse, Employee>(url, HEADER, employee);
    return response;
  } catch (error) {
    console.log("사원등록 실패", error);
    throw error;
  }
}