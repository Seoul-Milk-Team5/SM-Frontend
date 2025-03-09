import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string | null;
}

export default function PreviewModal({ isOpen, onClose, fileUrl }: PreviewModalProps) {
  const isPdf = fileUrl ? fileUrl.endsWith(".pdf") : false;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[800px] h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>미리보기</DialogTitle>
          <DialogClose onClick={onClose} />
        </DialogHeader>
        {fileUrl ? (
          isPdf ? (
            <iframe src={fileUrl} className="flex-grow w-full h-full" />
          ) : (
            <img src={fileUrl} alt="미리보기 이미지" className="w-full h-auto object-contain" />
          )
        ) : (
          <p className="text-center text-gray-500">미리볼 파일이 없습니다.</p>
        )}
      </DialogContent>
    </Dialog>
  );
}