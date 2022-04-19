import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import Answers from './Answers';
import { ExplanationModal } from './ExplanationModal';
import Progress from './Progress';
import Question from './Question';
import Result from './Result';
import styled from 'styled-components';
import axios from 'axios';
import { API, COLORS } from '../../constants'

export default function StudyPage() {
  const navigate = useNavigate();

  const params = useParams();
  const workBookId = params.id;

  const location = useLocation();
  const userName = location.state.username;

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
      explanation: '',
    }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const question = questionsData[currentQuestion];

  const [answers, setAnswers] = useState([]);

  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [check, setCheck] = useState(false);

  const [btnVisible, setBtnVisible] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [isAnswer, setIsAnswer] = useState(false);
  const [modal, setModal] = useState(false);

  const [shotAnswer, setShotAnswer] = useState([])
  const [oneShotAnswer, setOneShotAnswer] = useState([])

  const mode = "study"

  const getTest = async () => {
    const res = await axios.get(`${API}/work/${userName}/${workBookId}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setQuestionsData(res.data);
  };
 
  const click = e => {
    const { value } = e.target;
    e.preventDefault();
    setCurrentAnswer(value);
    setCheck(false);
    setError(false);
  };

  const answerCheck = () => {
    if(currentAnswer === "") {
      setCheck(true);
      return
    }

    if(currentAnswer !== undefined) {
      setShotAnswer([...shotAnswer, currentAnswer]);
    }

    if(currentAnswer === question.correct) {
      setBtnVisible(true);
      setError(false);
      setCorrect(true);
      setIsAnswer(true);
    } else {
      setError(true);
      setCorrect(false);
    }
  };

  const nextQuestion = () => {
    const answer = {questionId: question.id, answer: currentAnswer};

    setOneShotAnswer([...oneShotAnswer, shotAnswer[0]]);
    setShotAnswer([]);

    answers.push(answer);
    setAnswers(answers);
    setCurrentAnswer('');

    setCorrect(false);
    setBtnVisible(false);
    setIsAnswer(false);

    if(currentQuestion + 1 < questionsData.length) {
      setCurrentQuestion(currentQuestion + 1);
      return
    }
    setIsResult(true);
  };

  const openExModal = () => {
    setModal(true);
  };
  const closeExModal = () => {
    setModal(false);
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
          <h1 className="blind">공부 모드 결과</h1>
          <ResultBoard>
            <Result questionsData={questionsData} oneShotAnswer={oneShotAnswer}/>
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
                <Answers
                  mode={mode}
                  question={question}
                  currentAnswer={currentAnswer}
                  click={click}
                  error={error}
                  correct={correct}
                />
                <Line />
              </div>
            </Test>
            <BtnBox>
              {btnVisible && <Btn onClick={openExModal}>정답 해설</Btn>}
              {!btnVisible ? <Btn onClick={answerCheck}>정답 확인</Btn> : <Btn onClick={nextQuestion}>다음 문제</Btn> }
            </BtnBox>
            <Background className={`${modal}`} onClick={closeExModal} />
            <ExplanationModal modal={modal} question={question} />
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
  background: white;
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
  background: ${COLORS.blue};
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
  min-width: 600px;
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

const Line = styled.div`
  margin:  30px 30px 0;
  border-bottom: 1px solid ${COLORS.white_gray};
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: end;
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
  margin: 15px 0;
  color: ${COLORS.wrong};
  font-size: 14px;
  text-align: center;
`;

const Background = styled.div`
  &.true {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: ${COLORS.gray};
    opacity: 0.4;
  }
`;
