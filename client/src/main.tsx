import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Toaster position="top-right" expand />
    <App />
  </BrowserRouter>
);
