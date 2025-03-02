interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  // 다른 환경 변수들을 여기에 추가
  // 예: readonly VITE_ANOTHER_VARIABLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
