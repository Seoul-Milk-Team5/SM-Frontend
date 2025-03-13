import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function PrivacyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="underline text-[14px] text-gray-800 cursor-pointer">
          보기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogTitle className="text-lg font-semibold text-gray-900">개인정보 수집 및 이용 동의</DialogTitle>
        <DialogDescription className="max-h-[500px] overflow-y-auto p-4 border border-gray-200 rounded-md bg-gray-50 text-gray-800">
          <h2 className="text-xl font-bold text-blue-700 border-b pb-2 mb-4">“국세청” 귀중</h2>
          <p className="mb-4">
            본인은 “국세청”(이하 ‘기관’)이 제공하는 간편인증서비스(이하 ‘서비스’)를 이용하기 위해, 다음과 같이 기관이
            본인의 개인정보를 수집/이용하고, 개인정보의 취급을 위탁하는 것에 동의합니다.
          </p>

          <section className="mb-6">
            <h3 className="font-semibold text-gray-900">(1) 수집항목</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>이용자의 성명, 생년월일</li>
              <li>이동전화번호연계정보(CI), 중복가입확인정보(DI)</li>
              <li>이용자가 이용하는 웹사이트 또는 Application 정보</li>
              <li>이용일시, 내외국인 여부, 가입한 간편인증 사업자</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="font-semibold text-gray-900">(2) 이용목적</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>이용자가 웹사이트 또는 Application에 입력한 본인확인 정보의 정확성 여부 확인</li>
              <li>본인인증(전자서명) 및 CI/DI 전송</li>
              <li>서비스 관련 상담 및 불만 처리</li>
              <li>이용 패턴 분석 및 서비스 개선</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="font-semibold text-gray-900">(3) 개인정보의 보유 및 이용 기간</h3>
            <p>이용자가 서비스를 이용하는 기간 동안 보유 및 이용됩니다.</p>
            <p>단, 법령에서 정하는 경우 해당 기간까지 보유됩니다.</p>
          </section>

          <section className="mb-6">
            <h3 className="font-semibold text-gray-900">(4) 본인확인서비스 제공을 위한 개인정보의 취급위탁</h3>
            <p>
              <strong>수탁자:</strong> 카카오, 통신사패스, NHN페이코, 한국정보인증(삼성패스), KB국민은행, 네이버,
              신한은행, 토스, 하나은행, NH농협, 뱅크샐러드, 카카오뱅크, 우리은행, 드림시큐리티
            </p>
            <p>
              <strong>취급위탁 업무:</strong> 본인확인 및 인증, CI/DI 생성 및 전송, 서비스 관련 상담 및 불만 처리 등
            </p>
          </section>

          <section className="mb-6">
            <h3 className="font-semibold text-red-600">(5) 동의 거부에 따른 불이익</h3>
            <p>개인정보 수집 및 이용에 동의하지 않으실 경우, 서비스를 이용하실 수 없습니다.</p>
          </section>

          <hr className="my-6" />

          <h2 className="text-xl font-bold text-blue-700 border-b pb-2 mb-4">“카카오, 통신사패스 등 수탁업체” 귀중</h2>
          <p className="mb-4">
            귀사가 국세청으로부터 위탁받아 제공하는 간편인증서비스와 관련하여 본인의 개인정보를 수집·이용하고자 하는
            경우, 본인의 동의를 얻어야 합니다.
          </p>

          <section className="mb-6">
            <h3 className="font-semibold text-gray-900">(1) 개인정보의 수집 및 이용 목적</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>홈택스 서비스 이용을 위한 본인확인, 본인인증 또는 전자서명</li>
              <li>국세청에 이용자 정보 전송</li>
              <li>휴대폰 사용자 확인을 위한 SMS 인증번호 전송</li>
              <li>부정 이용 방지 및 수사의뢰</li>
              <li>민원처리, 고지사항 전달 등</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="font-semibold text-gray-900">(2) 수집하는 개인정보 항목</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>휴대폰번호, 성명, 생년월일, 내/외국인 구분</li>
              <li>연계정보(CI), 중복가입확인정보(DI)</li>
              <li>인증처 및 사이트 URL, 인증일시, IP주소 등</li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="font-semibold text-gray-900">(3) 개인정보의 제공</h3>
            <p>
              <strong>제공 받는 자:</strong> 국세청
            </p>
            <p>
              <strong>제공 목적:</strong> 간편인증서비스 업무대행
            </p>
            <p>
              <strong>제공 항목:</strong> 성명, 생년월일, 휴대폰번호, 연계정보(CI)
            </p>
            <p>
              <strong>보유 기간:</strong> 이용목적 달성 시까지
            </p>
          </section>

          <section className="mb-6">
            <h3 className="font-semibold text-gray-900">(4) 개인정보의 보유 및 이용 기간</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>신용정보의 이용 및 보호 관련 법률: 3년</li>
              <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
              <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
              <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold text-red-600">(5) 동의 거부권리 및 거부에 따른 불이익</h3>
            <p>개인정보 수집·이용 및 제공에 따른 동의는 거부할 수 있으며, 동의 후에도 언제든지 철회 가능합니다.</p>
            <p>단, 동의 거부 시에는 서비스 이용이 제한될 수 있습니다.</p>
          </section>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
