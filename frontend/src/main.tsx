import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router";
import { Dialog } from "@radix-ui/react-dialog";

import "./index.css";
import App from "./App.tsx";
import ErrorFallback from "./components/ErrorFallback.tsx";
import AppLoader from "./components/AppLoader.tsx";
import AppContextProvider from "./Providers/AppProvider.tsx";
import ModalWrapper from "./components/ModalWrapper.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        fallbackRender={ErrorFallback}
        onReset={() => {
          queryClient.refetchQueries();
        }}
      >
        <Suspense fallback={<AppLoader />}>
          <BrowserRouter>
            <AppContextProvider>
              <Dialog>
                <App />
                <ModalWrapper />
              </Dialog>
            </AppContextProvider>
          </BrowserRouter>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
);
