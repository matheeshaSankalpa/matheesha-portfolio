import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./index.css";
import "./styles/responsive.css";
import "./styles/refinements.css";
import "./styles/polish.css";
import "./styles/motion.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Analytics mode={import.meta.env.PROD ? "production" : "development"} />
  </StrictMode>,
);
