import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

interface ResultData {
  id: number;
  employeeId: string;
  status: string;
  issueId: string;
  ipId: string;
  suId: string;
  taxTotal: number;
  erDat: string;
  ipBusinessName: string;
  suBusinessName: string;
  ipName: string;
  suName: string;
  imageUrl: string;
  errorDetails: string[];
  isTemporary: boolean;
  createdAt: string;
}

interface FileData {
  result: ResultData[];
  clientFiles: File[];
}

interface MergeFileData {
  id: number;
  date: string;
  fileUrl: string;
}

interface FileContextType {
  files: FileData | undefined;
  setFiles: Dispatch<SetStateAction<FileData | undefined>>;
  mergeFiles: MergeFileData[];
  updateClientFiles: (newFiles: File[]) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext는 FileProvider안에서 사용해야합니다.");
  }
  return context;
};

function FileProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<FileData>();
  const [mergeFiles, setMergeFiles] = useState<MergeFileData[]>([]);

  function updateClientFiles(newFiles: File[]) {
    setFiles(currentFiles => {
      if (!currentFiles) {
        // currentFiles가 undefined인 경우, 새로운 FileData 객체를 생성
        return { clientFiles: newFiles, result: [] }; // 또는 result를 적절한 기본값으로 설정
      } else {
        // currentFiles가 존재하는 경우, 기존 result를 유지하며 clientFiles만 업데이트
        return {
          ...currentFiles,
          clientFiles: [...currentFiles.clientFiles, ...newFiles],
        };
      }
    });
  }

  useEffect(() => {
    if (files) {
      // 클라이언트 파일들에 대한 URL 및 메타데이터 생성
      const clientFileData = files.clientFiles.map(file => ({
        url: URL.createObjectURL(file),
        id: uuidv4(), // 이전에는 UUID를 사용했지만 이제는 숫자 ID로 대체
        date: new Date().toISOString(), // 클라이언트 파일의 업로드 시간
      }));

      // ID 초기 값 설정
      let currentId = 1;

      // 서버에서 받은 결과와 클라이언트 파일을 합침
      const merged = [
        ...files.result.map(result => {
          const fileIndex = files.clientFiles.findIndex(file => file.name === result.imageUrl);
          return {
            id: currentId++, // 숫자 ID 할당 후 증가
            date: result.erDat,
            fileUrl: fileIndex !== -1 ? clientFileData[fileIndex].url : result.imageUrl,
          };
        }),
        ...clientFileData.map(file => ({
          id: currentId++, // 클라이언트 파일에 대한 숫자 ID 할당 후 증가
          date: file.date,
          fileUrl: file.url,
        })),
      ];

      setMergeFiles(merged);
    }
  }, [files]);

  return (
    <FileContext.Provider value={{ files, setFiles, mergeFiles, updateClientFiles }}>{children}</FileContext.Provider>
  );
}

export default FileProvider;
