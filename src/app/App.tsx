import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { AppProviders } from "./providers";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
