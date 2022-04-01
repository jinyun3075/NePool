import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API, COLORS } from '../../constants'
import {Link, Router, useLocation, useParams, useNavigate  } from 'react-router-dom';
import Progress from './Progress';
import Question from './Question';
import axios from 'axios';
import Answers from './Answers';
import { ExplanationModal } from './ExplanationModal';
import Result from './Result';

export default function StudyPage() {

  const navigate = useNavigate();

  const location = useLocation()
  const userName = location.state.username

  const params = useParams()
  const workBookId = params.id

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")

  const [answers, setAnswers] = useState([])
  
  const [error, setError] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [check, setCheck] = useState(false)

  const [btnVisible, setBtnVisible] = useState(false)

  const [isResult, setIsResult] = useState(false)

  const [isAnswer, setIsAnswer] = useState(false)

  const [modal, setModal] = useState(false)

 
  const openExModal = () => {
    setModal(true);
  };
  const closeExModal = () => {
    setModal(false);
  };

  const [questionsData, setQuestionsData] = useState([
    {
      id: '',
      question: '',
      answer_a: '',
      answer_b: '',
      answer_c: '',
      answer_d: '',
      answer_e: '',
      correct: '',
      explanation: ''
    }
  ])

  const getTest = async () => {
    const token = sessionStorage.getItem("token");
    
    try {
      const res = await axios.get(`${API}/work/${userName}/${workBookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    setQuestionsData(res.data)
    
    } catch(err) {
      console.log(err);
    }
    
  };

    
  useEffect(() => {
    getTest();
  }, []);

  // console.log(questionsData);

  const question = questionsData[currentQuestion]

  const [aa, setAA ] = useState([])
  const [bb, setBB] = useState([])
 
  const click = e => {
    const { value } = e.target
    e.preventDefault()
    setCurrentAnswer(value)
    setCheck(false)
    setError(false)
  }

  const answerCheck = () => {
    const answer = {questionId: question.id, answer: currentAnswer}

    if(currentAnswer === '') {
      setCheck(!check)
    }

    if(currentAnswer !== undefined) {
      setAA([...aa, currentAnswer])
    }

    let point = 0
    if(currentAnswer === question.correct) {
      setBtnVisible(true)
      setError(false)
      setCorrect(true)
      setIsAnswer(true)
      point = point + 1
    } else {
      setError(true)
      setCorrect(false)
    }
  }

  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);

  const nextQuestion = () => {
    const answer = {questionId: question.id, answer: currentAnswer}

    setBB([...bb, aa[0]])
    setAA([])

    answers.push(answer)
    setAnswers(answers)
    setCurrentAnswer('')

    setCorrect(false)
    setBtnVisible(false)
    setIsAnswer(false)

    if(currentQuestion + 1 < questionsData.length) {
      setCurrentQuestion(currentQuestion + 1)
      return
    }

    setIsResult(true)
  }

  if(isResult) {
    return (
      <main className="container">
        <h1 className="blind">공부 모드 결과</h1>
        <ResultBoard>
          <Result questionsData={questionsData} bb={bb}/>
          <BtnBox>
            <Btn onClick={() => {window.location.reload()}}>다시 풀기</Btn>
            <Btn onClick={() =>  navigate(-1)}>완료</Btn>
          </BtnBox>
        </ResultBoard>
      </main>
    )
  } else {
    return (
      <main className="container">
        <h1 className="blind">공부 모드</h1>
        <TestBoard>
          <Progress total={questionsData.length} currentQuestion={currentQuestion}/>
          <Test>
            <div>
              <Question question={question.question}/>
              <Line />
              {check && <Err>✅ 답을 선택해주세요</Err>}
              <Answers question={question} currentAnswer={currentAnswer} click={click} error={error} correct={correct}/>
              <Line />
            </div>
          </Test>
          <BtnBox>
            {btnVisible && <Btn onClick={openExModal}>정답 해설</Btn>}
            {!btnVisible ? <Btn onClick={answerCheck}>정답 확인</Btn> : <Btn onClick={nextQuestion}>다음 문제</Btn> }
          </BtnBox>
          <Background
            className={`${modal}`}
            onClick={closeExModal}
          ></Background>
          <ExplanationModal modal={modal} question={question} />
        </TestBoard>
      </main>
    )
  }
}

const TestBoard = styled.section`
  width: 70%;
  min-width: 600px;
  position: relative;
  border: 1.5px solid ${COLORS.light_gray};
  border-radius: 7px;
  margin: 40px auto;
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

const ResultBoard = styled.section`
  width: 70%;
  min-width: 600px;
  position: relative;
  border: 1.5px solid ${COLORS.light_gray};
  border-radius: 7px;
  margin: 40px auto;
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

const Line = styled.div`
  border-bottom: 1px solid ${COLORS.white_gray};
  margin:  30px 30px 0;
`

const BtnBox = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: end;
`

const Btn = styled.button`
  font-size: 14px;
  width: 100px;
  height: 50px;  
  margin: 20px 30px 0px 0px;
  color: #fff;
  background-color: ${COLORS.blue};
  border: none;
  border-radius: 4px;
  &:disabled {
    opacity: 0.5;
  }
`

const Err = styled.p`
  font-size: 14px;
  text-align: center;
  margin: 15px 0;
  color: ${COLORS.wrong};
`

const Background = styled.div`
  &.true {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: ${COLORS.gray};
    opacity: 0.4;
  }
`;