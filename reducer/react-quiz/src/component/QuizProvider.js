import React, { createContext, useContext } from 'react'

const QuizContext=createContext();

const QUES_PER_SEC=20;
const intialState={
    questions:[],
    status:"loading",
    index:0,
    answer:null,
    points:0,
    highScore:0,
    secondsRemaining:null
}
function reducer(state,action){
    switch(action.type){
        case 'dataReceived':
            return {
                ...state,
                questions:action.payload,
                status:"ready"
            }

        case "dataFailed":
            return {
                ...state,
                status:'error'
            }
        case "start":
            return{
                ...state,
                status:'active',
                secondsRemaining:state.questions.length*QUES_PER_SEC
            }
        case "newAnswer":
            const question=state.questions.at(state.index)
            return {
                ...state,
                answer:action.payload,
                points:action.payload===question.correctOption?state.points+question.points:state.points
            }
        case "nextQuestion":
            return {
                ...state,
                index:state.index+1,
                answer:null
            }

        case "finish":
            return {
                ...state,status:'finished',
                highScore:state.points>state.highScore?state.points:state.highScore
            }
        case 'restart':
            return {
                ...intialState,
                questions:state.questions,
                status:'ready'
            }
        case 'tick':
            return {
                ...state,
                secondsRemaining:state.secondsRemaining-1,
                status:state.secondsRemaining===0?'finished':state.status,
                highScore:state.points>state.highScore?state.points:state.highScore


            }
        default:
            throw new Error("Action Unknow")
    }
}
const QuizProvider=({children})=>{
    const [{questions,status,index,answer,points,highScore,secondsRemaining},dispatch] = useReducer(reducer,intialState)
    
    let numQuestions=questions.length;
    
    const maxPossiblePoints=questions.reduce((prev,cur)=>prev+cur.points,0)
    useEffect(()=>{
        fetch("http://localhost:8000/questions")
        .then((res)=>res.json())
        .then((data)=>{dispatch({type:'dataReceived',payload:data})})
        .catch((err)=>dispatch({type:'dataFailed'}))
    },[])
    return (
       <QuizContext value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        numQuestions,
        maxPossiblePoints,
        dispatch
       }}>
       {children}
       </QuizContext>
    )
}
function useQuiz(){
    const context=useContext(QuizContext);
    if (context===undefined) throw new Error("Quizcontext was used outside the quizprovider")
    return context
}

export {QuizProvider,useQuiz}
