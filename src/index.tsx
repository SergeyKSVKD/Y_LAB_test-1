import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.scss';
import { Authorization } from "./components/Authorization/Authorization";

const rootElement = document.getElementById("root")
const root = createRoot(rootElement!)

root.render(<StrictMode>
    <Authorization />
</StrictMode>)