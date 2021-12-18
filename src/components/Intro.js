import React from 'react'

const Intro = (props) => {
    return (
        <div className='intro'>
            <h1 className='intro--title'>Quizzical</h1>
            <p className='intro--desc'>Some description if needed</p>
            <button onClick={props.start} className='btn btn-intro'>Start quiz!</button>
        </div>

    )
}

export default Intro