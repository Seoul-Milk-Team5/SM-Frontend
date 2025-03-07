import { useFileContext } from "@/app/providers/FileProvider";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useRef } from "react";

function MobileMainPage() {
  const { mergeFiles, updateClientFiles } = useFileContext();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFiles = Array.from(event.target.files);
    updateClientFiles(selectedFiles);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <>
      <div className="w-full flex justify-between items-center border-b-2 border-b-gray-50 py-5">
        <h1 className="text-[#000] text-title-md-b">사진 업로드</h1>
        <div className="flex items-center">
          <img className="w-[45px] h-[45px] cursor-pointer gap-3" src="/icon/camera.svg" alt="휴대폰 카메라 켜기" />
          <Button className="w-[58px] h-[30px]">선택</Button>
        </div>
      </div>
      <section>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            multiple
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-100 text-white rounded-[10px] text-body-lg h-[50px] w-[300px] cursor-pointer"
            disabled={mergeFiles.length >= 50}
            onClick={handleButtonClick}>
            파일 선택
          </button>
        </div>
      </section>
    </>
  );
}

export default MobileMainPage;
