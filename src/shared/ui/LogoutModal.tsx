import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LogoutModalProps from "../model/LogoutModal.type";



export default function LogoutModal({ isOpen, onClose, onConfirmLogout }: LogoutModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex flex-col w-[524px] h-[315px] p-6 text-center items-center">
        <img src="/icon/alert.svg" className="w-[60px]"/>
        <DialogHeader>
          <DialogTitle className="!text-title-sm sm:!text-title-lg">정말 로그아웃 하시겠습니까?</DialogTitle>
        </DialogHeader>
        <p className="text-gray-300 text-body-sm sm:text-body-md">세금계산서 파일 업로드 중이었다면, 임시저장 해주세요.</p>
        <div className="flex justify-center gap-4 mt-6">
          <Button variant="outline" onClick={onClose} className="w-[120px] h-[60px] !text-title-md text-green-500 border border-green-500 hover:text-green-500 sm:w-[209px]">취소</Button>
          <Button className="w-[120px] h-[60px] sm:w-[209px] bg-green-500 text-white hover:bg-green-600 !text-title-md" onClick={onConfirmLogout}>
            로그아웃
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
