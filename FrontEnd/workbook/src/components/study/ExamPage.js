import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import ExamQuestion from './ExamQuestion';
import ExamResult from './ExamResult';
import Progress from './Progress';
import styled from 'styled-components';
import axios from 'axios';
import { API, COLORS } from '../../constants'

export default function ExamPage() {
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  const location = useLocation();
  const userName = location.state.username;

  const params = useParams();
  const workBookId = params.id;

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
  ]);

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
    result: false,
  }]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isResult, setIsResult] = useState(false);
  const [selectQuestion, setSelectQuestion] = useState(false);
  const [answerArray, setAnswerArray] = useState([]);

  const [resultErr, setResultErr] = useState(false);

  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const percent = (score/totalScore * 100).toFixed(1);

  const mode = "exam";

  const getTest = async () => {
    const res = await axios.get(`${API}/work/${userName}/${workBookId}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setQuestionsData(res.data);
  };

  const answerCheck = async() => {  
    const result = answerArray.reverse().filter((v, i, c) => i === c.findIndex(t => t.id === v.id));

    if(result.length !== questionsData.length) {
      setResultErr(true);
    } else {
      setResultErr(false);
      setIsResult(true);
    }

    const res = await axios.post(`${API}/work/${workBookId}`, result, {
      headers: {
        "Content-type": "application/json",
        Authorization : `Bearer ${token}`
      },
    });
    setResultData(res.data.val);
    setScore(res.data.score);
    setTotalScore(res.data.totalScore);
  }

  const getSelectQuestion = (selectQuestion) => {
    setSelectQuestion(selectQuestion);
  };

  const getAnswerArray = (v) => {
    if(v !== undefined) {
      if(v.correct !== "") {
        setAnswerArray([...answerArray, v])
      }
    } 
  };

  useEffect(() => {
    getTest();
  }, []);

  if(questionsData.length === 0) {
    return (
      <>
        <Blur></Blur>
        <Modal>
          <p>아직 문제가 없어요 😥😥😥</p>
          <BackBtn onClick={() => {navigate(-1)}}>돌아가기</BackBtn>
        </Modal>
      </>
    )
  } else {
    if(isResult) {
      return (
        <main className="container">
          <h1 className="blind">시험 모드 결과</h1>
          <ResultBoard>
            <Progress
              mode={mode}
              total={questionsData.length}
              currentQuestion={currentQuestion}
            />
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
                    <ExamQuestion
                      i={i}
                      resultErr={resultErr}
                      question={question}
                      getSelectQuestion={getSelectQuestion}
                      getAnswerArray={getAnswerArray}
                      workBookId={workBookId}
                      userName={userName}
                    />
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
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px 40px;
  margin: 15px 50px;
  border: 1px solid ${COLORS.light_gray};
  background: ${COLORS.white};
  color: ${COLORS.gray};
  font-size: 16px;
  p {
    margin: 0 0 15px;
  }
`;

const BackBtn = styled.button`
  margin: 0 10px; 
  width: 150px;
  height: 45px;
  border: 0.5px solid ${COLORS.light_gray};
  border-radius: 6px;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 14px;
  text-align: center;
`;

const Blur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(5px);
  overflow: hidden;
`;

const TestBoard = styled.section`
  position: relative;
  padding: 0 0 30px;
  margin: 40px auto;
  width: 70%;
  min-width: 600px;
  border: 1.5px solid ${COLORS.light_gray};
  border-radius: 7px;
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    border-bottom: 1.5px solid ${COLORS.light_gray};
  }
`;

const ResultBoard = styled.section`
  position: relative;
  padding: 0 0 30px;
  margin: 40px auto;
  width: 70%;
  min-width: 1000px;
  border: 1.5px solid ${COLORS.light_gray};
  border-radius: 7px;
  &::after {
    content: '';
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    border-bottom: 1.5px solid ${COLORS.light_gray};
  }
`;

const Test = styled.article`
  padding: 50px 0 0;
  margin: 0 20px;
`;

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 45px 55px 0;
  span {
    display: block;
    color: ${COLORS.light_gray};
    font-size: 20px;
    text-align: right;
  }
  p {
    font-size: 40px;
    text-align: right;
  }
`;

// const LineBox = styled.div`
//   /* width: 50px; */
//   height: 5px;
//   background: ${COLORS.alpha_blue};
// `;

const QuestionBox = styled.div`
  margin-bottom: 50px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0 20px;
`;

const Btn = styled.button`
  margin: 20px 30px 0px 0px;
  width: 100px;
  height: 50px;  
  border: none;
  border-radius: 4px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 14px;
  &:disabled {
    opacity: 0.5;
  }
`;

const Err = styled.p`
  margin: 20px 30px 0px 0px;
  color: ${COLORS.wrong};
  font-size: 14px;
  text-align: center;
`;
