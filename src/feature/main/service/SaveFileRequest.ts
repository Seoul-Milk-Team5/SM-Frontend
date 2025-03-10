import { baseHttpClient } from "@/shared/api";
import { getFetchHeader } from "@/shared/utils";
import { SaveFileGetResponse, SaveFilePacthResponse, SaveFilePostResponse } from "../model";

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

export async function saveFilePatchRequest(token: string, iamgeId: number[]): Promise<SaveFilePostResponse> {
  const HEADER = getFetchHeader(token, "a");
  const imageIdObject = {
    imageIds: iamgeId,
  };
  try {
    return await baseHttpClient().patch<SaveFilePacthResponse, { imageIds: number[] }>(
      "api/image/tmp/unmark",
      HEADER,
      imageIdObject
    );
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
