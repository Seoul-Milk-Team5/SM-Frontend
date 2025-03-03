import { FileDndBox, PageHeader, FileUploadTable } from "@/feature/main";

function MainPage() {
  return (
    <>
      <PageHeader />
      <FileDndBox />
      <div className="w-full bg-gray-0 h-1.5 mb-13"></div>
      <FileUploadTable />
    </>
  );
}

export default MainPage;
