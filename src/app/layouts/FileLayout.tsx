import FileProvider from "../providers/FileProvider";
import { Outlet } from "react-router-dom";

function FileLayout() {
  return (
    <FileProvider>
      <Outlet />
    </FileProvider>
  );
}

export default FileLayout;
