import { setCookie } from "../utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const baseHttpClient = () => {
  async function get<R>(url: string, headers: HeadersInit, params?: Record<string, any>): Promise<R> {
    const urlParams = new URLSearchParams(params).toString();
    console.log(urlParams);
    try {
      const response = await fetch(`${BASE_URL}/${url}?${urlParams}`, {
        method: "GET",
        headers: headers,
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.log("Response status:", response.status);
        console.log("Response body:", errorBody);
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  async function post<R, D>(url: string, headers: HeadersInit, data: D): Promise<R> {
    try {
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.log("Response status:", response.status);
        console.log("Response body:", errorBody);
        throw new Error("Network response was not ok");
      }

      const accessToken = response.headers.get("access");

      if (accessToken) {
        setCookie("access_token", accessToken, { path: "/", secure: true, httpOnly: false });
      }

      // 성공적인 응답 처리
      const responseBody = await response.json();
      return responseBody;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  async function put<R, D>(url: string, headers: HeadersInit, data: D): Promise<R> {
    try {
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.log("Response status:", response.status);
        console.log("Response body:", errorBody);
        throw new Error("Network response was not ok");
      }

      // 성공적인 응답 처리
      const responseBody = await response.json();
      return responseBody;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  async function del<R, D>(url: string, headers: HeadersInit, data?: D): Promise<R> {
    try {
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: "DELETE",
        headers: headers,
        credentials: "include",
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.log("Response status:", response.status);
        console.log("Response body:", errorBody);
        throw new Error("Network response was not ok");
      }

      const responseBody = await response.json();
      return responseBody;
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  return {
    get,
    post,
    put,
    delete: del,
  };
};
