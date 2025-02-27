import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { validatePassword } from "../../../../shared/utils/validation";
import InputWithButton from "../../../../shared/ui/InputWithButton";
import InputWithLabel from "../../../../shared/ui/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Errors, FormData, IsButtonDisabled } from "../model";

function PasswordChangeForm() {
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    email: "",
    authNumber: "",
    password: "",
    rePassword: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState<IsButtonDisabled>({
    userId: true,
    email: true,
    authNumber: true,
  });
  const [success, setSuccess] = useState({
    email: "",
    authNumber: "",
  });
  const [errors, setErrors] = useState<Errors>({
    userId: "",
    email: "",
    authNumber: "",
    password: "",
    rePassword: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsButtonDisabled({
      userId: formData.userId.trim() === "",
      email: formData.email.trim() === "" || !/\S+@\S+\.\S+/.test(formData.email),
      authNumber: formData.authNumber.trim() === "" || formData.email.trim() === "",
    });

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

    if (id === "password" || id === "rePassword") {
      handlePasswordValidation(id as keyof FormData, value);
    }
  };

  //사번 확인 요청
  const handleUserIdVerificationRequest = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // api 요청 후 리스폰스에 따라 disabled 처리 여부를 결정하는 로직 추가해야함
    setErrors(prevState => ({
      ...prevState, // 기존 상태 유지
      userId: "존재하지 않는 사번입니다.",
    }));
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

  // 비밀번호 확인
  const handlePasswordValidation = (id: keyof FormData, value: string) => {
    if (id === "password") {
      const validation = validatePassword(value);
      setErrors(prevErrors => ({
        ...prevErrors,
        password: validation.valid ? "" : "비밀번호 양식을 확인해 주세요.",
      }));
    }

    if (id === "rePassword") {
      setErrors(prevErrors => ({
        ...prevErrors,
        rePassword: formData.password === value ? "" : "비밀번호가 일치하지 않습니다.",
      }));
    }
  };

  // 제출 핸들러
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Form submission logic here
  };

  return (
    <form className="w-full max-w-[50%] flex flex-col gap-6" onSubmit={handleSubmit}>
      {/* 사번 */}
      <InputWithButton
        label="사번"
        type="text"
        id="userId"
        placeholder="사번을 입력해주세요."
        value={formData.userId}
        onChange={handleChange}
        error={errors.userId}
        disabled={isButtonDisabled.userId}
        buttonText="확인"
        onClick={handleUserIdVerificationRequest}
      />
      {/* 이메일 */}
      <InputWithButton
        label="인증 이메일"
        type="email"
        id="email"
        placeholder="이메일을 입력해 주세요."
        value={formData.email}
        onChange={handleChange}
        success={success.email}
        error={errors.email}
        disabled={isButtonDisabled.email}
        buttonText="요청"
        onClick={handleEmailVerificationRequest}
      />

      {/* 인증번호 */}
      <InputWithButton
        label="인증 번호"
        type="tel"
        id="authNumber"
        placeholder="인증번호를 입력해 주세요."
        value={formData.authNumber}
        onChange={handleChange}
        success={success.authNumber}
        error={errors.authNumber}
        disabled={isButtonDisabled.authNumber}
        buttonText="확인"
        onClick={handleAuthCodeVerification}
      />

      {/* 새 비밀번호 */}
      <InputWithLabel
        label="새 비밀번호"
        type="password"
        id="password"
        placeholder="비밀번호를 입력해 주세요."
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      {/* 새 비밀번호 확인 */}
      <InputWithLabel
        label="비밀번호 확인"
        type="password"
        id="rePassword"
        placeholder="새 비밀번호를 입력해 주세요."
        value={formData.rePassword}
        onChange={handleChange}
        error={errors.rePassword}
      />

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
