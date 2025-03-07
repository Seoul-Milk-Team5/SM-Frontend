import { useAuth } from "@/app/providers/AuthProvider";
import { useFileContext } from "@/app/providers/FileProvider";
import { Button } from "@/components/ui/button";
import { saveFilePostRequest } from "@/feature/main/service";
import { ChangeEvent, MouseEvent, useRef, useState } from "react";

function MobileMainPage() {
  const { files, mergeFiles, updateClientFiles } = useFileContext();
  const { getUser } = useAuth();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // ✅ 선택된 파일 ID를 저장하는 상태
  const [selectedFiles, setSelectedFiles] = useState<Set<number>>(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // ✅ 저장 버튼 상태 관리

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFiles = Array.from(event.target.files);
    updateClientFiles(selectedFiles);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameralick = () => {
    cameraInputRef.current?.click();
  };

  const handleInputClick = (event: MouseEvent<HTMLInputElement>) => {
    event.currentTarget.blur();
  };

  // ✅ 선택 버튼 클릭 시 모드 토글
  const toggleSelectionMode = () => {
    setIsSelecting(!isSelecting);
    setSelectedFiles(new Set()); // 초기화
  };

  // ✅ 개별 요소 선택/해제
  const toggleFileSelection = (fileId: number) => {
    if (!isSelecting) return; // 선택 모드가 아닐 때 클릭 무시

    setSelectedFiles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId); // 선택 해제
      } else {
        newSet.add(fileId); // 선택 추가
      }
      return newSet;
    });
  };

  // ✅ 저장 버튼 클릭 시 처리
  const handleFileSaveRequest = async () => {
    if (!files?.clientFiles.length) return; // 파일이 없으면 실행 안 함

    setIsSaving(true); // ✅ 저장 중 상태 설정
    const token = getUser();
    await saveFilePostRequest(token, files.clientFiles);
    setIsSaving(false); // ✅ 저장 완료 후 버튼 비활성화 상태 변경
  };

  // ✅ 저장 버튼 클래스 동적 변경
  const buttonClass =
    files?.clientFiles.length || (0 > 0 && !isSaving)
      ? "bg-green-500 hover:bg-green-600 opacity-100"
      : "bg-gray-100 opacity-100";

  return (
    <>
      <div className="w-full flex justify-between items-center border-b-2 border-b-gray-50 mb-5">
        <h1 className="text-[#000] text-title-md-b">사진 업로드</h1>
        <div className="flex items-center gap-5">
          <img
            onClick={handleCameralick}
            className="w-[45px] h-[45px] cursor-pointer"
            src="/icon/camera.svg"
            alt="휴대폰 카메라 켜기"
          />
          <Button
            className="w-[58px] h-[30px] bg-green-500 hover:bg-green-600 text-body-md-m text-white"
            onClick={toggleSelectionMode}>
            {isSelecting ? "취소" : "선택"}
          </Button>
        </div>
      </div>
      <section className="w-full mx-auto pb-[120px]">
        <div className="w-full grid grid-cols-3 gap-3 place-items-center">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            multiple
            onClick={handleInputClick}
            onChange={handleFileChange}
          />
          <input
            type="file"
            ref={cameraInputRef}
            accept="image/*"
            capture="environment"
            className="hidden"
            multiple
            onClick={handleInputClick}
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="max-w-[100px] w-full h-[135px] flex justify-center items-center text-white rounded-[10px] border-1 border-dashed"
            disabled={mergeFiles.length >= 50}
            onClick={handleButtonClick}>
            <img src="/icon/plus.svg" alt="사진 추가" />
          </button>
          {mergeFiles.map(file => {
            const isPdf = file.fileUrl ? file.fileUrl.endsWith(".pdf") : false;
            const isSelected = selectedFiles.has(file.id);

            return file.fileUrl ? (
              <div
                key={file.id}
                onClick={() => toggleFileSelection(file.id)}
                className={`w-full max-w-[100px] h-[135px] flex justify-center items-center border-1 border-solid rounded-[10px] ${
                  isSelected ? "border-green-500" : ""
                }`}>
                {isPdf ? "PDF" : <img src={file.fileUrl} alt="미리보기 이미지" className="h-full" />}
              </div>
            ) : (
              <p key={file.fileUrl} className="text-center text-gray-500">
                미리볼 파일이 없습니다.
              </p>
            );
          })}
        </div>
        <div>
          <Button
            className={`${buttonClass} w-full h-[100px] fixed bottom-0 left-0 rounded-none`}
            onClick={handleFileSaveRequest}
            disabled={isSaving || files?.clientFiles.length === 0}>
            {isSaving ? "저장 중..." : `총 ${files?.clientFiles.length ?? 0}장 저장하기`}
          </Button>
        </div>
      </section>
    </>
  );
}

export default MobileMainPage;
