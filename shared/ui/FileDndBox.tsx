import { ChangeEvent, DragEvent, useRef, useState } from "react";

function FileDndBox() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  // 드래그 오버 이벤트 (드래그 시 기본 이벤트 제거)
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // 파일이 드롭되었을 때
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const selectedFiles = Array.from(event.target.files);
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="w-full h-[200px] border-2 border-dashed border-gray-400 rounded-[10px] flex flex-col items-center justify-center text-center bg-gray-100">
      <div>움짤 영역</div>
      <p>영수증 파일을 끌어다 놓거나 선택하세요.</p>
      <p>{files.length}/50(개) | 00mb</p>
      <input type="file" ref={fileInputRef} className="hidden" multiple onChange={handleFileChange} />
      <button className=" border border-solid p-5 w-[150px] rounded-xl" onClick={handleButtonClick}>
        파일 선택
      </button>
    </div>
  );
}

export default FileDndBox;
