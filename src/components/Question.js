import React from 'react'

const Question = (props) => {

    return (
        <div className='question-container'>
            <h3 className='question--title'>{props.question}</h3>
            <div className='answers-container'>
                <div className="answer">Baby don't hurt me</div>
                <div className="answer">Don't hurt me</div>
                <div className="answer">No more</div>
                <div className="answer">No more</div>
                <div className="answer">No more</div>
            </div>
        </div>
    )

}

export default Question