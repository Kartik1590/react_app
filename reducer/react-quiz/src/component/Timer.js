import React, { useEffect } from 'react';
import { useQuiz } from './QuizProvider';

function Timer() {
    const minute=Math.floor(secondsRemaining/60)
    const seconds=secondsRemaining%60
    const {dispatch, secondsRemaining}=useQuiz();
    useEffect(()=>{
        const id=setInterval(()=>{
            dispatch({type:'tick'})
        },1000)
        return ()=>clearInterval(id)
    },[dispatch])
    return ( 
        <div className='timer'>
          {minute<10?0:''}{minute}:{seconds<10 && '0'}{seconds}
        </div>
     );
}

export default Timer;