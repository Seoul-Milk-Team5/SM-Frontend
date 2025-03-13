import { Badge } from "@/components/ui/badge";


export default function StatusTooltipContent() {
  return (
   <div>
      <div className="flex gap-2 mb-4">
        <img src="/icon/tooltip.svg" />
        <span className="text-body-md-sb text-gray-700">승인 상태 가이드라인</span>
      </div>
      <div className="space-y-7 text-label-xs text-gray-700">
        <div className="flex items-center">
          <Badge custom={"APPROVED"} className="!text-body-md-m">승인</Badge>
          <p className="ml-2">OCR 추출 성공 후, 제 3자 발급사실 조회를 진행해 발급사실이 있음을 확인했어요.</p>
        </div>
        <div className="flex items-center">
          <Badge custom={"REJECTED"} className="!text-body-md-m">반려</Badge>
          <p className="ml-2">OCR 추출 성공 후, 제 3자 발급사실 조회를 진행했으나 진위 여부가 불분명해요.</p>
        </div>
        <div className="flex items-center">
          <Badge custom={"UNAPPROVED"} className="!text-body-md-m">검증 실패</Badge>
          <p className="ml-2">OCR 추출에 실패하여 수기 검증이 필요해요. 홈택스에서 수기 검증을 진행 후 저장해주세요. 세금계산서 파일 손상이 심한 경우에는 대리점에 문의해주세요.</p>
        </div>
      </div>
   </div>
  )
}