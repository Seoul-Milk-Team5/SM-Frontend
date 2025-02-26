import PasswordChangeForm from "@/feature/passwordChange/ui/PasswordChangeForm";

function PasswordChangePage() {
  return (
    <main className="max-w-[1280px] mx-auto min-h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="w-[50%] text-xl font-bold">비밀번호 변경</h1>
      <PasswordChangeForm />
      {/* 설명 메시지 */}
      <div className="text-sm text-gray-600">
        <p>인증 이메일은 서울우유 사내 메일 주소만 가능합니다.</p>
        <p>정보 보안을 위해 5분에 한 번만 비밀번호를 변경할 수 있습니다.</p>
        <p>비밀번호는 영어 대/소문자, 숫자, 특수문자 1개 이상 포함, 최소 8자 이상 ~ 16자 이하여야 합니다.</p>
      </div>
    </main>
  );
}

export default PasswordChangePage;
