import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import ContextProvider from "./context/SocketContext";

import * as process from "process";

(window as any).global = window;
(window as any).process = process;
(window as any).Buffer = [];

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <BrowserRouter>
        <ContextProvider>
            <App />
        </ContextProvider>
    </BrowserRouter>
);
