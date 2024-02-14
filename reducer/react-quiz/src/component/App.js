import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from './Loader'
import Error from './Error'
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import NextButton from "./NextButton";
import Retake from "./Retake";
import Timer from "./Timer";
import Footer from "./Footer";
import { useQuiz } from "./QuizProvider";


const App=()=>{
   
    const {status}=useQuiz();
    return <div className="app">
    <Header />
    <Main>
    {status==="loading"&&<Loader />}
    {status==="error"&&<Error />}
    {status==="ready"&& <StartScreen />}
    {status==="active" && <>
    <Progress />
    <Question  />
    <Footer>
    <Timer  />
    <NextButton />
    </Footer>
    </>}
    
    {status==='finished' && <><FinishScreen />
    <Retake /></>}
    </Main>
    </div>
    
}
export default App