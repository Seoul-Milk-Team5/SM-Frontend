import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ThirdPartyAgreementDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="underline text-[14px] text-gray-800 cursor-pointer">
          보기
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogTitle className="text-lg font-semibold text-gray-900">제3자 정보 제공 동의</DialogTitle>
        <DialogDescription className="max-h-[500px] overflow-y-auto p-4 border border-gray-200 rounded-md bg-gray-50 text-gray-800">
          <h2 className="text-xl font-bold text-blue-700 border-b pb-2 mb-4">국세청의 개인정보 제3자 제공</h2>
          <p className="mb-4">
            국세청은 정보주체의 동의, 법률에 특별한 규정이 있는 경우 등 <strong>개인정보보호법 제17조 및 제18조</strong>
            에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
          </p>

          <section className="mb-6">
            <h3 className="font-semibold text-gray-900">(가) 용어의 정의</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong>연계정보(CI):</strong> 특정 개인을 식별하기 위해 본인확인기관에서 생성한 암호화된 개인식별번호
              </li>
              <li>
                <strong>인증사업자:</strong> 카카오, NHN페이코, 통신사패스, KB국민은행, 한국정보인증(삼성패스),
                신한은행, 네이버, 토스, 하나은행, NH농협, 뱅크샐러드, 카카오뱅크, 우리은행, 드림시큐리티 등 전자서명
                서비스를 제공하는 사업자
              </li>
              <li>
                <strong>본인확인기관:</strong> 코리아크레딧뷰로(KCB) 등 본인확인 서비스를 제공하는 사업자
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h3 className="font-semibold text-gray-900">(나) 제3자 제공에 관한 사항</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong>개인정보를 제공받는 자:</strong> 인증사업자, 본인확인기관
              </li>
              <li>
                <strong>제공받는 자의 개인정보 이용목적:</strong> 간편인증 시 본인확인 또는 전자서명
              </li>
              <li>
                <strong>제공하는 개인정보 항목:</strong> 주민등록번호(외국인등록번호) 또는 생년월일(로그인 시), 성명,
                휴대폰번호
              </li>
              <li>
                <strong>제공받는 자의 보유 및 이용기간:</strong> 본인확인 또는 전자서명 후 즉시 파기
              </li>
            </ul>
          </section>

          <section className="text-red-600 font-semibold">
            <p>위 개인정보의 제3자 제공 동의를 거부할 수 있습니다.</p>
            <p>다만, 관련 홈택스 이용 목적에 따른 서비스의 제한이 있을 수 있습니다.</p>
          </section>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
