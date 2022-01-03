import React, { useState, useEffect, useRef } from 'react'
import Intro from './components/Intro'
import Question from './components/Question'

import { indexOf, shuffle } from 'underscore'
import { nanoid } from 'nanoid'



const App = () => {

    const [start, setStart] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [questions, setQuestions] = useState([])
    //const [answers, setAnswers] = useState([])
    const [answers, setAnswers] = useState([['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], ['a', 'b', 'c'], [1, 2, 3, 4]])

    let apiLink = 'https://opentdb.com/api.php?amount=2'
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
                const answersApi = createAnswers(data.results)
                setAnswers(answersApi)
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


    const findAnswer = (id) => {
        for (const [i, answer] of answers.entries()) {
            for (const answerOption of answer) {
                if (answerOption.id === id) {
                    return i
                }
            }
        }

    }

    const holdAnswer = (id) => {
        let clickedOption = findAnswer(id)

        // for (const [i, answer] of answers.entries()) {
        //     for (const answerOption of answer) {
        //         if (answerOption.id === id) {
        //             clickedOption = i
        //         }
        //     }
        // }

        // crear una nueava array con los cambios del objeto y actualizar el estado con este array

        const newAnswers = [...answers]
        newAnswers[clickedOption] = newAnswers[clickedOption].map(answer => {
            return answer.id === id ? {
                ...answer,
                isHeld: !answer.isHeld
            } : answer
        })

        setAnswers(newAnswers)

    }

    const checkAnswer = () => {

        const answerArray = answers.map((answer, index) => {
            return answer.map(answerOption => {
                return answerOption.answer === questions[index].correct_answer ? {
                    ...answerOption,
                    isCorrect: true
                } : answerOption

            })
        })
        setAnswers(answerArray)
        setCorrect(true)
    }


    const questionElement = questions.map((question, index) => {
        return (<Question
            key={nanoid()}
            question={question.question}
            answers={answers[index]}
            holdAnswer={holdAnswer}
            correct={correct}
        />)
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
                    <button className='btn btn-check' onClick={checkAnswer}>Check answers</button>
                </div>


            }

        </main >

    )
}

export default App