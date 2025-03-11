import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { useState } from "react";
import { EmployeeIdExists } from "../service/EmployeeIdExists";
import { useAuth } from "@/app/providers/AuthProvider";
import { AdduserRequest } from "../service/AddUserRequest";


function AddUserSection() {
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    employeeId: "",
    role: ""
  });
  const [isExist, setIsExist] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { getUser } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (role: "ROLE_NORMAL" | "ROLE_ADMIN") => {
    setEmployeeInfo((prev) => ({
      ...prev,
      role,
    }))
  };

  const checkEmployeeIdExists = async () => {
    const token = getUser();
    try{
      const response = await EmployeeIdExists(token, employeeInfo.employeeId);
      console.log("중복확인 요청 결과 : ", response);
      if(response.result) {
        setIsExist(true);
        setErrorMessage("이미 존재하는 사번입니다.");
      } else {
        setIsExist(false);
        setErrorMessage("확인되었습니다.");
      }
    } catch (error) {
      console.log("중복확인 중 에러 발생", error);
      setIsExist(false);
      setErrorMessage(error instanceof Error ?error.message : "중복확인 실패");
    }
  }

  const handleSubmitEmployee = async () => {
    const token = getUser();
    try{
      await AdduserRequest(token, employeeInfo);
      alert("사용자가 등록되었습니다.");
    } catch (error) {
      console.log("사용자 등록에 실패했습니다.", error);
      alert("사용자 등록에 실패했습니다.");
    }
  }

  const isFormValid = Object.values(employeeInfo).every((value) => value.trim() !== "");
  const isDuplicateValid = employeeInfo.employeeId.trim() !== "";
  const buttonStyle = "w-[72px] h-[39px] bg-[#FFF] hover:bg-white text-gray-800 text-body-sm border border-gray-100";


  return (
    <div>
      
      <div className="flex justify-between items-center">
        <h3 className="text-gray-800 text-title-sm">새 이용자 등록</h3>
        <Button
          className="w-[120px] h-[40px] disabled:bg-gray-100 bg-green-500 disabled:opacity-100 hover:bg-green-600 !text-body-md-sb"
          disabled={!isFormValid}
          onClick={handleSubmitEmployee}
        >
          등록하기
        </Button>
      </div>
      <div className="w-full bg-gray-0 h-1.5 mb-7 mt-4"></div>
      
      <div className="flex space-x-[35px] items-center">
        <label className="text-body-md-m text-gray-500">사번</label>
        <div className="flex gap-[10px] items-center">
          <Input 
            name="employeeId"
            placeholder="ex)000000"
            value={employeeInfo.employeeId}
            onChange={handleInputChange}
            className={clsx(
              "w-[227px] h-[40px] placeholder:text-gray-100 border-gray-100",
              isExist === true ? "border-red-500" : isExist === false ? "border-green-500" : ""
            )}
          />

          <Button
            className="w-[120px] h-[40px] bg-[#FFF] border border-gray-100 text-gray-300 hover:bg-white !text-body-md-sb"
            disabled={!isDuplicateValid}
            onClick={checkEmployeeIdExists}
          >
            중복확인
          </Button>
        </div>
        <div className="flex items-center gap-[35px]">
          <label className="text-body-md-m text-gray-500">사원명</label>
          <Input 
            name="name"
            placeholder="성함"
            value={employeeInfo.name}
            onChange={handleInputChange}
            className="w-[149px] h-[40px] border-gray-100 placeholder:text-gray-100"
          />
        </div>
      </div>
      {errorMessage && (
        <p className={clsx("text-sm mt-1 ml-[80px] ", isExist ? "text-red-500" : "text-green-500")}>
          {errorMessage}
        </p>
      )}
      <div className="flex items-center gap-[35px] mt-[44px]">
        <label className="text-body-md-m text-gray-500">권한</label>
        <div className="flex gap-[8px]">
          <Button 
            className={clsx(
              buttonStyle,
              employeeInfo.role === "ROLE_NORMAL" && "border-green-500 text-green-500"
            )}
            onClick={() => handleRoleSelect("ROLE_NORMAL")}
          >
            사용자
          </Button>
          <Button 
            className={clsx(
              buttonStyle,
              employeeInfo.role === "ROLE_ADMIN" && "border-green-500 text-green-500"
            )}
            onClick={() => handleRoleSelect("ROLE_ADMIN")}
          >
            관리자
          </Button>
        </div>
      </div>
      <div className="w-full bg-gray-0 h-1.5 mb-7 mt-[40px]"></div>
    </div>
  )
}

export default AddUserSection;
