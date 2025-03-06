export interface OcrPostResponse {
  code: number;
  message: string;
  result:
    | string
    | {
        errorClass: string;
        errorMessage: string;
      };
  success: boolean;
}
