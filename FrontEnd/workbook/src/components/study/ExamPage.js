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
import ExamQuestion from './ExamQuestion';
import ExamResult from './ExamResult';

export default function ExamPage() {

  const navigate = useNavigate();

  const location = useLocation()
  const userName = location.state.username

  const params = useParams()
  const workBookId = params.id

  const [currentQuestion, setCurrentQuestion] = useState(0)

  const [answers, setAnswers] = useState([])

  const [btnVisible, setBtnVisible] = useState(false)

  const [isResult, setIsResult] = useState(false)

  const [isAnswer, setIsAnswer] = useState(false)

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



  const [selectQuestion, setSelectQuestion] = useState(false)

  // const [questionCheck, setQuestionCheck] = useState(false)

  const getSelectQuestion = (selectQuestion) => {
    setSelectQuestion(selectQuestion)
  }

  const [answerArray, setAnswerArray] = useState([])

  const getAnswerArray = (aaaa) => {
    if(aaaa !== undefined) {
      if(aaaa.correct !== "") {
        setAnswerArray([...answerArray, aaaa])
      }
    } 
  }

  const [resultErr, setResultErr] = useState(false)

  const [score, setScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0)

  const [resultData, setResultData] = useState([{
    question: "",
    answer_a: "",
    answer_b: "",
    answer_c: "",
    answer_d: "",
    answer_e: "",
    choice: "",
    correct: "",
    explanation: "",
    result: false
  }])

  const answerCheck = async() => {  
    const result = answerArray.reverse().filter((v, i, c) => i === c.findIndex(t => t.id === v.id))

    if(result.length !== questionsData.length) {
      setResultErr(true)
    } else {
      setResultErr(false)
      setIsResult(true)
    }

    const token = sessionStorage.getItem("token");
    try {
      const res = await axios.post(`${API}/work/${workBookId}`, result, {
      headers: {
        "Content-type": "application/json",
        Authorization : `Bearer ${token}`
      },
    });
      setResultData(res.data.val);
      setScore(res.data.score);
      setTotalScore(res.data.totalScore);
    } catch(err) {
      console.log(err);
    }
  }

  const mode = true

  const percent = (score/totalScore * 100).toFixed(1)
  


  if(questionsData.length === 0) {
    return (
      <>
      <Blur></Blur>
      <Modal>
        <p>아직 문제가 없어요 😥😥😥</p>
        <Btnhh onClick={() => {navigate(-1)}}>돌아가기</Btnhh>
      </Modal>
      </>
    )
  } else {
    if(isResult) {
    return (
      <main className="container">
        <h1 className="blind">시험 모드 결과</h1>
        <ResultBoard>
          <Progress mode={mode} total={questionsData.length} currentQuestion={currentQuestion}/>
          <ResultBox>
            <p>{percent} 점</p>
            <span>{score} / {totalScore}</span>
            {/* <LineBox></LineBox> */}
          </ResultBox>
          <Test>
          {resultData && resultData.reverse().map((item, i) => {
            return(
              <QuestionBox key={i}>
                  <ExamResult i={i} item={item} />
              </QuestionBox>
            )
          })}
          </Test>
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
        <h1 className="blind">시험 모드</h1>
        <TestBoard>
          <Progress total={questionsData.length} currentQuestion={currentQuestion}/>
          <Test>
            {questionsData.map((question, i) => {
              return (
                <QuestionBox key={question.id}>
                  <ExamQuestion resultErr={resultErr} i={i} question={question} getSelectQuestion={getSelectQuestion} getAnswerArray={getAnswerArray} workBookId={workBookId} userName={userName}/>
                </QuestionBox>
              )
            })}
          </Test>
          <BtnBox>
            {resultErr && <Err>문제를 모두 풀어주세요!</Err>}
            <Btn onClick={answerCheck}>제출</Btn>
          </BtnBox>
        </TestBoard>
      </main>
    )
  }
  }
}

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid ${COLORS.light_gray};
  background: white;
  font-size: 16px;
  color: ${COLORS.gray};
  margin: 15px 50px;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    margin: 0 0 15px;
  }
`

const Btnhh = styled.button`
  font-size: 14px;
  width: 150px;
  height: 45px;
  border: 0.5px solid #b6b6b6;
  border-radius: 6px;
  text-align: center;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  margin: 0 10px; 
`

const Blur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(5px);
  overflow: hidden;
`

const TestBoard = styled.section`
  width: 70%;
  min-width: 600px;
  position: relative;
  border: 1.5px solid ${COLORS.light_gray};
  border-radius: 7px;
  margin: 40px auto;
  padding: 0 0 30px;
  overflow: hidden;
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
  min-width: 1000px;
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

const ResultBox = styled.div`
  /* width: 500px; */
  display: flex;
  flex-direction: column;
  margin: 45px 55px 0;
  span {
    display: block;
    font-size: 20px;
    text-align: right;
    color: ${COLORS.light_gray};
  }
  p{
    font-size: 40px;
    text-align: right;
  }
`

const LineBox = styled.div`
  /* width: 50px; */
  height: 5px;
  
  background: ${COLORS.alpha_blue};
`

const QuestionBox = styled.div`
  margin-bottom: 50px;
`

const Line = styled.div`
  border-bottom: 1px solid ${COLORS.white_gray};
  margin:  30px 30px 0;
`

const BtnBox = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: end;
  align-items: center;
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
  margin: 20px 30px 0px 0px;
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