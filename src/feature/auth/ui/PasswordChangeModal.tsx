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
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { validatePassword } from "../../../../shared/utils/validation";

function PasswordChangeModal() {
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    authNumber: "",
    password: "",
    rePassword: "",
  });
  const [success, setSuccess] = useState({
    email: "",
    authNumber: "",
  });
  const [errors, setErrors] = useState({
    userId: "",
    email: "",
    authNumber: "",
    password: "",
    rePassword: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const authNumberRef = useRef<HTMLInputElement | null>(null);

  // 모든 필드가 채워졌는지 확인
  useEffect(() => {
    const isValid =
      Object.values(formData).every(value => value.trim() !== "") &&
      formData.password === formData.rePassword &&
      Object.values(errors).every(error => error === "");

    setIsFormValid(isValid);
  }, [formData, errors]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [id]: "",
    }));

    if (id === "password") {
      const validation = validatePassword(value);
      if (!validation.valid) {
        setErrors(prevErrors => ({
          ...prevErrors,
          password: "비밀번호는 8~16자이며, 대문자, 소문자, 숫자, 특수문자를 포함해야 합니다.",
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          password: "",
        }));
      }
    }

    if (id === "rePassword") {
      if (formData.password !== value) {
        setErrors(prevErrors => ({
          ...prevErrors,
          rePassword: "비밀번호가 일치하지 않습니다.",
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          rePassword: "",
        }));
      }
    }
  };

  // 제출 핸들러
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  // 인증 이메일 요청
  const handleEmailVerificationRequest = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // api 요청 후 리스폰스에 따라 disabled 처리 여부를 결정하는 로직 추가해야함
    setSuccess(prevState => ({
      ...prevState, // 기존 상태 유지
      email: "메일로 발송된 인증번호를 확인해주세요.",
    }));
    setErrors(prevState => ({
      ...prevState, // 기존 상태 유지
      email: "존재하지 않는 메일입니다.",
    }));
    if (authNumberRef.current) {
      authNumberRef.current.disabled = false;
      authNumberRef.current.focus();
    }
  };

  // 인증 번호 확인
  const handleAuthCodeVerification = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // api 요청 후 리스폰스에 따라 disabled 처리 여부를 결정하는 로직 추가해야함
    setSuccess(prevState => ({
      ...prevState, // 기존 상태 유지
      authNumber: "인증되었습니다.",
    }));
    setErrors(prevState => ({
      ...prevState, // 기존 상태 유지
      authNumber: "인증번호가 틀렸습니다.",
    }));
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
        <form className="grid gap-4 py-6" onSubmit={handleSubmit}>
          {/* 사번 */}
          <div className="grid grid-cols-5 gap-4">
            <Label htmlFor="userId" className="text-right pt-3">
              사번
            </Label>
            <div className="col-span-3 flex flex-col">
              <Input
                id="userId"
                value={formData.userId}
                onChange={handleChange}
                className="col-span-3"
                placeholder="사번을 입력해주세요."
              />
              {errors.userId && <p className="text-red-400 text-[12px] mt-1">{errors.userId}</p>}
            </div>
          </div>

          {/* 인증 이메일 */}
          <div className="grid grid-cols-5 gap-4">
            <Label htmlFor="email" className="text-right pt-3">
              인증 이메일
            </Label>
            <div className="col-span-3 flex flex-col">
              <Input
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                placeholder="인증번호를 받으실 이메일 주소를 입력해주세요."
              />
              {success.email && <p className="text-green-400 text-[12px] mt-1">{success.email}</p>}
              {errors.email && <p className="text-red-400 text-[12px] mt-1">{errors.email}</p>}
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
                ref={authNumberRef}
                type="tel"
                id="authNumber"
                value={formData.authNumber}
                onChange={handleChange}
                className="col-span-3"
                disabled={true}
              />
              {success.authNumber && <p className="text-green-400 text-[12px] mt-1">{success.authNumber}</p>}
              {errors.authNumber && <p className="text-red-400 text-[12px] mt-1">{errors.authNumber}</p>}
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
              <Input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="새 비밀번호를 입력해주세요"
              />
              {errors.password && <p className="text-red-400 text-[12px] mt-1">{errors.password}</p>}
            </div>
          </div>

          {/* 새 비밀번호 확인 */}
          <div className="grid grid-cols-5 gap-4">
            <Label htmlFor="rePassword" className="text-right whitespace-nowrap pt-3">
              새 비밀번호 확인
            </Label>
            <div className="col-span-3 flex flex-col">
              <Input
                type="password"
                id="rePassword"
                value={formData.rePassword}
                onChange={handleChange}
                className="col-span-3"
                placeholder="새 비밀번호를 한 번 더 입력해주세요."
              />
              {errors.rePassword && <p className="text-red-400 text-[12px] mt-1">{errors.rePassword}</p>}
            </div>
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
