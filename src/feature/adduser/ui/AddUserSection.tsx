import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { useState } from "react";


function AddUserSection() {
  const [employeeInfo, setEmployeeInfo] = useState({
    name: "",
    employeeId: "",
    role: ""
  })

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
            className="w-[227px] h-[40px] placeholder:text-gray-100 border-gray-100"
          />
          <Button
            className="w-[120px] h-[40px] bg-[#FFF] border border-gray-100 text-gray-300 hover:bg-white !text-body-md-sb"
            disabled={!isDuplicateValid}
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
