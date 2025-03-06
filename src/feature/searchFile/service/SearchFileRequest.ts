import { getFetchHeader } from "@/shared/utils";
import { baseHttpClient } from "@/shared/api";
import { ApiResponse } from "../model/SearchFIle.type";

export async function searchFileGetRequest(
    token: string,
    poc: string | null,
    status?: "UNAPPROVED" | "APPROVED" | "REJECTED" | null,
    page: number = 1,
    size: number = 10
): Promise<ApiResponse> {
    const HEADER = getFetchHeader(token, "a");

    try {
        const params: Record<string, any> = {
            page,
            size,
            poc: poc ?? "",
            status: status ?? ""
        };

        const url = `api/validation/history/search`;
        
        const response = await baseHttpClient().get<ApiResponse>(url, HEADER, params);
        return response;
    } catch (error) {
        console.log("검증내역을 불러오는데 실패했습니다.", error);
        throw error;
    }
}
