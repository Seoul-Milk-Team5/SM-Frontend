import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";

import { InvoiceViewRequest } from "../api/InvoiceViewRequest";
import { ModalData, ModalProps } from "../model";

export default function ApprovalModal({ isOpen, onClose, index, rowId }: ModalProps) {
  // console.log(rowId);
  const [invoiceInfo, setInvoiceInfo] = useState<ModalData | null>(null);

  const { getUser } = useAuth();

  const fetchData = async () => {
    const token = getUser();
    if (!token) {
      alert("토큰이 없습니다.");
      return;
    }
    if (!rowId) {
      alert("id 값이 없습니다.");
      return;
    }

    try {
      const response = await InvoiceViewRequest(token, rowId);
      setInvoiceInfo(response);
    } catch (error) {
      console.log("상세 정보 조회 실패", error);
    }
  };

  useEffect(() => {
    if (isOpen && rowId) {
      fetchData();
    }
  }, [isOpen, rowId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[653px] h-[800px] p-[50px] rounded-[10px] max-h-[100vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center !text-body-md text-gray-300 font-normal">{index}</DialogTitle>
          <DialogClose className="absolute right-4 top-4 cursor-pointer"></DialogClose>
        </DialogHeader>
        <div className="text-center text-title-lg mt-2">{invoiceInfo?.result.suName}</div>
        <div className="flex justify-center items-center w-[342px] mx-auto rounded-[10px] bg-green-50 text-green-500 h-[46px] text-body-md">
          <p>"홈택스 조회 결과 발급된 사실이 있습니다."</p>
        </div>
        <div className="mt-6 space-y-4 text-gray-800 text-body-lg">
          <div className="flex justify-between">
            <span className="text-gray-300">승인번호</span>
            <span>{invoiceInfo?.result.issueId}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-300">작성일자</span>
            <span>{invoiceInfo?.result.erDat}</span>
          </div>

          <div className="flex justify-between border-t border-[#EEEFEF] pt-3">
            <span className="text-gray-300">공급자명</span>
            <span>{invoiceInfo?.result.suName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">공급자 사업자등록번호</span>
            <span>{invoiceInfo?.result.suId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">공급받는자명</span>
            <span>{invoiceInfo?.result.ipName}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-300">공급받는자 사업자등록번호</span>
            <span>{invoiceInfo?.result.ipId}</span>
          </div>

          <div className="flex justify-between border-t border-[#EEEFEF] pt-3">
            <span className="text-gray-300">총 공급가액</span>
            <span>{invoiceInfo?.result.chargeTotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">총 세액</span>
            <span>{invoiceInfo?.result.taxTotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">총액(공급가액+세액)</span>
            <span>{invoiceInfo?.result.grandTotal}</span>
          </div>
        </div>

        <Button
          className="w-full h-[60px] mt-6 bg-green-500 hover:bg-green-600 text-white py-3 text-lg"
          onClick={onClose}>
          확인
        </Button>
      </DialogContent>
    </Dialog>
  );
}
