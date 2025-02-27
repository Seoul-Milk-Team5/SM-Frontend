// 서버 요청을 가정한 가짜 로그인 함수
export const mockLoginRequest = async (employeeId: string, password: string) => {
  return new Promise<{ success: boolean; message?: string }>((resolve) => {
    setTimeout(() => {
      if (employeeId !== "123456") {
        resolve({ success: false, message: "사번이 일치하지 않습니다." });
      } else if (password !== "Password123!") {
        resolve({ success: false, message: "비밀번호가 틀렸습니다." });
      } else {
        resolve({ success: true });
      }
      }, 1000);
    });
};
  