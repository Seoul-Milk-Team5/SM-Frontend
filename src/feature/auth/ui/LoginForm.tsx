import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PasswordChangeModal from "./PasswordChangeModal";

function LoginForm() {
  return(
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-4">
        {/* 브랜드 로고 추가 */}
        <img src="/logo/Logomark.svg" alt="Company Logo" className="w-sm h-sm object-contain"/>
        <p className="text-center text-gray-700 mt-2">
          초일류 유제품 전문기업으로 나아가는 길에 언제나 당신이 있습니다.
        </p>
      </div>
      <Card className="h-[300px] flex flex-col justify-center">
        <CardContent>
          <form>
            <div className="mb-4">
              <Input id="emplyeeId" type="text" placeholder="사번을 입력해주세요" />
            </div>
            <div className="mb-4">
              <Input id="password" type="password" placeholder="비밀번호를 입력해주세요." />
            </div>
            <Button type="submit" className="w-full bg-gray-800 hover:bg-gray-600">
              로그인
            </Button>
          </form>
          <div className="flex text-center mt-4 justify-center items-center">
            <p className="text-sm text-gray-800">
              비밀번호를 잊어버리셨나요? 
            </p>
            <PasswordChangeModal />
          </div>
        </CardContent>
      </Card>      
    </div>
  )
}

export default LoginForm;
