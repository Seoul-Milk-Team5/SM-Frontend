import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function PasswordChangeModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">비밀번호 변경</Button>
      </DialogTrigger>
      <DialogContent className="w-[600px]">
        <DialogHeader>
          <DialogTitle>비밀번호 변경</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="userid" className="text-right">
              사번
            </Label>
            <Input id="userid" defaultValue="12345678" className="col-span-3" />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              이름
            </Label>
            <Input id="username" defaultValue="김가나" className="col-span-3" />
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              인증 이메일
            </Label>
            <Input id="username" defaultValue="김가나" className="col-span-3" />
            <Button>요청</Button>
          </div>
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              인증 번호
            </Label>
            <Input id="username" defaultValue="김가나" className="col-span-3" />
          </div>
        </div>
        <div className="flex flex-col gap-2 mx-auto">
          <DialogDescription>인증 이메일은 서울우유 사내 메일 주소만 가능합니다.</DialogDescription>
          <DialogDescription>정보 보안을 위해 5분에 하 번만 비밀번호를 변경할 수 있습니다.</DialogDescription>
        </div>
        <DialogFooter>
          <div>
            <Button type="submit">변경하기</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PasswordChangeModal;
