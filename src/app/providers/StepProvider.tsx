import { createContext, useContext, useState, ReactNode } from "react";

// StepContext의 타입 정의
interface StepContextType {
  steps: number;
  setSteps: (step: number) => void;
}

// Context 생성 (기본값은 undefined)
const StepContext = createContext<StepContextType | undefined>(undefined);

// StepProvider 컴포넌트 (전역으로 steps 상태 관리)
export function StepProvider({ children }: { children: ReactNode }) {
  const [steps, setSteps] = useState(1);

  return <StepContext.Provider value={{ steps, setSteps }}>{children}</StepContext.Provider>;
}

// Hook을 만들어서 쉽게 사용할 수 있도록 함
export function useStep() {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
}
