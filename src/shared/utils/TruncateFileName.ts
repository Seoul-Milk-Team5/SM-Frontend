export const TruncateFileName = (fileName: string, maxLength = 20) => {
  if (fileName.length <= maxLength) return fileName;
  const extIndex = fileName.lastIndexOf(".");
  const ext = fileName.slice(extIndex); // 확장자 추출
  const baseName = fileName.slice(0, extIndex);
  return baseName.slice(0, maxLength - ext.length) + "..." + ext;
};