import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EditModalProps } from "../../feature/searchFile/model/EditModal.type";
import { editData } from "../../feature/searchFile/model/mock/unapprovalData";
import BusinessInfo from "./BusinessInfo";
import FormInput from "./formInput";


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
            <div className="flex gap-[50px]">
              <BusinessInfo label="공급자" name={formData.suBusinessName}/>
              <img src="/icon/arrow.svg"/>
              <BusinessInfo label="공급받는자" name={formData.ipBusinessName}/>
            </div>
            
            <div className="p-3 w-[450px] h-[72px] bg-red-50 text-red-500 text-center rounded-[10px] text-body-sm">
              해당 세금계산서는 텍스트 추출 오류로 검증 실패 되었습니다.<br />
              홈택스에서 진위여부를 확인 후 직접 입력해주세요.
            </div>
            <img src={"https://miricanvas-designhub.zendesk.com/hc/article_attachments/21153709437465"} alt="세금계산서" className="w-[400px] mt-4" />
          </div>
          <div className="flex flex-col justify-center items-center space-y-4 bg-gray-50">
            <Button
              variant="outline"
              className="h-[50px] w-[400px] mt-2 !text-title-sm bg-[#FFF] text-green-500 border border-green-500 hover:text-green-500"
              onClick={() => window.open("https://www.hometax.go.kr/", "_blank")}
            >
              <img src="/icon/step1.svg"/>
              진위여부 확인하기
            </Button>
            <div className="flex flex-col gap-4 w-[400px] text-body-sm ">
              <FormInput label="작성일자" name="createdAt" value={formData.createdAt} onChange={handleChange} width="90px" />
              <FormInput label="승인번호" name="approvalNumber" value={formData.approvalNumber} onChange={handleChange} width="250px" />
              <FormInput label="공급자 사업자등록번호" name="supplierBusinessNumber" value={formData.supplierBusinessNumber} onChange={handleChange} />
              <FormInput label="공급받는자 등록번호" name="receiverBusinessNumber" value={formData.receiverBusinessNumber} onChange={handleChange} />
              <FormInput label="공급가액" name="supplyAmount" value={formData.supplyAmount} onChange={handleChange} width="140px" />

              <p className="p-2 bg-gray-100 text-center rounded-[10px] text-body-sm w-[400px] text-gray-800 mb-10 mt-4">
                숫자와 영문만 입력 가능해요<br />
                올바른 내역이 입력되었는지 다시 한 번 확인해주세요.
              </p>
              <Button className="h-[50px] w-[400px] !text-title-sm bg-green-500 text-white hover:bg-green-600">
                <img src="/icon/step2.svg"/>
                저장하기
              </Button>                
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
