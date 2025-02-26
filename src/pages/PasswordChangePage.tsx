import Description from "@/feature/passwordChange/ui/Description";
import PasswordChangeForm from "@/feature/passwordChange/ui/PasswordChangeForm";

function PasswordChangePage() {
  return (
    <main className="max-w-[1280px] mx-auto min-h-screen flex flex-col justify-center items-center gap-6">
      <h1 className="w-[50%] text-xl font-bold">비밀번호 변경</h1>
      <PasswordChangeForm />
      <Description />
    </main>
  );
}

export default PasswordChangePage;
