import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";

interface ImageModalProps {
  btnName: string;
  imageUrl: string;
}

export function ImageModal({ btnName, imageUrl }: ImageModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild className="reset-styles">
        <Button variant="outline">{btnName}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[905px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <img className="w-[24px] h-[24px]" src="/icon/file.svg" alt="파일 아이콘" />
            <p className="text-body-lg text-gray-500">{imageUrl}</p>
          </div>
        </DialogHeader>
        <img src={imageUrl} alt="세금계산서" />
      </DialogContent>
    </Dialog>
  );
}
