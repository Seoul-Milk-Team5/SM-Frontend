import { getFetchHeader } from "@/shared/utils";
import { OcrPostResponse } from "../model";
import { baseHttpClient } from "@/shared/api";
import { FileData } from "@/app/providers/FileProvider";

export async function ocrPostRequest(token: string, files: FileData): Promise<OcrPostResponse> {
  const HEADER = getFetchHeader(token, "m");

  const formData = new FormData();
  const fileArray = Array.from(files.clientFiles);
  fileArray.forEach(file => formData.append("images", file));

  console.log(files.result);
  const queryParams = new URLSearchParams();
  files.result.forEach(file => queryParams.append("data", file.imageId.toString()));

  const url = `api/ocr/multiple?${queryParams.toString()}`;

  try {
    return await baseHttpClient().postForm<OcrPostResponse, FormData>(url, HEADER, formData);
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
