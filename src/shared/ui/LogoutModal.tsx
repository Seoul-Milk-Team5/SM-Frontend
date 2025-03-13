import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LogoutModalProps from "../model/LogoutModal.type";

export default function LogoutModal({ isOpen, onClose, onConfirmLogout }: LogoutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col py-4 w-[430px] text-center items-center">
        <img src="/icon/alert.svg" className="w-[50px]" />
        <DialogHeader>
          <DialogTitle className="text-[21px]">정말 로그아웃 하시겠습니까?</DialogTitle>
        </DialogHeader>
        <p className="text-gray-300 text-[14px]">세금계산서 파일 업로드 중이었다면, 임시저장 해주세요.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-[150px] text-green-500 border border-green-500 hover:text-green-500 py-5">
            취소
          </Button>
          <Button className="w-[150px] bg-green-500 text-white hover:bg-green-600 py-5" onClick={onConfirmLogout}>
            로그아웃
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
