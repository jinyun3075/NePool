import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants'
import Answers from './Answers';
import Progress from './Progress';
import Question from './Question';

export default function StudyPage() {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [answers, setAnswers] = useState([])
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [btnVisible, setBtnVisible] = useState(false)
  // const [showResult, setResults] = useState(false)

  const questionsData = [
    {
      id: 1,
      question: "1. 통신을 위한 프로그램을 생성하여 포트를 할당하고, 클라이언트의 통신 요청 시 클라이언트와 연결하는 내외부 송·수신 연계기술은?",
      answer_a: 'DB링크 기술',
      answer_b: '소켓 기술',
      answer_c: '스크럼 기술',
      answer_d: '프로토타입 기술',
      answer_e: '프로토타입 기술',
      correct: 'b'
    },
    {
      id: 2,
      question: "2. 최성이 노트북은?",
      answer_a: 'LG 그램',
      answer_b: '맥북 프로',
      answer_c: '맥북 에어',
      answer_d: '2014년형 삼성 노트북',
      answer_e: '프로토타입 기술',
      correct: 'c'
    },
    {
      id: 3,
      question: "3. 망고와 조아의 나이 합은?",
      answer_a: '4',
      answer_b: '10',
      answer_c: '6',
      answer_d: '7',
      answer_e: '5',
      correct: 'b'
    },
    {
      id: 4,
      question: "4. 최성이 점심으로 먹지 않은 메뉴는?",
      answer_a: '김치찜',
      answer_b: '떡볶이',
      answer_c: '닭발',
      answer_d: '짜장면',
      answer_e: '프로토타입 기술',
      correct: 'c'
    },
    {
      id: 5,
      question: "5. 시찬이 생일은?",
      answer_a: '1995.07.07',
      answer_b: '1995.10.05',
      answer_c: '1995.04.06',
      answer_d: '1995.11.30',
      answer_e: '1995.06.24',
      correct: 'c'
    },
  ]

  const question = questionsData[currentQuestion]

  const click = e => {
    setCurrentAnswer(e.target.value)
  }

  const answerCheck = () => {
    if(currentAnswer === question.correct) {
      setBtnVisible(true)
      setError(false)
      setCorrect(true)
    } else {
      setError(true)
      setCorrect(false)
    }
  }

  const nextQuestion = () => {
    const answer = {questionId: question.id, answer: currentAnswer}

    answers.push(answer)
    setAnswers(answers)
    setCurrentAnswer('')
    setCorrect(false)
    setBtnVisible(false)

    if(currentQuestion + 1 < questionsData.length) {
      setCurrentQuestion(currentQuestion + 1)
      return
    }
  }

  return (
    <>
      <main className="container">
        <h1 className="blind">문제집 공부 모드</h1>
        <TestBoard>
          <Progress total={questionsData.length} currentQuestion={currentQuestion}/>
          <Test>
            <Question question={question.question}/>
            <Answers question={question} currentAnswer={currentAnswer} click={click} error={error} correct={correct}/>
            {/* {error && <Err>❌틀렸습니다❌</Err>} */}
            {/* {questionsData.map((questionData) => {
              return <Question key={questionData.id} questionData={questionData}/>
            })} */}
          </Test>
          
          <Btn onClick={answerCheck}>정답 확인</Btn>
          {btnVisible && <Btn onClick={nextQuestion}>다음 문제</Btn>}
        </TestBoard>
      </main>
    </>
  )
}

const TestBoard = styled.section`
  position: relative;
  border: 1.5px solid ${COLORS.light_gray};
  border-radius: 7px;
  margin: 40px 15px;
  padding: 0 0 30px;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    top: 35px;
    left: 0;
    border-bottom: 1.5px solid ${COLORS.light_gray};
  }
`

const Test = styled.article`
  padding: 50px 0 0;
  margin: 0 20px;
`

const Btn = styled.button`
  font-size: 14px;
  width: 85px;
  height: 45px;
  margin: 20px 30px 0;
  color: #fff;
  background-color: ${COLORS.blue};
  border: none;
  border-radius: 5px;
  /* display: none; */
  &:disabled {
    opacity: 0.5;
  }
`

const Err = styled.p`
  font-size: 14px;
  margin: 0 35px;
  color: ${COLORS.wrong};
`
