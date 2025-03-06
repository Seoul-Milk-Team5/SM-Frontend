import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { EditModalProps } from "../../feature/searchFile/model/EditModal.type";
import BusinessInfo from "./BusinessInfo";
import { useAuth } from "@/app/providers/AuthProvider";
import { InvoiceViewRequest } from "../api/InvoiceViewRequest";
import { ModalData } from "../model";
import FormInput from "./FormInput";



export default function EditApprovalModal({ isOpen, onClose, index, rowId }: EditModalProps) {

  const [formData, setFormData] = useState<ModalData>({
    code: 0, // 기본값 설정
    message: "",
    success: false,
    result: {
      issueId: "",
      erDat: "",
      suName: "",
      suId: "",
      ipName: "",
      ipId: "",
      taxTotal: "",
      chargeTotal: "",
      grandTotal: "",
      processStatus: "UNAPPROVED", // 기본값
      url: "",
    },
  });
  const { token } = useAuth();

  const fetchData = async () => {
    if(!token) {
      alert("토큰이 없습니다.");
      return;
    }
    if(!rowId) {
      alert("일치하는 id가 없습니다.");
      return;
    }
    try{
      const response = await InvoiceViewRequest(token, rowId);
      if(!response) {
        console.error("응답 데이터가 없습니다.");
        return;
      }
      console.log("서버에서 받은 데이터", response);
      setFormData((prevState) => ({
        ...prevState,
        result: {
          ...prevState.result,
          ...response.result,
        }
      }));
    } catch (error) {
      console.log("상세정보를 가져오는데 실패", error);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    setFormData((prev) => ({
      ...prev!,
      result: {
        ...prev!.result,
        [name]: value, // 변경된 값 반영
      },
    }));
  };
  
  useEffect(() => {
    if(isOpen && rowId) {
      fetchData();
    }
  }, [isOpen, rowId])
  
  useEffect(() => {
    console.log("formData변경됨", formData);
  }, [formData]);  // formData가 변경될 때마다 로그 찍기

  const isPDF = formData?.result.url?.endsWith(".pdf");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[1100px] h-[677px] !max-w-none !p-0 sm:max-h-[80vh] sm:overflow-auto">
      <DialogHeader className="hidden">
          <DialogTitle>
          </DialogTitle>
     </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="text-body-md text-gray-300 mt-2">{index}</div>
            <div className="flex gap-[50px]">
              <BusinessInfo label="공급자" name={formData?.result.suName}/>
              <img src="/icon/arrow.svg"/>
              <BusinessInfo label="공급받는자" name={formData?.result.ipName}/>
            </div>
            
            <div className="p-3 w-[450px] h-[72px] bg-red-50 text-red-500 text-center rounded-[10px] text-body-sm">
              해당 세금계산서는 텍스트 추출 오류로 검증 실패 되었습니다.<br />
              홈택스에서 진위여부를 확인 후 직접 입력해주세요.
            </div>
            {formData?.result.url && (
              isPDF ? (
                <iframe
                  src={formData.result.url}
                  className="w-[550px] h-[400px] mt-4"
                  title="세금계산서 PDF"
                ></iframe>
              ) : (
                <img
                  src={formData.result.url}
                  alt="세금계산서"
                  className="w-[600px] h-auto mt-4"
                />
              )
            )}
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
              <FormInput label="작성일자" name="erDat" value={formData?.result.erDat} onChange={handleChange} width="110px" />
              <FormInput label="승인번호" name="issueId" value={formData?.result.issueId} onChange={handleChange} width="250px" />
              <FormInput label="공급자 사업자등록번호" name="suId" value={formData?.result.suId} onChange={handleChange} />
              <FormInput label="공급받는자 등록번호" name="ipId" value={formData?.result.ipId} onChange={handleChange} />
              <FormInput label="공급가액" name="taxTotal" value={formData?.result.taxTotal} onChange={handleChange} width="140px" />

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
