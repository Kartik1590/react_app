import React from 'react';
import { useQuiz } from './QuizProvider';
const FinishScreen=()=>{
    const percentage=(points/maxPoints)*100
    const {points,maxPoints,highScore}=useQuiz()
    let emoji;
    if (percentage===100) emoji="🥇"
    if (percentage>=80 && percentage<100) emoji="🎉"
    if (percentage>=50 && percentage<80) emoji="😀"
    if (percentage>=0 && percentage<50) emoji="🫏"

    return (
        <><p className='result'><span>{emoji}</span>
            You Scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percentage)}%)
        </p>
        <p className='highscore'>HighScore is {highScore}</p>
        </>
    )
}
export default FinishScreen