import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { validatePassword } from "../../../shared/utils/validation";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FormState, loginRequest } from "..";
import { useAuth } from "@/app/providers/AuthProvider";

function LoginForm() {
  const { login, setUserData } = useAuth();
  const [formState, setFormState] = useState<FormState>({
    employeeId: "",
    password: "",
    employeeIdError: "",
    passwordError: "",
    isIdValid: true,
    isPasswordValid: true,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [id]: value,
      employeeIdError: id === "employeeId" ? "" : prev.employeeIdError,
      isIdValid: id === "employeeId" ? true : prev.isIdValid,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    const validation = validatePassword(newPassword);

    setFormState(prev => ({
      ...prev,
      password: newPassword,
      passwordError: validation.valid ? "" : validation.message || "비밀번호가 유효하지 않습니다.",
      isPasswordValid: validation.valid,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let newFormState = { ...formState };

    if (!formState.employeeId) {
      newFormState.employeeIdError = "사번을 입력해주세요.";
      newFormState.isIdValid = false;
    }

    if (!formState.password || !formState.isPasswordValid) {
      newFormState.passwordError = formState.password
        ? "비밀번호 형식이 올바르지 않습니다."
        : "비밀번호를 입력해주세요.";
      newFormState.isPasswordValid = false;
    }

    setFormState(newFormState);

    if (newFormState.employeeIdError || newFormState.passwordError) return;

    const loginBody = {
      employeeId: formState.employeeId,
      password: formState.password,
    };
    try {
      const response = await loginRequest(loginBody);

      if (typeof response?.role === "string") {
        login(response.role);
        setUserData(prev => ({ ...prev, userId: formState.employeeId, userName: response.name }));
        navigate("/dashboard/file");
      } else {
        setFormState(prev => ({
          ...prev,
          employeeIdError: response.message?.includes("사번") ? response.message : "",
          passwordError: response.message?.includes("비밀번호") ? response.message : "",
          isIdValid: !response.message?.includes("사번"),
          isPasswordValid: !response.message?.includes("비밀번호"),
        }));
      }
    } catch (error) {
      console.error("로그인 실패", error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-8">
        {/* 브랜드 로고 추가 */}
        <img src="/logo/Logomark.svg" alt="Company Logo" className="w-64 h-20 sm:w-80 sm:h-20 object-contain" />
        <p className="text-center text-gray-800 text-body-sm font-pretendard font-light">
          초일류 유제품 전문기업으로 나아가는 길에 <br className="sm:hidden" />
          언제나 당신이 있습니다.
        </p>
      </div>
      <Card className="h-[300px] flex flex-col justify-center border-none shadow-none">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                className="
                  h-12
                  text-gray-800
                  placeholder:text-gray-300
                  placeholder:font-extralight
                "
                id="employeeId"
                type="text"
                placeholder="사번을 입력해주세요"
                value={formState.employeeId}
                onChange={handleChange}
                valid={formState.isIdValid}
              />
              {formState.employeeIdError && (
                <p className="text-red-300 text-sm mt-1 ml-3">{formState.employeeIdError}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                className="
                  h-12
                  text-gray-800
                  placeholder:text-gray-300
                  placeholder:font-extralight
                "
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={formState.password}
                onChange={handlePasswordChange}
                valid={formState.isPasswordValid}
              />
              {formState.passwordError && <p className="text-red-300 text-sm mt-1 ml-3">{formState.passwordError}</p>}
            </div>
            <Button
              type="submit"
              className="h-12 w-full bg-green-500 hover:bg-green-600 mt-4 disabled:bg-green-200 disabled:opacity-100"
              disabled={!formState.isPasswordValid || !formState.employeeId || !formState.password}>
              로그인
            </Button>
          </form>
          <div className="flex text-center mt-4 justify-center items-center">
            <p className="text-sm text-gray-400 font-light">
              비밀번호를 잊어버리셨나요?
              <Link to="/passwordchange" className="cursor-pointer underline ml-1.5">
                비밀번호 변경
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginForm;
