import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { validatePassword } from "../../../../shared/utils/validation";

function PasswordChangeForm() {
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
  const authRequestButtonRef = useRef<HTMLButtonElement | null>(null);
  const authNumberRef = useRef<HTMLInputElement | null>(null);
  const authNumberButtonRef = useRef<HTMLButtonElement | null>(null);

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
          password: "비밀번호 양식을 확인해 주세요.",
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
    if (authRequestButtonRef.current) {
      authRequestButtonRef.current.innerText = "재요청";
    }
    if (authNumberRef.current && authNumberButtonRef.current) {
      authNumberButtonRef.current.disabled = false;
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
    <form className="w-full max-w-[50%] flex flex-col gap-6" onSubmit={handleSubmit}>
      {/* 사번 */}
      <div className="flex items-center gap-3">
        <Label htmlFor="userId" className="w-[120px] text-left">
          사번
        </Label>
        <div className="flex-1 flex flex-col max-w-[300px] ml-8">
          <Input
            className="focus:!border-green-600 placeholder-gray-300 p-5"
            id="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="사번을 입력해주세요."
            valid={!errors.userId}
          />
          {errors.userId && <p className="text-red-400 text-[12px] mt-1">{errors.userId}</p>}
        </div>
      </div>

      {/* 인증 이메일 */}
      <div className="flex gap-3">
        <Label htmlFor="email" className="w-[120px] text-left pt-3">
          인증 이메일
        </Label>
        <div className="flex-1 flex flex-col max-w-[300px] ml-8">
          <Input
            className="focus:!border-green-600 placeholder-gray-300 p-5"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일을 입력해주세요."
            valid={!errors.email}
          />
          {success.email && <p className="text-green-400 text-[12px] mt-1">{success.email}</p>}
          {errors.email && <p className="text-red-400 text-[12px] mt-1">{errors.email}</p>}
        </div>
        <Button
          ref={authRequestButtonRef}
          className="bg-green-500 disabled:bg-gray-100 disabled:opacity-100 text-white hover:bg-green-600 py-[21px]"
          type="button"
          onClick={handleEmailVerificationRequest}>
          요청
        </Button>
      </div>

      {/* 인증 번호 */}
      <div className="flex gap-3">
        <Label htmlFor="authNumber" className="w-[120px] text-left pt-3">
          인증 번호
        </Label>
        <div className="flex-1 flex flex-col max-w-[300px] ml-8">
          <Input
            className="focus:!border-green-600 placeholder-gray-300 p-5"
            ref={authNumberRef}
            type="tel"
            id="authNumber"
            value={formData.authNumber}
            onChange={handleChange}
            disabled
            valid={!errors.authNumber}
            placeholder="인증번호를 입력해 주세요."
          />
          {success.authNumber && <p className="text-green-400 text-[12px] mt-1">{success.authNumber}</p>}
          {errors.authNumber && <p className="text-red-400 text-[12px] mt-1">{errors.authNumber}</p>}
        </div>
        <Button
          ref={authNumberButtonRef}
          disabled={true}
          className="bg-green-500 disabled:bg-gray-100 disabled:opacity-100 text-white hover:bg-green-600 py-[21px]"
          type="button"
          onClick={handleAuthCodeVerification}>
          확인
        </Button>
      </div>

      {/* 새 비밀번호 */}
      <div className="flex gap-3">
        <Label htmlFor="password" className="w-[120px] text-left pt-3">
          새 비밀번호
        </Label>
        <div className="flex-1 flex flex-col max-w-[300px] ml-8">
          <Input
            className="focus:!border-green-600 placeholder-gray-300 p-5"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="새 비밀번호 입력"
            valid={!errors.password}
          />
          {errors.password && <p className="text-red-400 text-[12px] mt-1">{errors.password}</p>}
        </div>
      </div>

      {/* 새 비밀번호 확인 */}
      <div className="flex gap-3">
        <Label htmlFor="rePassword" className="w-[120px] text-left pt-3">
          비밀번호 확인
        </Label>
        <div className="flex-1 flex flex-col max-w-[300px] ml-8">
          <Input
            className="focus:!border-green-600 placeholder-gray-300 p-5"
            type="password"
            id="rePassword"
            value={formData.rePassword}
            onChange={handleChange}
            placeholder="비밀번호 확인 입력"
            valid={!errors.rePassword}
          />
          {errors.rePassword && <p className="text-red-400 text-[12px] mt-1">{errors.rePassword}</p>}
        </div>
      </div>

      {/* 변경하기 버튼 */}
      <div className="flex justify-center">
        <Button
          className="w-[15%] bg-green-500 disabled:bg-green-200 disabled:opacity-100 text-white hover:bg-green-600 py-5.5 text-[16px] cursor-pointer"
          disabled={!isFormValid}
          type="submit">
          변경하기
        </Button>
      </div>
    </form>
  );
}

export default PasswordChangeForm;
