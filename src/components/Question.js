import React from 'react'

const Question = (props) => {

    const answer = props.answers.map((answer, index) => <div key={index} className='answer'>{answer}</div>)

    return (
        <div className='question-container'>
            <h3 className='question--title'>{props.question}</h3>
            <div className='answers-container'>
                {answer}
            </div>
        </div>
    )

}

export default Question