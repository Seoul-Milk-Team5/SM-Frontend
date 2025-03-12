import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { authRequest, reAuthRequest } from "@/feature/main/service";
import { useAuth } from "@/app/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { OcrData } from "@/feature/main";
import { editInvoiceRequest } from "../api/editInvoiceRequest";

interface AuthModalContentProps {
  changeStep?: (step: number) => void;
  ocrData?: OcrData[] | undefined;
  isEditRequest?: boolean;
  taxInvoiceId?: number | null;
  dataTableFetch?: () => Promise<void>;
  editModalClose?: () => void;
}

function AuthModalContent({
  changeStep,
  ocrData,
  isEditRequest,
  taxInvoiceId,
  dataTableFetch,
  editModalClose,
}: AuthModalContentProps) {
  const { getUser } = useAuth();
  const token = getUser();
  const navigate = useNavigate();

  // 개별 상태 관리
  const [formData, setFormData] = useState({
    loginTypeLevel: 0,
    userName: "",
    firstPhoneNo: "",
    phoneNo: "",
    identity: "",
    telecom: "",
    isRequestConfirmed: false,
    agreeAll: false,
    agreePrivacy: false,
    agreeThirdParty: false,
  });

  const [isFormValid, setIsFormValid] = useState(false); // 버튼 활성화 상태
  const [key, setKey] = useState("");
  const [ocrBody, setOcrBody] = useState<OcrData[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //ocr 추출된 결과 리스트 불러오는 API 함수 연결
    setOcrBody(ocrData);
  }, [ocrData]);

  // 입력값 변경 핸들러 (input, select 공통 사용)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked,
      ...(name === "agreeAll" ? { agreePrivacy: checked, agreeThirdParty: checked } : {}),
    }));
  };

  // 간편인증
  const handleAuthRequest = async () => {
    setLoading(true);
    if (!ocrBody) {
      console.log("ocr 데이터가 없어요!");
    }

    const ocrReDataArray =
      ocrBody?.map(data => ({
        supplierRegNumber: data.extractedData.ipId || "",
        contractorRegNumber: data.extractedData.suId || "",
        approvalNo: data.extractedData.issueId || "",
        reportingDate: data.extractedData.erDat || "",
        supplyValue: data.extractedData.chargeTotal || "",
      })) ?? [];

    const requestData = {
      loginTypeLevel: formData.loginTypeLevel,
      userName: formData.userName,
      phoneNo: formData.firstPhoneNo + formData.phoneNo,
      identity: formData.identity,
      telecom: formData.telecom,
      taxInvoiceInfoList: ocrReDataArray,
    };

    const editRequestData = {
      taxInvoiceId: taxInvoiceId ?? 0,
      issueId: ocrBody?.[0]?.extractedData?.issueId || "",
      erDat: ocrBody?.[0]?.extractedData?.erDat || "",
      suId: ocrBody?.[0]?.extractedData?.suId || "",
      ipId: ocrBody?.[0]?.extractedData?.ipId || "",
      chargeTotal: Number(ocrBody?.[0]?.extractedData?.chargeTotal || 0),
    };

    if (isEditRequest) {
      // 사용자 입력이 있을 경우 = 수정 요청
      console.log("요청할 데이터: ", editRequestData);
      const response = await editInvoiceRequest(token, editRequestData);
      console.log("수정 결과", response);
    }

    // 간편인증 요청 API 연결
    try {
      const response = await authRequest(token, requestData);
      if (response.success) {
        setLoading(false);
        setFormData(prev => ({ ...prev, isRequestConfirmed: true }));
      }
      if (typeof response.result === "object" && "key" in response.result) {
        setKey(response.result.key);
      }
    } catch (error) {
      console.error("Auth request failed:", error);
    }
  };

  // 진위 여부 확인
  const handleAuthClearAndHomeTaxRequest = async () => {
    try {
      const response = await reAuthRequest(token, key);
      changeStep?.(3);
      if (response.success) {
        if (isEditRequest) {
          if (dataTableFetch) {
            await dataTableFetch();
            editModalClose?.();
          }
          changeStep?.(1);
        } else {
          setTimeout(() => {
            navigate("/dashboard/searchfile");
            changeStep?.(1);
          }, 1500);
        }
      }
    } catch (error: any) {
      if (error.message.includes("500")) {
        alert("휴대폰으로 인증 후 버튼을 눌러주세요.!");
      }
    }
  };

  // 입력 값이 변경될 때마다 유효성 검사 실행
  useEffect(() => {
    setIsFormValid(
      formData.userName.trim() !== "" &&
        formData.phoneNo.trim() !== "" &&
        formData.identity.trim() !== "" &&
        // formData.telecom.trim() !== "" &&
        formData.agreePrivacy &&
        formData.agreeThirdParty
    );
  }, [formData]);

  const certificateIcons = {
    url: ["kakao", "payco", "samsung", "kbbank", "pass", "naver", "shbank", "toss", "banks"],
    name: ["카카오톡", "페이코", "삼성패스", "KB모바일", "통신사PASS", "네이버", "신한인증서", "toss", "뱅크샐러드"],
  };

  return (
    <div className="flex">
      {/* 좌측 인증서 선택 */}
      <div className="w-[40%] px-[60px] py-[50px]">
        <h4 className="text-title-md-b text-gray-800 mb-[45px]">민간 인증서</h4>
        <p className="text-body-lg text-gray-300 mb-[35px]">원하는 인증서를 선택하세요.</p>
        <div>
          <div className="grid grid-cols-3 gap-x-[25px] gap-y-[50px]">
            {certificateIcons.url.map((icon, index) => (
              <div className="flex flex-col items-center gap-1">
                <img
                  key={index}
                  className={`w-[80px] cursor-pointer transition-opacity ${
                    formData.loginTypeLevel === index + 1 ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                  src={`/icon/${icon}.svg`}
                  alt={icon}
                  onClick={() => setFormData(prev => ({ ...prev, loginTypeLevel: index + 1 }))}
                />
                <p className="text-[13px] text-gray-600">{certificateIcons.name[index]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 우측 본인인증 정보 입력 */}
      <div className="w-[60%] px-[70px] py-[50px] bg-gray-50">
        <h4 className="text-title-md-b text-gray-800 mb-[45px]">본인인증 정보 입력</h4>

        <div className="flex flex-col gap-[35px]">
          {/* 입력 필드 */}
          <div className="flex items-center">
            <Label className="text-body-lg text-gray-600 min-w-[90px]">성함</Label>
            <Input
              name="userName"
              className="max-w-[380px] h-[45px]"
              placeholder="홍길동"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <Label className="text-body-lg text-gray-600 min-w-[90px]">생년월일</Label>
            <Input
              name="identity"
              className="max-w-[380px] h-[45px]"
              placeholder="19990101"
              value={formData.identity}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <Label className="text-body-lg text-gray-600 min-w-[90px]">휴대폰 번호</Label>
            {formData.loginTypeLevel === 5 && (
              <Select onValueChange={value => handleSelectChange("telecom", value)}>
                <SelectTrigger className="w-[180px] h-[45px] bg-[#fff] border-gray-100  mr-3">
                  <SelectValue placeholder="통신사 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="0">SKT</SelectItem>
                    <SelectItem value="1">KT</SelectItem>
                    <SelectItem value="2">LGU+</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
            <Select onValueChange={value => handleSelectChange("firstPhoneNo", value)}>
              <SelectTrigger className="w-[180px] h-[45px] bg-[#fff] border-gray-100">
                <SelectValue placeholder="선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="010">010</SelectItem>
                  <SelectItem value="011">011</SelectItem>
                  <SelectItem value="016">016</SelectItem>
                  <SelectItem value="017">017</SelectItem>
                  <SelectItem value="018">018</SelectItem>
                  <SelectItem value="019">019</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Input
              name="phoneNo"
              className="max-w-[380px] h-[45px] ml-3"
              placeholder="나머지"
              value={formData.phoneNo}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 약관 동의 */}
        <div className="flex flex-col gap-[30px] mt-[70px]">
          <div className="flex items-center justify-between">
            <h4 className="text-title-md-b text-gray-800">서비스 이용에 대한 동의</h4>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.agreeAll}
                onCheckedChange={checked => handleCheckboxChange("agreeAll", checked as boolean)}
                className="w-[24px] h-[24px] border-gray-600"
              />
              <Label className="text-body-lg text-gray-600">전체동의</Label>
            </div>
          </div>
          {(["agreePrivacy", "agreeThirdParty"] as const).map((name, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={formData[name]}
                  onCheckedChange={checked => handleCheckboxChange(name, checked as boolean)}
                  className="w-[24px] h-[24px] border-gray-600"
                />
                <Label className="text-body-lg text-gray-600">
                  {name === "agreePrivacy" ? "개인정보 이용 동의 (필수)" : "제3자정보제공동의 (필수)"}
                </Label>
              </div>
              <p className="underline text-body-lg text-gray-800 cursor-pointer">보기</p>
            </div>
          ))}
        </div>

        {/* 버튼 */}
        <div className="w-full flex justify-between gap-5 mt-[70px]">
          <Button
            type="button"
            variant="outline"
            className={`w-[50%] border-green-500 py-3.5 px-6 p-[26px] text-title-md ${
              isFormValid
                ? "text-green-500 hover:text-green-600 cursor-pointer"
                : "border-gray-100 text-gray-300 cursor-not-allowed"
            }`}
            onClick={handleAuthRequest}>
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="w-8 h-8 border-4 border-gray-100 border-t-green-300 rounded-full animate-spin"></div>
              </div>
            ) : (
              "인증 요청"
            )}
          </Button>
          <Button
            className={`w-[50%] py-3.5 px-6 text-title-md text-white p-[26px] ${
              formData.isRequestConfirmed
                ? "bg-green-500 hover:bg-green-600 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!formData.isRequestConfirmed}
            onClick={handleAuthClearAndHomeTaxRequest}>
            인증완료
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AuthModalContent;
