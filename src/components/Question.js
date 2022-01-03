import React, { useState } from 'react'
import { nanoid } from 'nanoid'

const Question = (props) => {
    // const [answers, setAnswers] = useState(props.answers.map(answer => {
    //     return {
    //         id: nanoid(),
    //         answer: answer,
    //         isHeld: false
    //     }
    // }))


    // console.log(answers)

    // const holdAnswer = (id) => {
    //     setAnswers(prevAnswer => prevAnswer.map(answer => {
    //         return answer.id === id ? {
    //             ...answer,
    //             isHeld: !answer.isHeld
    //         } : answer
    //     }))
    // }

    console.log(props.correct)
    console.log(props.answers)
    const answerElements = props.answers.map(answer => <div
        key={nanoid()}
        className={`answer ${props.correct && (answer.isCorrect ? "correct" : answer.isHeld ? "incorrect" : "inherit")}`}
        // style={{ backgroundColor: answer.isHeld ? '#D6DBF5' : 'inherit' }}
        onClick={() => props.holdAnswer(answer.id)}>
        {answer.answer}
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