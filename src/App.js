import React from 'react'
import Intro from './components/Intro'
import Question from './components/Question'


const App = () => {
    return (
        <main className='container'>
            {/* <Intro /> */}

            <Question />
            <Question />
            <Question />
            <Question />
            <button class='btn btn-check'>Check asnwers</button>
        </main>

    )
}

export default App