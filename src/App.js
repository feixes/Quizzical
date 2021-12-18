import React, { useState, useEffect } from 'react'
import Intro from './components/Intro'
import Question from './components/Question'


const App = () => {

    const [start, setStart] = useState(false)

    const startQuiz = () => {
        setStart(true)
    }

    return (
        <main className='container'>
            {!start ?
                <Intro start={startQuiz} /> :
                <div>
                    <Question />
                    <Question />
                    <Question />
                    <Question />
                    <button class='btn btn-check'>Check asnwers</button>
                </div>


            }

        </main>

    )
}

export default App