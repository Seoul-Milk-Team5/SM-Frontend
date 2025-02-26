import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PasswordChangeModal from "./PasswordChangeModal";
import React, { useState } from "react";
import { validatePassword } from "../../../../shared/utils/validation";
import { mockLoginRequest } from "../service/mock/mockLoginRequest";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [employeeIdError, setEmployeeIdError] = useState(""); //서버 메시지
  const [passwordError, setPasswordError] = useState("");

  const [IsIdvalid, setIsIdValid] = useState(true);
  const [IsPasswordValid, setIsPasswordValid] = useState(true);

  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const validation = validatePassword(newPassword);
    if(!validation.valid) {
      setErrorMessage(validation.message || "비밀번호가 유효하지 않습니다.");
      setIsPasswordValid(false);
    } else {
      setErrorMessage(""); // 올바른 형식으로 입력
      setIsPasswordValid(true);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (errorMessage) return;

    setEmployeeIdError("");
    setPasswordError("");
    setIsIdValid(true);
    setIsPasswordValid(true);

    try{
      const response = await mockLoginRequest(employeeId, password);

      if(response.success) {
        navigate("/");
      } else {
        if (response.message?.includes("사번")) {
          setEmployeeIdError(response.message);
          setIsIdValid(false);
        } else if (response.message?.includes("비밀번호")) {
          setPasswordError(response.message);
          setIsPasswordValid(false);
        }
      }
    } catch (error) {
      console.log("로그인 실패", error);
    }
  }

  return(
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-2">
        {/* 브랜드 로고 추가 */}
        <img src="/logo/Logomark.svg" alt="Company Logo" className="w-64 h-20 sm:w-80 sm:h-20 object-contain"/>
        <p className="text-center text-gray-700 text-sm">
          초일류 유제품 전문기업으로 나아가는 길에{" "}
          <br className="sm:hidden" />
          언제나 당신이 있습니다.
        </p>
      </div>
      <Card className="h-[300px] flex flex-col justify-center border-none shadow-none">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                className="h-12 focus:!border-green-600"
                id="employeeId"
                type="text"
                placeholder="사번을 입력해주세요"
                value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}
                valid={IsIdvalid}
              />
              {employeeIdError && (
                <p className="text-red-400 text-sm mt-1 ml-3">{employeeIdError}</p>
              )}
            </div>
            <div className="mb-4">
              <Input
                className="h-12 focus:!border-green-600"
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password} onChange={handlePasswordChange}
                valid={IsPasswordValid}
              />
              {passwordError ? (
                <p className="text-red-400 text-sm mt-1 ml-3">{passwordError}</p>
              ) : errorMessage ? (
                <p className="text-red-400 text-sm mt-1 ml-3">{errorMessage}</p>
              ) : null}
            </div>
            <Button
              type="submit"
              className="h-12 w-full bg-green-600 hover:bg-green-700 mt-4"
              disabled={!IsPasswordValid || !employeeId || !password}
            >
              로그인
            </Button>
          </form>
          <div className="flex text-center mt-4 justify-center items-center">
            <p className="text-sm text-gray-400">
              비밀번호를 잊어버리셨나요?  
            </p>
            <PasswordChangeModal />
          </div>
        </CardContent>
      </Card>      
    </div>
  )
}

export default LoginForm;
