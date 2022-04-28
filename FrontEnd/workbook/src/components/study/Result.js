import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

export default function Result({ questionsData, oneShotAnswer }) {
  const [resultIndex, setResultIndex] = useState(0);

  const prev = () => {
    if (resultIndex === 0) return;
    setResultIndex(resultIndex - 1);
  };

  const next = () => {
    if (resultIndex === questionsData.length - 3) return;
    setResultIndex(resultIndex + 1);
  };

  let count = 0;

  return (
    <>
      <QuizList>
        {questionsData.map((q, i) => {
          return (
            <Card key={q.id} index={resultIndex}>
              <span>{i + 1}번 문제</span>
              <Strong>{q.question}</Strong>
              <span>정답</span>
              <Strong>{q.correct}</Strong>
              <span>선택한 답</span>
              <Strong>{oneShotAnswer[i]}</Strong>
              <Calc>{q.correct === oneShotAnswer[i] && count++}</Calc>
            </Card>
          );
        })}
        {/* <Div>
          <Prev onClick={prev}><span>prev</span></Prev>
          <Next onClick={next}><span>next</span></Next>
        </Div> */}
        {/* {resultIndex !== 0 && <Prev onClick={prev}><span>prev</span></Prev>}
        {resultIndex !== questionsData.length - 1 && <Next onClick={next}><span>next</span></Next>} */}
      </QuizList>
      <BoxDiv>
        <Box>전체 문제: {questionsData.length}</Box>
        <Box>한 번에 맞춘 문제: {count}</Box>
        {/* <Box>점수: 50</Box> */}
      </BoxDiv>
    </>
  );
}

const QuizList = styled.article`
  display: flex;
  position: relative;
  margin: 60px auto;
  padding: 0 0 10px;
  color: ${COLORS.gray};
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  @media (max-width: 640px) {
    width: 320px;
  }
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: ${COLORS.light_gray};
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
`;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  transform: translateX(${(props) => -320 * props.index}px);
  padding: 50px 0;
  margin: 10px;
  width: 300px;
  min-width: 300px;
  height: 250px;
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset,
    0 2px 3px 0 rgb(34 36 38 / 4%);
  transition: all 0.5s ease-in-out;
  span {
    color: ${COLORS.light_gray};
  }
`;

const Strong = styled.strong`
  padding: 0 30px;
  color: ${COLORS.gray};
  word-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Calc = styled.p`
  display: none;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: -50px;
  width: 300px;
`;

const Prev = styled.div`
  left: 50px;
  bottom: -50px;
  cursor: pointer;
  span {
    display: block;
    margin: 50px 0;
    color: ${COLORS.light_gray};
  }
`;

const Next = styled.div`
  right: 50px;
  bottom: -50px;
  cursor: pointer;
  span {
    display: block;
    margin: 50px 0;
    color: ${COLORS.light_gray};
  }
`;

const BoxDiv = styled.ul`
  margin: 15px 0;
`;
const Box = styled.li`
  padding: 5px;
  margin: 0px auto;
  width: 30%;
  font-size: 16px;
  text-align: center;
  @media (max-width: 640px) {
    font-size: 14px;
  }
`;
