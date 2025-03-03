import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AuthModalContent() {
  return (
    <DialogContent className="sm:max-w-[1025px] p-0 overflow-hidden">
      <div className="flex">
        <div className="w-[40%] px-[60px] py-[50px]">
          <h4 className="text-title-md-b text-gray-800 mb-[45px]">민간 인증서</h4>
          <p className="text-body-lg text-gray-300 mb-[35px]">원하는 인증서를 선택하세요.</p>
          <div className="grid grid-cols-3 gap-x-[25px] gap-y-[50px]">
            <img className="w-[80px]" src="/icon/kakao.svg" alt="카카오톡" />
            <img className="w-[80px]" src="/icon/payco.svg" alt="페이코" />
            <img className="w-[80px]" src="/icon/samsung.svg" alt="카카오톡" />
            <img className="w-[80px]" src="/icon/kbbank.svg" alt="카카오톡" />
            <img className="w-[80px]" src="/icon/pass.svg" alt="카카오톡" />
            <img className="w-[80px]" src="/icon/naver.svg" alt="카카오톡" />
            <img className="w-[80px]" src="/icon/shbank.svg" alt="카카오톡" />
            <img className="w-[80px]" src="/icon/toss.svg" alt="카카오톡" />
            <img className="w-[80px]" src="/icon/banks.svg" alt="카카오톡" />
          </div>
        </div>
        <div className="w-[60%] px-[70px] py-[50px] bg-gray-50">
          <h4 className="text-title-md-b text-gray-800 mb-[45px]">본인인증 정보 입력</h4>
          <div className="flex flex-col gap-[35px]">
            <div className="flex items-center">
              <Label className="text-body-lg text-gray-600 min-w-[90px]">성함</Label>
              <Input className="max-w-[380px] h-[45px]" placeholder="홍길동" />
            </div>
            <div className="flex items-center">
              <Label className="text-body-lg text-gray-600 min-w-[90px]">생년월일</Label>
              <Input className="max-w-[380px] h-[45px]" placeholder="19990101" />
            </div>
            <div className="flex items-center">
              <Label className="text-body-lg text-gray-600 min-w-[90px]">휴대폰 번호</Label>
              <Input className="max-w-[380px] h-[45px]" placeholder="19990101" />
            </div>
          </div>
          <div className="flex flex-col gap-[30px] mt-[70px]">
            <div className="flex items-center justify-between">
              <h4 className="text-title-md-b text-gray-800">서비스 이용에 대한 동의</h4>
              <div className="flex items-center gap-2">
                <Checkbox className="w-[24px] h-[24px] border-gray-600" />
                <Label className="text-body-lg text-gray-600">전체동의</Label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox className="w-[24px] h-[24px] border-gray-600" />
                <Label className="text-body-lg text-gray-600">개인정보 이용 동의 (필수)</Label>
              </div>
              <p className="underline text-body-lg text-gray-800">보기</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox className="w-[24px] h-[24px] border-gray-600" />
                <Label className="text-body-lg text-gray-600">제3자정보제공동의 (필수)</Label>
              </div>
              <p className="underline text-body-lg text-gray-800">보기</p>
            </div>
          </div>
          <div className="w-full flex justify-between gap-5 mt-[70px]">
            <Button
              variant="outline"
              className="w-[50%] border-green-500 hover:text-green-600 cursor-pointer disabled:opacity-100 py-3.5 px-6 text-body-md-sb disabled:border-gray-100 disabled:text-gray-300 text-green-500">
              인증요청
            </Button>
            <Button className="w-[50%] bg-green-500 hover:bg-green-600 cursor-pointer disabled:opacity-100 py-3.5 px-6 text-body-md-sb disabled:border-gray-100 disabled:text-gray-300 text-[#fff]">
              인증완료
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default AuthModalContent;
