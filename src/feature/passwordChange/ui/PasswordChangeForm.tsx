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
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsButtonDisabled({
      userId: formData.userId.trim() === "",
      // email: formData.email.trim() === "" || !/^[^@]+@seoulmilk\.co\.kr$/.test(formData.email),
      email: formData.email.trim() === "" || !/^[^@]+@gmail\.com$/.test(formData.email),

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

    switch (id) {
      case "email":
        // 이메일 유효성 검사
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
        // 비밀번호 유효성 검사
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
        break;
      case "rePassword":
        // 비밀번호 재입력 확인
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
        break;
    }
  };

  //사번 확인 요청
  const handleUserIdVerificationRequest = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const response = await employeeIdCheckRequest(formData.userId);

    if (response.result) {
      setIsButtonDisabled(prev => ({
        ...prev,
        userId: true,
      }));
      setErrors(prevState => ({
        ...prevState, // 기존 상태 유지
        userId: "",
      }));
    } else {
      setErrors(prevState => ({
        ...prevState, // 기존 상태 유지
        userId: "존재하지 않는 사번입니다.",
      }));
    }
  };

  const handleEmailVerificationRequest = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const response = await emailPostRequest(formData.email);
      console.log(response);

      if (response.success) {
        setSuccess(prevState => ({
          ...prevState,
          email: "메일로 발송된 인증번호를 확인해주세요.",
        }));
      } else {
        setErrors(prevState => ({
          ...prevState,
          email: "존재하지 않는 메일입니다.",
        }));
      }
    } catch (error) {
      console.error("이메일 인증 요청 실패:", error);
      setErrors(prevState => ({
        ...prevState,
        email: "이메일 인증 요청 중 오류가 발생했습니다.",
      }));
    }
  };

  // 인증 번호 확인
  const handleAuthCodeVerification = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const body = {
      email: formData.email,
      authCode: formData.authNumber,
    };

    try {
      const response = await emailVerificationRequest(body);
      console.log(response);

      if (typeof response.result === "object" && "success" in response.result) {
        if (response.result.success) {
          setSuccess(prevState => ({
            ...prevState,
            authNumber: "인증되었습니다.",
          }));
        }
      } else {
        setErrors(prevState => ({
          ...prevState,
          authNumber: "인증번호가 틀렸습니다.",
        }));
      }
    } catch (error) {
      console.error("인증번호 확인 요청 실패:", error);
      setErrors(prevState => ({
        ...prevState,
        authNumber: "인증번호 확인 중 오류가 발생했습니다.",
      }));
    }
  };

  // 제출 핸들러
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Form submission logic here
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
