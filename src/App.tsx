import { Router } from "./routes";
import "./styles/styles.scss";

const App = () => (
    <div className="page">
        <div className="app">
            <Router />
        </div>
        <div className="attribution">
            Developed by{" "}
            <a href="https://github.com/adram3l3ch" target="_blank" rel="noopener noreferrer">
                adram3l3ch
            </a>{" "}
            & Designed by{" "}
            <a href="https://dribbble.com/haloweb" target="_blank" rel="noopener noreferrer">
                Halo UI UX
            </a>
        </div>
    </div>
);

export default App;
