import React, { useState, useEffect, useRef } from 'react'
import Intro from './components/Intro'
import Question from './components/Question'

import { shuffle } from 'underscore'
import { nanoid } from 'nanoid'



const App = () => {

    const [start, setStart] = useState(false)
    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], [1, 2, 3, 4]])

    let apiLink = 'https://opentdb.com/api.php?amount=10'
    //add a boolean is correct to questions

    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        // fetch(apiLink)
        //     .then(res => res.json())
        //     .then(data => setQuestions(data.results))

        const apiCall = async () => {
            try {
                const res = await fetch(apiLink)
                const data = await res.json()
                setQuestions(data.results)
                //setAnswers(createAnswers(data.results))
                console.log("api called")

            } catch (e) {
                console.log('failed')
                console.log(e)
            }
        }

        apiCall()

    }, [start])



    const createAnswers = (questionArray) => {
        const answerArray = questionArray.map(question => {
            const correctAnswer = question.correct_answer
            const allAnswers = question.incorrect_answers
            allAnswers.push(correctAnswer)

            const answerOneQuestion = allAnswers.map(answer => {
                return {
                    id: nanoid(),
                    answer: answer,
                    isHeld: false
                }
            })
            return answerOneQuestion
        })

        return answerArray
    }


    const questionElement = questions.map((question, index) => {
        // const correctAnswer = question.correct_answer
        // const allAnswers = question.incorrect_answers
        // allAnswers.push(correctAnswer)


        return (<Question key={nanoid()} question={question.question} answers={answers[index]} />)
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