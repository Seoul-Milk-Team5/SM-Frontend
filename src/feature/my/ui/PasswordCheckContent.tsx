import { useState, ChangeEvent, MouseEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validatePassword } from "@/shared/utils";
import { useStep } from "@/app/providers/StepProvider";
import { passwordCheckRequest } from "../service/Password";
import { useAuth } from "@/app/providers/AuthProvider";

function PasswordCheckContent() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isToggle, setToggle] = useState(true);

  const { setSteps } = useStep();
  const { getUser } = useAuth();

  // 현재 비밀번호 입력 핸들러
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    const value = event.target.value;
    const validation = validatePassword(value);
    if (validation.valid) {
      setError("");
      setToggle(false);
    } else {
      setToggle(true);
      setError("비밀번호 양식을 확인해 주세요.");
    }
  };

  // 비밀번호 확인 버튼 클릭
  const handlePasswordCheck = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const token = getUser();
      const response = await passwordCheckRequest(token, password);

      if (response.success) {
        setSteps(2);
      }
    } catch (err: any) {
      console.error(err);
      if (err.message.includes("401")) {
        setError("비밀번호가 틀렸습니다.");
      } else {
        setError("비밀번호 확인 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-[170px] pt-[70px] pb-[100px] gap-10">
      {/* 페이지 타이틀/설명 */}
      <div className="w-full">
        <h3 className="text-gray-800 text-title-lg mb-2">비밀번호 확인</h3>
        <p className="text-gray-800 text-body-lg">본인 확인을 위해 현재 비밀번호를 입력해주세요.</p>
      </div>
      <div className="flex flex-col w-full">
        <Input
          className="h-[50px]"
          type="password"
          placeholder="현재 비밀번호를 입력해 주세요."
          value={password}
          onChange={handlePasswordChange}
          valid={!error}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      {/* 현재 비밀번호 입력 */}

      <Button
        className="bg-green-500 hover:bg-green-600 disabled:bg-gray-100 text-[#fff] w-full h-[50px]"
        onClick={handlePasswordCheck}
        disabled={isToggle}>
        확인
      </Button>
    </div>
  );
}

export default PasswordCheckContent;
