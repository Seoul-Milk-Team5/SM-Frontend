import Description from "@/feature/passwordChange/ui/Description";
import PasswordChangeForm from "@/feature/passwordChange/ui/PasswordChangeForm";
import Title from "@/feature/passwordChange/ui/Title";

function PasswordChangePage() {
  return (
    <main className="max-w-[1280px] mx-auto min-h-screen flex flex-col justify-center items-center gap-6">
      <Title />
      <PasswordChangeForm />
      <Description />
    </main>
  );
}

export default PasswordChangePage;
