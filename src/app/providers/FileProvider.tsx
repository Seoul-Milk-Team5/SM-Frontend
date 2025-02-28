import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

interface FileContextType {
  files: File[];
  setFiles: Dispatch<SetStateAction<File[]>>;
}

interface FileProviderProps {
  children: ReactNode;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error("useFileContext는 FileProvider안에서 사용해야합니다.");
  }
  return context;
};

function FileProvider({ children }: FileProviderProps) {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    // 임시저장 데이터 받아와서 files 상태 초기화해주는 로직 필요
  }, []);
  return <FileContext.Provider value={{ files, setFiles }}>{children}</FileContext.Provider>;
}

export default FileProvider;
