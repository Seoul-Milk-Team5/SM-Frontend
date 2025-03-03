import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AuthModalContent from "./\bAuthModalContent";

interface AuthModalProps {
  btnName: string;
  disable: boolean;
}

export function AuthModal({ btnName }: AuthModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-green-500 hover:bg-green-600 cursor-pointer disabled:bg-green-200 disabled:opacity-100 py-3.5 px-6 text-body-md-sb text-white">
          {btnName}
        </Button>
      </DialogTrigger>
      <AuthModalContent />
    </Dialog>
  );
}
