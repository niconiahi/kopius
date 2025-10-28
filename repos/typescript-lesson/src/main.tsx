import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const element = document.getElementById("root");
if (!element) {
  throw new Error('an element with the id "root" should exist');
}
createRoot(element).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
