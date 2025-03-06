import { getFetchHeader } from "@/shared/utils";
import { OcrPostResponse } from "../model";
import { baseHttpClient } from "@/shared/api";

export async function ocrPostRequest(token: string, files: File[]): Promise<OcrPostResponse> {
  const HEADER = getFetchHeader(token, "m");

  const formData = new FormData();
  const fileArray = Array.from(files);

  fileArray.forEach(file => formData.append("images", file));

  try {
    return await baseHttpClient().postForm<OcrPostResponse, FormData>("api/ocr/multiple", HEADER, formData);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
