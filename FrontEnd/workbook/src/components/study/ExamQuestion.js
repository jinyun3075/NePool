import axios from 'axios';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { API, COLORS } from '../../constants';
import Answers from './Answers';

export default function ExamQuestion({i, question, getAnswerArray, resultErr}) {

  const [selectQuestion, setSelectQuestion] = useState(false)
  
  const [answerCheck, setAnswerCheck] = useState(false)

  const questionClick = () => setSelectQuestion(!selectQuestion)

  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [check, setCheck] = useState(false)
  const [currentAnswer, setCurrentAnswer] = useState("")

  const [selectedAnswers, setSelectedAnswers] = useState([])

  const click = (e) => {
    e.preventDefault()
    const { value } = e.target
    setCurrentAnswer(value)
    setCheck(false)
    setError(false)
    setAnswerCheck(true) 
  }

  const answer = {id: question.id, correct: currentAnswer}

  useEffect(() => {
    getAnswerArray(answer)
  }, [currentAnswer])


  return (
    <>
      <TestTit onClick={questionClick} resultErr={resultErr} answerCheck={answerCheck} className={selectQuestion ? 'on' : 'off'}>{i+1}. {question.question}</TestTit>
      {selectQuestion && (
        <>
        <Line />
        <Answers question={question} currentAnswer={currentAnswer} click={click} error={error} correct={correct}/>
        <Line />
        </>
      )}
    </>
  )
}

const TestTit = styled.h3`
  font-size: 15px;
  font-weight: 700;
  margin: 0 30px;
  padding: 30px 75px 30px 30px;
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 8%), 0 2px 8px 0 rgb(34 36 38 / 10%);
  border-radius: 3px;
  ${props => props.answerCheck && 
    css`
      background: ${COLORS.alpha_blue} url('/img/QuestionCheck.svg') right 5% center no-repeat;
    `}
  ${props => (!(props.answerCheck) && props.resultErr) &&
    css`
      background: url('/img/QuestionError.svg') right 5% center no-repeat;
      border: 1px solid ${COLORS.wrong};
    `}
  &.on {
    background: ${COLORS.light_gray};
  }
`

const Line = styled.div`
  border-bottom: 1px solid ${COLORS.white_gray};
  margin:  30px 30px 0;
`