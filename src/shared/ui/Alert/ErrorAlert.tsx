import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ErrorAlertProps {
  btnName: string;
  title: string;
  description: string;
}

function ErrorAlert({ btnName, title, description }: ErrorAlertProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="submit"
          className="w-[15%] bg-green-500  hover:bg-green-600 py-6 text-[17px] text-white cursor-pointer">
          {btnName}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col justify-center items-center w-[400px]">
        <AlertDialogHeader className="flex flex-col justify-center items-center">
          <img className="w-[50px] h-[50px]" src="/icon/error.svg" alt="에러" />
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-[14px]">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction className="w-[175px] mt-5 bg-red-300  text-white hover:bg-red-400 hover:text-white py-2 rounded-[10px]">
          확인
        </AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ErrorAlert;
