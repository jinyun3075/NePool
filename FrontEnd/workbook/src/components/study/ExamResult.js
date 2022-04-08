import axios from 'axios';
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { API, COLORS } from '../../constants';
import Answers from './Answers';

export default function ExamResult({i, item}) {

  const [selectQuestion, setSelectQuestion] = useState(false)
  
  const [answerCheck, setAnswerCheck] = useState(false)

  const [mode, setMode] = useState(true)

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

  let point = 0 

  useEffect(() => {
    if(item.choice === item.correct) {
      setError(false)
      setCorrect(true)
      point = point + 1
    } else {
      setError(true)
      setCorrect(false)
    }
  }, [item])


  return (
    <>
      <TestTit onClick={questionClick} className={item.result ? 'on' : 'off' || selectQuestion ? 'click' : ''}>{i+1}. {item.question}</TestTit>
      {selectQuestion && (
        <>
        <Line />
        <AnswersBox>
          <Answers mode={mode} question={item} currentAnswer={item.choice} click={click} error={error} correct={correct}/>
          {item.explanation ? (
            <Explanation>{item.explanation}</Explanation>
          ) : (
            <Explanation>🔍 아직 해설이 없어요</Explanation>
          )}
        </AnswersBox>
        <Line />
        </>
      )}
    </>
  )
}

const TestTit = styled.h3`
  font-size: 15px;
  /* font-weight: 700; */
  color: ${COLORS.white};
  margin: 0 30px;
  padding: 30px;
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 8%), 0 2px 8px 0 rgb(34 36 38 / 10%);
  border-radius: 3px;
  /* ${props => props.answerCheck && 
    css`
      background: ${COLORS.alpha_blue} url('/img/QuestionCheck.svg') right 5% center no-repeat;
    `} */
  &.on {
    background: ${COLORS.blue};
  }
  &.off{
    background: ${COLORS.error};
  }
  &.click {
    background: ${COLORS.light_gray};
  }
`

const Line = styled.div`
  border-bottom: 1px solid ${COLORS.white_gray};
  margin:  30px 30px 0;
`

const AnswersBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 30px;
`

const Explanation = styled.div`
  width: 40%;
  min-width: 30%;
  margin-top: 20px;
  padding: 35px 40px;
  font-size: 14px;
  color: ${COLORS.gray};
  border: 1px solid ${COLORS.white_gray};
  line-height: 24px;
`