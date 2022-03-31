import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API, COLORS } from '../../constants'
import Answers from './Answers';
import Progress from './Progress';
import Question from './Question';
import axios from 'axios';

export default function StudyPage() {

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [answers, setAnswers] = useState([])
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [btnVisible, setBtnVisible] = useState(false)

  const [isTest, setIsTest] = useState(false)
  // const [showResult, setResults] = useState(false)

  const [questionsData, setQuestionsData] = useState([
    {
      id: '',
      question: '',
      answer_a: '',
      answer_b: '',
      answer_c: '',
      answer_d: '',
      answer_e: '',
      correct: ''
    }
  ])

  const getTest = async () => {
    const token = localStorage.getItem("token");
    // const user = localStorage.getItem("user");
    // console.log(token);
    // console.log(user);
    const res = await axios.get(`${API}/work/123/$2a$10$WW3C66tx7zm9xpXXQ20txOGaegzx9MkAOdlfA3hCaTzI0Wj0enf9G`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    setQuestionsData(res.data)
    // setUserName(res.data.name);
    console.log(res.data.id);
  };

  const question = questionsData[currentQuestion]

  const [answerTest, setAnswerTest] = useState([]) 
 
  const click = e => {
    setCurrentAnswer(e.target.value)
    setAnswers(answers)
    setAnswerTest([...answerTest, currentAnswer])    
    console.log("test", answerTest);
    console.log("answer", currentAnswer);
  }

  
 
  const answerCheck = () => {
    // console.log(currentAnswer);
    const answer = {questionId: question.id, answer: currentAnswer}
    answers.push(answer)
    setAnswers(answers)
    // setAnswerTest([...answerTest, currentAnswer])
    
    if(currentAnswer === question.correct) {
      setBtnVisible(true)
      setError(false)
      setCorrect(true)
    } else {
      setError(true)
      setCorrect(false)
    }
  }
  
  useEffect(() => {
    getTest();
  }, []);

  // console.log("test", answerTest);
  // console.log("answer", currentAnswer);


  
  const nextQuestion = () => {
    const answer = {questionId: question.id, answer: currentAnswer}
    // console.log(answer);


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
            {isTest
            ? (
              <div>
                <Question question={question.question}/>
                <Answers question={question} currentAnswer={currentAnswer} click={click} error={error} correct={correct}/>
              </div>
            )
            : (
              <>
                {questionsData.map((questionData) => {
                  return (
                    <div key={questionData.id}>
                      <Question question={questionData.question} />
                      <Answers question={questionData} currentAnswer={currentAnswer} click={click} error={error} correct={correct} />
                    </div>
                  )
                })}
              </>
            )
          }
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
