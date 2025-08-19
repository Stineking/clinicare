import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";
import Authprovider from "./store/AuthProvider";
//create/initialize a client
const queryClient = new QueryClient();


function App() {
  return (
    <>
      <Toaster position="top-right" richColors={true} />
      <QueryClientProvider client={queryClient}>
        <Authprovider>
          <AppRoutes />
        </Authprovider>
      </QueryClientProvider>
    </>
  );
}

export default App;
