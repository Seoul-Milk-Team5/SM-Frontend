import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ApprovalModalProps } from "../../feature/searchFile";
import { approvalData } from "../../feature/searchFile/model/mock/approvalData";

const mockData = approvalData;

export default function ApprovalModal({ isOpen, onClose }: ApprovalModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[653px] h-[800px] p-[50px] rounded-[10px] max-h-[100vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center !text-body-md text-gray-300 font-normal">{mockData.id}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 cursor-pointer"></DialogClose>
        </DialogHeader>
        <div className="text-center text-title-lg mt-2">{mockData.provider}</div>
        <div className="flex justify-center items-center w-[342px] mx-auto rounded-[10px] bg-green-50 text-green-500 h-[46px] text-body-md">
          <p>"홈택스 조회 결과 발급된 사실이 있습니다."</p>
        </div>
        <div className="mt-6 space-y-4 text-gray-800 text-body-lg">
          <div className="flex justify-between"><span className="text-gray-300">승인번호</span><span>{mockData.approvalNumber}</span></div>
          <div className="flex justify-between mb-3"><span className="text-gray-300">작성일자</span><span>{mockData.date}</span></div>
          
          <div className="flex justify-between border-t border-[#EEEFEF] pt-3"><span className="text-gray-300">공급자명</span><span>{mockData.providerName}</span></div>
          <div className="flex justify-between"><span className="text-gray-300">공급자 사업자등록번호</span><span>{mockData.providerReg}</span></div>
          <div className="flex justify-between"><span className="text-gray-300">공급받는자명</span><span>{mockData.receiverName}</span></div>
          <div className="flex justify-between mb-3"><span className="text-gray-300">공급받는자 사업자등록번호</span><span>{mockData.receiverReg}</span></div>
          
          <div className="flex justify-between border-t border-[#EEEFEF] pt-3"><span className="text-gray-300">공급가액</span><span>{mockData.supplyAmount}</span></div>
          <div className="flex justify-between"><span className="text-gray-300">세액</span><span>{mockData.taxAmount}</span></div>
          <div className="flex justify-between"><span className="text-gray-300">총공급가액 합계</span><span>{mockData.totalAmount}</span></div>
        </div>
        
        <Button className="w-full h-[60px] mt-6 bg-green-500 hover:bg-green-600 text-white py-3 text-lg" onClick={onClose}>확인</Button>
      </DialogContent>
    </Dialog>
  );
}
