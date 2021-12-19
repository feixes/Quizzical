import React, { useState } from 'react'
import { nanoid } from 'nanoid'

const Question = (props) => {
    const [answers, setAnswers] = useState(props.answers.map(answer => {
        return {
            answer: answer,
            isHeld: false
        }
    }))


    console.log(answers)

    const holdAnswer = () => {
        setAnswers(prevAnswer => prevAnswer.map(answer => {
            return {
                ...answer,
                isHeld: true
            }
        }))
    }

    const answerElements = answers.map(answer => <div
        key={nanoid()}
        className='answer'
        onClick={holdAnswer}
        {answer.isHeld && style={{ backgroundColor: '#D6DBF5' }}} >
            { answer.answer }
    </div >)
// add a isHeld boolean to check if is held. Should recieve a correct answer prop to compare and check
return (
    <div className='question-container'>
        <h3 className='question--title'>{props.question}</h3>
        <div className='answers-container'>
            {answerElements}
        </div>
    </div>
)

}

export default Question