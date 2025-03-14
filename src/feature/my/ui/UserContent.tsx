import { Button } from "@/components/ui/button";
import { Errors } from "@/feature/passwordChange";
import InputWithButton from "@/shared/ui/InputWithButton";
import InputWithLabel from "@/shared/ui/InputWithLabel";
import { validatePassword } from "@/shared/utils";
import { ChangeEvent, Dispatch, FormEvent, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { myPasswordChangeRequest, passwordCheckRequest, userInformationRequest } from "../service";
import { useAuth } from "@/app/providers/AuthProvider";
import { useToast } from "@/app/providers/ToastProvider";

interface UserContentProps {
  setIsModalState: Dispatch<SetStateAction<boolean>>;
}

function UserContent({ setIsModalState }: UserContentProps) {
  const [formData, setFormData] = useState({
    userName: "",
    userId: "",
    password: "",
    newPassword: "",
    rePassword: "",
  });

  const [errors, setErrors] = useState<Errors>({
    password: "",
    newPassword: "",
    rePassword: "",
  });
  const [isOpen, setOpen] = useState(false);

  const { getUser } = useAuth();
  const { addToast } = useToast();
  const token = getUser();

  useEffect(() => {
    userInformationRequest(token).then(result =>
      setFormData(prev => ({
        ...prev,
        userName: result.result.name || "",
        userId: result.result.employeeId || "",
        email: result.result.email || "",
      }))
    );
  }, []);

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
          newPassword: validation.valid ? "" : "비밀번호 양식을 확인해 주세요.",
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

  // 현재 비밀번호 입력 후 변경하기 버튼 클릭 시 새 비밀번호 인풋을 열어줌
  const handleInputOpen = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const token = getUser();
      const response = await passwordCheckRequest(token, formData.password);

      if (response.success) {
        setOpen(true);
        setErrors(prevErrors => ({
          ...prevErrors,
          password: "",
        }));
      }
    } catch (err: any) {
      console.error(err);
      if (err.message.includes("401")) {
        setErrors(prevErrors => ({
          ...prevErrors,
          password: "비밀번호가 틀렸습니다.",
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          password: "비밀번호 확인 중 오류가 발생했습니다.",
        }));
      }
    }
  };

  // 화면에 보이는 인풋 필드들이 모두 채워졌는지 확인하는 조건
  const isComplete =
    Boolean(formData.userName.trim()) &&
    Boolean(formData.userId.trim()) &&
    Boolean(formData.password.trim()) &&
    Boolean(formData.newPassword.trim()) &&
    Boolean(formData.rePassword.trim()) &&
    errors.newPassword === "" &&
    errors.rePassword === "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const currentPassword = formData.get("password") as string;
    const newPassword1 = formData.get("newPassword") as string;
    const newPassword2 = formData.get("rePassword") as string;

    const body = {
      currentPassword: currentPassword,
      newPassword1: newPassword1,
      newPassword2: newPassword2,
    };

    try {
      const response = await myPasswordChangeRequest(token, body);

      if (response.success) {
        setIsModalState(false);
        addToast("비밀번호가 변경되었습니다.", "success");
      }
    } catch (error: any) {
      console.error("비밀번호 변경 에러 발생");
      addToast("비밀번호에 실패하였습니다.", "error");
    }
  };

  return (
    <div className="flex flex-col w-full items-center px-[90px] pt-[80px] pb-[100px]">
      <h3 className="w-full text-gray-800 text-title-lg mb-10">유저정보</h3>
      <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
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

        <InputWithButton
          label="현재 비밀번호"
          type="text"
          id="password"
          name="password"
          placeholder="비밀번호를 입력해 주세요."
          value={formData.password}
          onChange={handleChange}
          disabled={formData.password === ""}
          buttonText="변경하기"
          onClick={handleInputOpen}
          error={errors.password}
        />
        {isOpen && (
          <InputWithLabel
            label="새 비밀번호"
            type="password"
            id="newPassword"
            name="newPassword"
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
            name="rePassword"
            placeholder="새 비밀번호를 입력해 주세요."
            value={formData.rePassword}
            onChange={handleChange}
            error={errors.rePassword}
          />
        )}
        <Button
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-100 text-[#fff] w-full h-[50px]"
          disabled={!isComplete}>
          변경하기
        </Button>
      </form>
    </div>
  );
}

export default UserContent;
