import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PasswordChangeModal from "./PasswordChangeModal";
import React, { useState } from "react";
import { validatePassword } from "../../../../shared/utils/validation";

function LoginForm() {
  const [employeeId, setEmployeId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [IsPasswordValid, setIsPasswordValid] = useState(true);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errorMessage) {
      alert("로그인 성공!"); // 실제 로그인 로직 실행 예정, 이후 메인으로
    }
  }

  return(
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-4">
        {/* 브랜드 로고 추가 */}
        <img src="/logo/Logomark.svg" alt="Company Logo" className="w-sm h-sm object-contain"/>
        <p className="text-center text-gray-700 mt-2">
          초일류 유제품 전문기업으로 나아가는 길에 언제나 당신이 있습니다.
        </p>
      </div>
      <Card className="h-[300px] flex flex-col justify-center">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Input
                id="emplyeeId"
                type="text"
                placeholder="사번을 입력해주세요"
                value={employeeId} onChange={(e) => setEmployeId(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password} onChange={handlePasswordChange}
                valid={IsPasswordValid}
              />
              {errorMessage && (
                <p className="text-red-400 text-sm mb-2">{errorMessage}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-gray-800 hover:bg-gray-600"
              disabled={!IsPasswordValid || !employeeId || !password}
            >
              로그인
            </Button>
          </form>
          <div className="flex text-center mt-4 justify-center items-center">
            <p className="text-sm text-gray-800">
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
