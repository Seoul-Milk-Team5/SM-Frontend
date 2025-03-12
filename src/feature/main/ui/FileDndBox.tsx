import { useFileContext } from "@/app/providers/FileProvider";
import { formatTimeFromFiles } from "@/shared/utils/FormatTime";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";

export function FileDndBox() {
  const { mergeFiles, updateClientFiles } = useFileContext();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragOver, setIsDragOver] = useState(false); // 드래그 상태 추적
  const [fileError, setFileError] = useState(false);

  useEffect(() => {
    if (mergeFiles.length !== 50) {
      setFileError(false);
    }
  }, [mergeFiles]);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    const droppedFiles = Array.from(event.dataTransfer.files);
    const sumFile = droppedFiles.length + mergeFiles.length > 50 ? false : true;

    if (sumFile) {
      updateClientFiles(droppedFiles);
      setFileError(false);
    } else {
      setFileError(true);
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFiles = Array.from(event.target.files);

    const sumFile = selectedFiles.length + mergeFiles.length > 50 ? false : true;
    if (sumFile) {
      updateClientFiles(selectedFiles);
      setFileError(false);
    } else {
      setFileError(true);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // 조건부 클래스 적용
  const dragOverClass = isDragOver
    ? mergeFiles.length >= 50
      ? "bg-red-50 border-red-500 border-solid"
      : "bg-green-50 border-green-500 border-solid"
    : "border-gray-200";

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full py-[40px] border-1 border-dashed ${dragOverClass} rounded-[10px] flex flex-col items-center justify-center gap-7 text-center bg-[#fff] mb-7`}>
        <p className="text-body-lg text-gray-800">
          세금계산서 파일을
          <br className="pc:hidden mb:block" /> 끌어다 놓거나 선택하세요.
        </p>
        <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} />
        <button
          type="button"
          className="bg-green-500 hover:bg-green-600 disabled:bg-gray-100 text-white rounded-[10px] text-body-lg h-[50px] w-[300px] cursor-pointer mb:w-[70%]"
          disabled={mergeFiles.length >= 50}
          onClick={handleButtonClick}>
          파일 선택
        </button>
      </div>
      <div className="w-full text-body-sm flex justify-between mb-10">
        <p className="text-gray-800">
          <span className="text-gray-800">{mergeFiles.length}/50(개)</span>
          {`| 예상 검증 시간: ${formatTimeFromFiles(mergeFiles.length)}`}
        </p>
        {fileError && <p className="text-red-500">파일 최대 업로드 갯수는 50개입니다.</p>}
      </div>
    </>
  );
}
