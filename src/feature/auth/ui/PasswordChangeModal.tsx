import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";

function PasswordChangeModal() {
  const [formData, setFormData] = useState({
    userId: "12345678",
    email: "",
    authNumber: "",
    password: "",
    rePassword: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // 모든 필드가 채워졌는지 확인
  useEffect(() => {
    const isValid =
      Object.values(formData).every(value => value.trim() !== "") && // 모든 필드가 비어있지 않은지 확인
      formData.password === formData.rePassword; // 비밀번호 확인

    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEmailVerificationRequest = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleAuthCodeVerification = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">비밀번호 변경</Button>
      </DialogTrigger>
      <DialogContent style={{ maxWidth: "650px", width: "100%" }}>
        <DialogHeader>
          <DialogTitle>비밀번호 변경</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-6">
          {/* 사번 */}
          <div className="grid grid-cols-5 gap-4">
            <Label htmlFor="userId" className="text-right pt-3">
              사번
            </Label>
            <div className="col-span-3 flex flex-col">
              <Input id="userId" value={formData.userId} onChange={handleChange} className="col-span-3" />
              <p className="text-red-400 text-[12px] mt-1">비밀번호 틀림</p>
            </div>
          </div>

          {/* 인증 이메일 */}
          <div className="grid grid-cols-5 gap-4">
            <Label htmlFor="email" className="text-right pt-3">
              인증 이메일
            </Label>
            <div className="col-span-3 flex flex-col">
              <Input id="email" value={formData.email} onChange={handleChange} className="col-span-3" />
              <p className="text-red-400 text-[12px] mt-1">비밀번호 틀림</p>
            </div>
            <Button type="button" onClick={handleEmailVerificationRequest}>
              요청
            </Button>
          </div>

          {/* 인증 번호 */}
          <div className="grid grid-cols-5 gap-4">
            <Label htmlFor="authNumber" className="text-right pt-3">
              인증 번호
            </Label>
            <div className="col-span-3 flex flex-col">
              <Input
                type="tel"
                id="authNumber"
                value={formData.authNumber}
                onChange={handleChange}
                className="col-span-3"
              />
              <p className="text-red-400 text-[12px] mt-1">비밀번호 틀림</p>
            </div>
            <Button type="button" onClick={handleAuthCodeVerification}>
              확인
            </Button>
          </div>

          {/* 새 비밀번호 */}
          <div className="grid grid-cols-5 gap-4">
            <Label htmlFor="password" className="text-right pt-3">
              새 비밀번호
            </Label>
            <div className="col-span-3 flex flex-col">
              <Input type="password" id="password" value={formData.password} onChange={handleChange} />
              <p className="text-red-400 text-[12px] mt-1">비밀번호 틀림</p>
            </div>
          </div>

          {/* 새 비밀번호 확인 */}
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="rePassword" className="text-right whitespace-nowrap">
              새 비밀번호 확인
            </Label>
            <Input
              type="password"
              id="rePassword"
              value={formData.rePassword}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          {/* 변경하기 버튼 */}
          <div className="grid grid-cols-1 place-items-center gap-4">
            <Button className="w-[55%]" disabled={!isFormValid} type="submit">
              변경하기
            </Button>
          </div>
        </form>

        {/* 설명 메시지 */}
        <div className="flex flex-col gap-2 mx-auto">
          <DialogDescription>인증 이메일은 서울우유 사내 메일 주소만 가능합니다.</DialogDescription>
          <DialogDescription>정보 보안을 위해 5분에 한 번만 비밀번호를 변경할 수 있습니다.</DialogDescription>
          <DialogDescription>
            비밀번호는 영어 대/소문자, 숫자, 특수문자 1개 이상 포함, 최소 8자 이상 ~ 16자 이하여야 합니다.
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PasswordChangeModal;
