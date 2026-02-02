import { RouterProvider } from "react-router";
import { router } from "@/routes/AppRoutes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}

export default App;
