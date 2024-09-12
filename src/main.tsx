import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { DeviceContextProvider } from "./context";

const root = createRoot(document.getElementById("root")!);

root.render(
    <BrowserRouter basename="/digital-home">
        <DeviceContextProvider>
            <App />
        </DeviceContextProvider>
    </BrowserRouter>,
);
