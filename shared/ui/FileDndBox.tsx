import React, { useState } from "react";

function FileDndBox() {
  const [files, setFiles] = useState<File[]>([]);

  console.log(files);

  // 드래그 오버 이벤트 (드래그 시 기본 이벤트 제거)
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // 파일이 드롭되었을 때
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        width: "300px",
        height: "200px",
        border: "2px dashed #aaa",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#f9f9f9",
      }}>
      <p>여기에 파일을 드래그 앤 드롭하세요!</p>
      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li> // ✅ key는 index 사용 가능하지만 고유 ID가 있으면 더 좋음
        ))}
      </ul>
    </div>
  );
}

export default FileDndBox;
