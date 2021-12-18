import React, { useState, useEffect } from 'react'
import Intro from './components/Intro'
import Question from './components/Question'


const App = () => {

    const [start, setStart] = useState(false)
    const [questions, setQuestions] = useState([])

    let apiLink = 'https://opentdb.com/api.php?amount=10'

    useEffect(() => {
        fetch(apiLink)
            .then(res => res.json())
            .then(data => setQuestions(data.results))
        console.log(questions)
    }, [start])


    const questionElements = questions.map(question => {
        return (<Question question={question.question} />)
    })

    const startQuiz = () => {
        setStart(true)
    }

    return (
        <main className='container'>
            {!start ?
                <Intro start={startQuiz} /> :
                <div className='question-wrapper'>
                    {questionElements}
                    <button className='btn btn-check'>Check asnwers</button>
                </div>


            }

        </main >

    )
}

export default App