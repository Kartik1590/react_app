import React, { StrictMode } from "react";
import ReactDOM from 'react-dom/client'
import App from './component/App'
import "./index.css"
import { QuizProvider } from "./component/QuizProvider";

const element=document.getElementById('root')
const root=ReactDOM.createRoot(element)
root.render(
    <StrictMode >
    <QuizProvider>
    <App />
    </QuizProvider>
    </StrictMode>
)