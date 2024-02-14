import React from 'react';
import { useQuiz } from './QuizProvider';
const Question = () => {
    const hasAnswered=answer!==null;
    const {question,dispatch,answer,points,maxPoints}=useQuiz();
    return ( <div>
        <h4>{question.question}</h4>
        <div className='options'>
            {question.options.map((option,index)=>
            <button className={`btn btn-option ${index===answer?"answer":""} ${hasAnswered?index===question.correctOption?"correct":index===answer?"danger":"wrong":''}`} 
            key={option} 
            disabled={hasAnswered}
            onClick={()=>
            dispatch({type:"newAnswer",payload:index})} >
                {option}
            </button>)}
        </div>
        
        
        
    </div> );
}
 
export default Question;