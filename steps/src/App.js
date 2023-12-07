import React from 'react'
import './index.css'
import {useState} from 'react'



const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
  ];
  

const App=()=>{
    const [steps,setSteps]=useState(1)
    const [isOpen,setIsOpen]=useState(true)

    const handlePrevious=()=>{
        if (steps >1){
        setSteps(steps-1)}
    }
    const handleNext=()=>{
        if (steps<3){
            setSteps(s=>s+1) //always use callback function
        }
    }

    return (
        <div>
        <button className='close' onClick={()=>setIsOpen(!isOpen)}>&times;</button>
        {isOpen && <div className='steps'>
            <div className='numbers'>
                <div className={steps>=1?'active':""}>1</div>
                <div className={steps>=2?'active':""}>2</div>
                <div className={steps===3?'active':""}>3</div>
            </div>
            <p className='message'>Step {steps}: {messages[steps-1]}</p>
            <div className='buttons'>
                {/* <button style={{backgroundColor:'#7950f2',color:'#fff'}} onClick={()=>alert('previous')}>Previous</button> */}
                
                <button style={{backgroundColor:'#7950f2',color:'#fff'}} onClick={handlePrevious}>Previous</button>
                

                <button style={{backgroundColor:'#7950f2',color:'#fff'}} onClick={handleNext}>Next</button>
            </div>
        </div>}
       
        </div>
    )
}

export default App;