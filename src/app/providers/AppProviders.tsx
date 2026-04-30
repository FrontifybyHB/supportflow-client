import type { PropsWithChildren } from "react";
import { Toaster as HotToaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import { QueryProvider } from "@/lib/react-query/QueryProvider";
import { persistor, store } from "@/lib/redux/store";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryProvider>
          {children}
          <Toaster richColors closeButton position="top-right" />
          <HotToaster position="top-right" />
        </QueryProvider>
      </PersistGate>
    </Provider>
  );
}
