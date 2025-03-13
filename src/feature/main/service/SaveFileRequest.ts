import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";
import { SaveFileGetResponse, SaveFilePostResponse } from "../model";

export async function saveFileGetRequest(token: string): Promise<SaveFileGetResponse> {
  const HEADER = getFetchHeader(token, "a");

  const params = {
    size: 50,
  };

  try {
    return await baseHttpClient().get<SaveFileGetResponse>("api/image/tmp", HEADER, params);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function saveFilePostRequest(token: string, files: File[]): Promise<SaveFilePostResponse> {
  const HEADER = getFetchHeader(token, "m");

  const formData = new FormData();
  const fileArray = Array.from(files);

  fileArray.forEach(file => formData.append("files", file));

  try {
    return await baseHttpClient().postForm<SaveFilePostResponse, FormData>("api/image/tmp/mark", HEADER, formData);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function saveFilePatchRequest(token: string, imageIds: number[]): Promise<SaveFilePostResponse> {
  const HEADER = getFetchHeader(token, "a");

  // imageIds를 쿼리 스트링으로 변환
  // const queryString = imageIds.map(id => `imageIds=${id}`).join("&");
  // const url = `api/image/tmp/unmark?${queryString}`;
  const queryString = `imageIds=${imageIds.join(",")}`;
  const url = `api/image/tmp/unmark?${queryString}`;

  try {
    return await baseHttpClient().patch<SaveFilePostResponse, string>(url, HEADER, "");
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
