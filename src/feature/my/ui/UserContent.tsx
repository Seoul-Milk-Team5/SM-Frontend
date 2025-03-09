import { Button } from "@/components/ui/button";
import { Errors } from "@/feature/passwordChange";
import InputWithButton from "@/shared/ui/InputWithButton";
import InputWithLabel from "@/shared/ui/InputWithLabel";
import { validatePassword } from "@/shared/utils";
import { ChangeEvent, MouseEvent, useState } from "react";

function UserContent() {
  const [formData, setFormData] = useState({
    userName: "",
    userId: "",
    email: "",
    password: "",
    newPassword: "",
    rePassword: "",
  });

  const [errors, setErrors] = useState<Errors>({
    newPassword: "",
    rePassword: "",
  });
  const [isOpen, setOpen] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value,
    }));

    switch (id) {
      case "newPassword":
        const validation = validatePassword(value);
        setErrors(prevErrors => ({
          ...prevErrors,
          password: validation.valid ? "" : "비밀번호 양식을 확인해 주세요.",
        }));
        break;
      case "rePassword":
        setErrors(prevErrors => ({
          ...prevErrors,
          rePassword: formData.newPassword !== value ? "비밀번호가 일치하지 않습니다." : "",
        }));
        break;
    }
  };

  // 비밀번호 인풋 핸들러
  const handleInputOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(true);
  };
  return (
    <div className="flex flex-col w-full items-center px-[90px] pt-[80px] pb-[100px]">
      <h3 className="w-full text-gray-800 text-title-lg mb-14">유저정보</h3>
      <form className="w-full flex flex-col gap-5">
        <InputWithLabel
          label="성함"
          type="text"
          id="userName"
          placeholder="성함"
          value={formData.userName}
          onChange={handleChange}
        />
        <InputWithLabel
          label="사원번호"
          type="text"
          id="userId"
          placeholder="사원번호"
          value={formData.userId}
          onChange={handleChange}
        />
        <InputWithLabel
          label="인증 이메일"
          type="text"
          id="email"
          placeholder="인증 이메일"
          value={formData.email}
          onChange={handleChange}
        />
        <InputWithButton
          label="인증 번호"
          type="tel"
          id="authNumber"
          placeholder="인증번호를 입력해 주세요."
          value={formData.password}
          onChange={handleChange}
          disabled={false}
          buttonText="변경하기"
          onClick={handleInputOpen}
        />
        {isOpen && (
          <InputWithLabel
            label="새 비밀번호"
            type="password"
            id="newPassword"
            placeholder="새 비밀번호를 입력해 주세요."
            value={formData.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
          />
        )}
        {isOpen && (
          <InputWithLabel
            label="새 비밀번호 확인"
            type="password"
            id="rePassword"
            placeholder="새 비밀번호를 입력해 주세요."
            value={formData.rePassword}
            onChange={handleChange}
            error={errors.rePassword}
          />
        )}
        <Button className="bg-green-500 hover:bg-green-600 disabled:bg-gray-100 text-[#fff] w-full h-[50px]">
          변경하기
        </Button>
      </form>
    </div>
  );
}

export default UserContent;
