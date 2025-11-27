import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import AuthProvider from "./contexts/AuthProvider.tsx";
import Fetcher from "../Fetcher.tsx";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <Fetcher />
          <App />
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
