import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { EditModalProps } from "../model/EditModal.type";
import { editData } from "../model/mock/unapprovalData";


export default function EditApprovalModal({ isOpen, onClose }: EditModalProps) {

  const unapprovalData = editData;
  const [formData, setFormData] = useState(unapprovalData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[1100px] h-[677px] !max-w-none !p-0 sm:max-h-[80vh] sm:overflow-auto">
      <DialogHeader className="hidden">
          <DialogTitle>
          </DialogTitle>
     </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="text-body-md text-gray-300">{formData.id}</div>
            <div className="text-title-md text-gray-800">{formData.supplierName}</div>
            <div className="p-3 w-[380px] h-[72px] bg-red-50 text-red-500 text-center rounded-[10px] text-body-sm">
              해당 세금계산서는 텍스트 추출 오류로 검증 실패 되었습니다.
              홈택스에서 진위여부를 확인 후 직접 입력해주세요.
            </div>
            <img src={"https://miricanvas-designhub.zendesk.com/hc/article_attachments/21153709437465"} alt="세금계산서" className="w-[400px] mt-4" />
            <Button
              variant="outline"
              className=" h-[40px] w-[370px] mt-2 !text-body-sb bg-green-50 text-green-500"
              onClick={() => window.open("https://www.hometax.go.kr/", "_blank")}
            >
              진위여부 확인하기
            </Button>
          </div>
          <div className="flex flex-col justify-center items-center space-y-4 bg-gray-50">
            <p className="p-1 bg-gray-100 text-center rounded-[10px] text-body-sm w-[400px] text-gray-800 mb-10 mt-4">
              올바른 내역이 입력되었는지 다시 한 번 확인해주세요.
            </p>
            <div className="flex flex-col gap-2 w-[400px] text-body-sm">
              <div className="flex space-y-2 justify-between">
                <label>작성일자</label>
                <Input name="createdAt" value={formData.createdAt} onChange={handleChange} className="h-[35px] w-[90px]"/>
              </div>
              <div className="flex space-y-2 justify-between mb-7">
                <label>승인번호</label>
                <Input name="approvalNumber" value={formData.approvalNumber} onChange={handleChange} className="h-[35px] w-[250px]"/>
              </div>
              <div className="flex space-y-2 justify-between">
                <label>공급자명</label>
                <Input name="supplierName" value={formData.supplierName} onChange={handleChange} className="w-[160px] h-[35px]"/>
              </div>
              <div className="flex space-y-2 justify-between">
                <label>공급자 사업자등록번호</label>
                <Input name="supplierBusinessNumber" value={formData.supplierBusinessNumber} onChange={handleChange} className="w-[150px] h-[35px]"/>
              </div>
              <div className="flex space-y-2 justify-between">
                <label>공급받는자명</label>
                <Input name="receiverName" value={formData.receiverName} onChange={handleChange} className="w-[170px] h-[35px]"/>
              </div>
              <div className="flex space-y-2 justify-between mb-10">
                <label>공급받는자 등록번호</label>
                <Input name="receiverBusinessNumber" value={formData.receiverBusinessNumber} onChange={handleChange} className="w-[150px] h-[35px]"/>
              </div>
              <div className="flex space-y-2 justify-between mb-10">
                <label>공급가액</label>
                <Input name="supplyAmount" value={formData.supplyAmount} onChange={handleChange} className="w-[140px] h-[35px]"/>
              </div>
              <Button className="h-[40px] w-[370px] bg-green-600 text-white">저장하기</Button>                
              </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
