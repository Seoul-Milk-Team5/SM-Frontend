import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ErrorconformProps {
  btnName: string;
  className: string;
  onClick: () => void;
  disabled?: boolean;
}

function Errorconform({ btnName, className, onClick, disabled }: ErrorconformProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="submit" className={className} disabled={disabled}>
          {btnName}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col justify-center items-center w-[400px]">
        <AlertDialogHeader className="flex flex-col justify-center items-center">
          <img className="w-[50px] h-[50px]" src="/icon/error.svg" alt="에러" />
          <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription className="text-[14px]">삭제하시면 다시 복구시킬 수 없습니다.</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-4">
          <AlertDialogCancel className="w-[150px] mt-5 bg-[#fff] border-red-300 hover:text-red-300 hover:bg-[#fff] text-red-300 py-2 rounded-[10px]">
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-[150px] mt-5 bg-red-300  text-white hover:bg-red-400 hover:text-white py-2 rounded-[10px]"
            onClick={onClick}>
            확인
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Errorconform;
