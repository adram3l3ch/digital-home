import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DeviceContextProvider } from "./context";

const root = createRoot(document.getElementById("root")!);

root.render(
    // <StrictMode>
    <BrowserRouter>
        <DeviceContextProvider>
            <App />
        </DeviceContextProvider>
    </BrowserRouter>,
    // </StrictMode>,
);
