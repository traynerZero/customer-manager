import "bootstrap";
import { createRoot } from "react-dom/client";
import App from "./layouts/App";
const root = createRoot(document.getElementById("app"));
root.render(<App />);
