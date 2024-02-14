import React from "react";
import { useQuiz } from "./QuizProvider";
const StartScreen =()=>{
    const {numQuestions,dispatch}=useQuiz()
    return (
        <div className="start">
            <h2>Welcome to the React Quiz!</h2>
            <h3>{numQuestions} question to test your React mastery</h3>
            <button className="btn" onClick={()=>dispatch({type:'start'})}>Let's Go &rarr;</button>
        </div>)
}
export default StartScreen