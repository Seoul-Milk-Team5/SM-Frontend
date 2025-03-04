import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

interface AuthModalContentProps {
  changeStep?: (step: number) => void;
}

function AuthModalContent({ changeStep }: AuthModalContentProps) {
  // 개별 상태 관리
  const [loginTypeLevel, setLoginTypeLevel] = useState(0);
  const [userName, setUserName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [identity, setIdentity] = useState("");
  const [telecom, setTelecom] = useState("");
  ("");

  const certificateIcons = ["kakao", "payco", "samsung", "kbbank", "pass", "naver", "shbank", "toss", "banks"];

  return (
    <form className="flex">
      {/* 좌측 인증서 선택 */}
      <div className="w-[40%] px-[60px] py-[50px]">
        <h4 className="text-title-md-b text-gray-800 mb-[45px]">민간 인증서</h4>
        <p className="text-body-lg text-gray-300 mb-[35px]">원하는 인증서를 선택하세요.</p>
        <div>
          <div className="grid grid-cols-3 gap-x-[25px] gap-y-[50px]">
            {certificateIcons.map((icon, index) => (
              <img
                key={index}
                className={`w-[80px] cursor-pointer transition-opacity ${
                  loginTypeLevel === index + 1 ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
                src={`/icon/${icon}.svg`}
                alt={icon}
                onClick={() => setLoginTypeLevel(index + 1)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 우측 본인인증 정보 입력 */}
      <div className="w-[60%] px-[70px] py-[50px] bg-gray-50">
        <h4 className="text-title-md-b text-gray-800 mb-[45px]">본인인증 정보 입력</h4>

        <div className="flex flex-col gap-[35px]">
          {/* 입력 필드 */}
          <div className="flex items-center">
            <Label className="text-body-lg text-gray-600 min-w-[90px]">성함</Label>
            <Input
              className="max-w-[380px] h-[45px]"
              placeholder="홍길동"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Label className="text-body-lg text-gray-600 min-w-[90px]">생년월일</Label>
            <Input
              className="max-w-[380px] h-[45px]"
              placeholder="YYYYMMDD"
              value={identity}
              onChange={e => setIdentity(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Label className="text-body-lg text-gray-600 min-w-[90px]">휴대폰 번호</Label>
            <Select onValueChange={value => setTelecom(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue defaultValue="010" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="010">010</SelectItem>
                  <SelectItem value="011">011</SelectItem>
                  <SelectItem value="016">016</SelectItem>
                  <SelectItem value="017">017</SelectItem>
                  <SelectItem value="018">018</SelectItem>
                  <SelectItem value="019">019</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {loginTypeLevel === 5 && (
              <Select onValueChange={value => setTelecom(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="통신사 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>통신사</SelectLabel>
                    <SelectItem value="SKT">SKT</SelectItem>
                    <SelectItem value="KT">KT</SelectItem>
                    <SelectItem value="LGU+">LGU+</SelectItem>
                    <SelectItem value="알뜰폰">알뜰폰</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <Input
              className="max-w-[380px] h-[45px] ml-3"
              placeholder="01012345678"
              value={phoneNo}
              onChange={e => setPhoneNo(e.target.value)}
            />
          </div>
        </div>

        {/* 약관 동의 */}
        <div className="flex flex-col gap-[30px] mt-[70px]">
          <div className="flex items-center justify-between">
            <h4 className="text-title-md-b text-gray-800">서비스 이용에 대한 동의</h4>
            <div className="flex items-center gap-2">
              <Checkbox className="w-[24px] h-[24px] border-gray-600" />
              <Label className="text-body-lg text-gray-600">전체동의</Label>
            </div>
          </div>
          {["개인정보 이용 동의 (필수)", "제3자정보제공동의 (필수)"].map((label, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox className="w-[24px] h-[24px] border-gray-600" />
                <Label className="text-body-lg text-gray-600">{label}</Label>
              </div>
              <p className="underline text-body-lg text-gray-800 cursor-pointer">보기</p>
            </div>
          ))}
        </div>

        {/* 버튼 */}
        <div className="w-full flex justify-between gap-5 mt-[70px]">
          <Button
            variant="outline"
            className="w-[50%] border-green-500 hover:text-green-600 cursor-pointer py-3.5 px-6 text-body-md-sb text-green-500">
            인증요청
          </Button>
          <Button
            className="w-[50%] bg-green-500 hover:bg-green-600 cursor-pointer py-3.5 px-6 text-body-md-sb text-white"
            onClick={() => changeStep?.(3)}>
            인증완료
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AuthModalContent;
