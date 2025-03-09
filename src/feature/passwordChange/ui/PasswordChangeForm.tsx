import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { validatePassword } from "../../../shared/utils/validation";
import InputWithButton from "../../../shared/ui/InputWithButton";
import InputWithLabel from "../../../shared/ui/InputWithLabel";
import { Errors, FormData, IsButtonDisabled } from "../model";
import PasswordChangeAlert from "./PasswordChangeAlert";
import { emailPostRequest, emailVerificationRequest, employeeIdCheckRequest } from "../service";

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

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isAuthNumberVerified, setIsAuthNumberVerified] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsButtonDisabled({
      userId: formData.userId.trim() === "",
      email: formData.email.trim() === "" || !/^[^@]+@seoulmilk\.co\.kr$/.test(formData.email),
      //email: formData.email.trim() === "" || !/^[^@]+@gmail\.com$/.test(formData.email),
      authNumber: formData.authNumber.trim() === "" || formData.email.trim() === "",
    });

    // 모든 조건이 충족되었을 때만 isFormValid를 true로 설정
    setIsFormValid(
      isEmailVerified &&
        isAuthNumberVerified &&
        Object.values(formData).every(value => value.trim() !== "") &&
        formData.password === formData.rePassword &&
        Object.values(errors).every(error => error === "")
    );
  }, [formData, errors, isEmailVerified, isAuthNumberVerified]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));

    switch (id) {
      case "email":
        //const emailRegex = /^[^@]+@seoulmilk\.co\.kr$/;
        const emailRegex = /^[^@]+@gmail\.com$/;
        if (!emailRegex.test(value)) {
          setErrors(prevErrors => ({
            ...prevErrors,
            email: "인증 이메일은 서울우유 사내 메일만 가능합니다.",
          }));
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            email: "",
          }));
        }
        break;
      case "password":
        const validation = validatePassword(value);
        setErrors(prevErrors => ({
          ...prevErrors,
          password: validation.valid ? "" : "비밀번호 양식을 확인해 주세요.",
        }));
        break;
      case "rePassword":
        setErrors(prevErrors => ({
          ...prevErrors,
          rePassword: formData.password !== value ? "비밀번호가 일치하지 않습니다." : "",
        }));
        break;
    }
  };

  // 사번 확인
  const handleUserIdVerificationRequest = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const response = await employeeIdCheckRequest(formData.userId);
      if (response.result) {
        setIsButtonDisabled(prev => ({ ...prev, userId: true }));
        setErrors(prevState => ({ ...prevState, userId: "" }));
      } else {
        setErrors(prevState => ({ ...prevState, userId: "존재하지 않는 사번입니다." }));
      }
    } catch (error) {
      console.error("사번 확인 요청 실패:", error);
      setErrors(prevState => ({ ...prevState, userId: "사번 확인 요청 중 오류가 발생했습니다." }));
    }
  };
  // 인증 메일 발송
  const handleEmailVerificationRequest = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const response = await emailPostRequest(formData.email);
      if (response.success) {
        setSuccess(prevState => ({ ...prevState, email: "메일로 발송된 인증번호를 확인해주세요." }));
        setIsEmailVerified(true);
      } else {
        setErrors(prevState => ({ ...prevState, email: "존재하지 않는 메일입니다." }));
      }
    } catch (error) {
      console.error("이메일 인증 요청 실패:", error);
      setErrors(prevState => ({ ...prevState, email: "이메일 인증 요청 중 오류가 발생했습니다." }));
    }
  };

  // 인증 메일 인증코드 확인
  const handleAuthCodeVerification = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const response = await emailVerificationRequest({
        email: formData.email,
        authCode: formData.authNumber,
      });

      if (typeof response.result === "object" && "success" in response.result) {
        if (response.result.success) {
          setSuccess(prevState => ({ ...prevState, authNumber: "인증되었습니다." }));
          setIsAuthNumberVerified(true);
        } else {
          setErrors(prevState => ({ ...prevState, authNumber: "인증번호가 틀렸습니다." }));
        }
      }
    } catch (error) {
      console.error("인증번호 확인 요청 실패:", error);
      setErrors(prevState => ({ ...prevState, authNumber: "인증번호 확인 중 오류가 발생했습니다." }));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Test");
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
        <PasswordChangeAlert disabled={!isFormValid} />
      </div>
    </form>
  );
}

export default PasswordChangeForm;
