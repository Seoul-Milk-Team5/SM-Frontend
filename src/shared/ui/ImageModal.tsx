import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ImageModalProps {
  btnName: string;
  imageUrl: string;
}

export function ImageModal({ btnName, imageUrl }: ImageModalProps) {
  const isPdf = imageUrl ? imageUrl.endsWith(".pdf") : false;

  return (
    <Dialog>
      <DialogTrigger asChild className="reset-styles">
        <Button variant="outline">{btnName}</Button>
      </DialogTrigger>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[905px] h-[700px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <img className="w-[24px] h-[24px]" src="/icon/file.svg" alt="파일 아이콘" />
            <p className="text-body-lg text-gray-500 ellipsis2">{imageUrl}</p>
          </div>
        </DialogHeader>
        <div className="flex-grow flex justify-center items-center overflow-hidden">
          {imageUrl ? (
            isPdf ? (
              <iframe src={imageUrl + "#toolbar=0&navpanes=0&scrollbar=0"} className="flex-grow w-full h-[50vh]" />
            ) : (
              <img src={imageUrl} alt="미리보기 이미지" className="w-full h-full object-contain" />
            )
          ) : (
            <p className="text-center text-gray-500">미리볼 파일이 없습니다.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
