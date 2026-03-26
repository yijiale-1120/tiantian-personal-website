import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DeepSeek from "./DeepSeek.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DeepSeek />
  </StrictMode>,
);
