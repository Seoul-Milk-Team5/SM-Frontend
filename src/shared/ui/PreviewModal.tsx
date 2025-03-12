import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileUrl: string | null;
}

export default function PreviewModal({ isOpen, onClose, fileUrl }: PreviewModalProps) {
  const [rotate, setRotate] = useState(0);
  const isPdf = fileUrl ? fileUrl.endsWith(".pdf") : false;

  const handleRotate = () => {
    setRotate((prev) => prev + 90); // 클릭시 90도 회전
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[905px] h-[700px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="border-b border-gray-100 h-8 text-gray-800 text-body-sm">미리보기</DialogTitle>
          <DialogClose onClick={onClose} />
        </DialogHeader>
        <div className="flex-grow flex justify-center items-center overflow-hidden">
          {fileUrl ? (
            isPdf ? (
              <iframe src={fileUrl} className="flex-grow w-full h-full" />
            ) : (
              <img 
                src={fileUrl} 
                alt="미리보기 이미지" 
                className="max-w-full max-h-full object-contain"
                style={{ transform: `rotate(${rotate}deg)`, transition: "transform 0.3s ease" }}
                onClick={handleRotate}
              />
            )
          ) : (
            <p className="text-center text-gray-500">미리볼 파일이 없습니다.</p>
          )}    
        </div>

      </DialogContent>
    </Dialog>
  );
}