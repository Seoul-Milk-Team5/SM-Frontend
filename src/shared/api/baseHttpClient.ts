import { Cookies } from "react-cookie";
import { setCookie } from "../utils";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const cookies = new Cookies();

export const baseHttpClient = () => {
  async function get<R>(url: string, headers: HeadersInit, params?: Record<string, any>): Promise<R> {
    const urlParams = new URLSearchParams(params).toString();

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

        if (response.status === 500) {
          throw new Error(`서버 에러가 발생했습니다. | ${response.status}`);
        } else if (response.status === 401) {
          throw new Error(`서버 에러가 발생했습니다. | ${response.status}`);
        } else if (response.status === 404) {
          throw new Error(`서버 에러가 발생했습니다. | ${response.status}`);
        }
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

  async function postForm<R, D extends BodyInit>(url: string, headers: HeadersInit, data: D): Promise<R> {
    try {
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: headers,
        body: data,
      });

      if (!response.ok) {
        if (response.status === 403) {
          cookies.remove("access_token", { path: "/" });
          throw new Error(`로그인이 만료되었습니다. | ${response.status}`);
        }
        const errorBody = await response.json();
        console.log("Response status:", response.status);
        console.log("Response body:", errorBody);
        throw new Error("API 요청 중 오류가 발생했습니다.");
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

  async function patch<R, D>(url: string, headers: HeadersInit, data: D): Promise<R> {
    try {
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: "PATCH",
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
    postForm,
    put,
    patch,
    delete: del,
  };
};
