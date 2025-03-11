import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";

interface UserInfo {
  employeeId: string;
  role: string;
}
interface ChangeRoleResponse {
  code: number;
  message: string;
  result: UserInfo;
  success: boolean;
}

export async function ChangeUserRoleRequest(
  token: string,
  userInfo: UserInfo
): Promise<ChangeRoleResponse> {
  const HEADER = getFetchHeader(token, "a");
  try{
    const url = `api/admin/members/${userInfo.employeeId}/role`
    const response = await baseHttpClient().patch<ChangeRoleResponse, UserInfo>(url, HEADER, userInfo);
    return response;
  } catch (error) {
    console.log("유저 권한을 바꾸는데 실패했습니다.", error);
    throw error;
  }
}