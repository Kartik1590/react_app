import React from 'react';
import { useQuiz } from './QuizProvider';
function Retake() {
    const {dispatch}=useQuiz()
    return ( 
        <button className='btn btn-ui' onClick={()=>dispatch({type:'restart'})}>Retake Quiz</button>
     );
}

export default Retake;