import { useEffect, useState } from 'react';
import Answers from './Answers';
import styled, { css } from 'styled-components';
import { COLORS } from '../../constants';

export default function ExamResult({i, item}) {
  const [selectQuestion, setSelectQuestion] = useState(false);
  const [answerCheck, setAnswerCheck] = useState(false);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [check, setCheck] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState("");

  const mode = "exam";

  const questionClick = () => setSelectQuestion(!selectQuestion);

  const click = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setCurrentAnswer(value);
    setCheck(false);
    setError(false);
    setAnswerCheck(true);
  };
  // let point = 0 
  useEffect(() => {
    if(item.choice === item.correct) {
      setError(false);
      setCorrect(true);
      // point = point + 1
    } else {
      setError(true);
      setCorrect(false);
    }
  }, [item]);

  return (
    <>
      <TestTit onClick={questionClick} className={item.result ? 'on' : 'off' || selectQuestion ? 'click' : ''}>{i+1}. {item.question}</TestTit>
      {selectQuestion && (
        <>
          <Line />
          <AnswersBox>
            <Answers
              mode={mode}
              question={item}
              currentAnswer={item.choice}
              click={click}
              error={error}
              correct={correct}
            />
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
  padding: 30px;
  margin: 0 30px;
  border-radius: 3px;
  color: ${COLORS.white};
  font-size: 15px;
  word-wrap: break-word;
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 8%), 0 2px 8px 0 rgb(34 36 38 / 10%);
  cursor: pointer;
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
  @media (max-width: 1024px) {
    width: 80%;
    margin: 0 auto;
    transition: all 0.3s;
  }
`;

const Line = styled.div`
  margin: 30px 30px 0;
  border-bottom: 1px solid ${COLORS.white_gray};
`;

const AnswersBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-right: 30px;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    transition: all 0.3s;
  }
`;

const Explanation = styled.div`
  padding: 35px 40px;
  margin-top: 20px;
  width: 40%;
  min-width: 30%;
  border: 1px solid ${COLORS.white_gray};
  color: ${COLORS.gray};
  font-size: 14px;
  line-height: 24px;
  word-break: break-all;
  @media (max-width: 1024px) {
    width: 75%;
    transition: all 0.3s;
  }

`;
