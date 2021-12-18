import React, { useState, useEffect, useRef } from 'react'
import Intro from './components/Intro'
import Question from './components/Question'

import { shuffle } from 'underscore'
import { nanoid } from 'nanoid'



const App = () => {

    const [start, setStart] = useState(false)
    const [questions, setQuestions] = useState([])

    let apiLink = 'https://opentdb.com/api.php?amount=10'


    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        console.log("api called")
        fetch(apiLink)
            .then(res => res.json())
            .then(data => setQuestions(data.results))

    }, [start])


    const questionElement = questions.map(question => {
        const correctAnswer = question.correct_answer
        const allAnswers = question.incorrect_answers
        allAnswers.push(correctAnswer)
        return (<Question key={nanoid()} question={question.question} answers={allAnswers} />)
    })



    const startQuiz = () => {
        setStart(true)

    }

    return (
        <main className='container'>
            {!start ?
                <Intro start={startQuiz} /> :
                <div className='question-wrapper'>
                    {questionElement}
                    <button className='btn btn-check'>Check asnwers</button>
                </div>


            }

        </main >

    )
}

export default App