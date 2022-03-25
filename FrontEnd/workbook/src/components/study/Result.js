import { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants'

export default function Result({questionsData, bb}) {

  const [resultIndex, setResultIndex] = useState(0)

  const prev = () => {
    if(resultIndex === 0) return
    setResultIndex(resultIndex - 1)
  }

  const next = () => {
    if (resultIndex === questionsData.length - 1) return;
    setResultIndex(resultIndex + 1);
  }

  let count = 0

  return (
    <>
      <QuizList>
        {questionsData.map((q, i) => {
          return (
            <Card key={q.id} index={resultIndex} >
              <span>{i+1}번 문제</span>
              <Strong>{q.question}</Strong>
              <span>정답</span>
              <Strong>{q.correct}</Strong>
              <span>선택한 답</span>
              <Strong>{bb[i]}</Strong>
              <Calc>{q.correct === bb[i] && count++}</Calc>
            </Card>
          )
        })}
        {resultIndex !== 0 && <Prev onClick={prev}><span>prev</span></Prev>}
        {resultIndex !== questionsData.length - 1 && <Next onClick={next}><span>next</span></Next>}
      </QuizList>
      <ul>
        <Box>전체 문제: {questionsData.length}</Box>
        <Box>한 번에 맞춘 문제: {count}</Box>
        {/* <Box>점수: 50</Box> */}
      </ul>
    </>
  )
}

const QuizList = styled.article`
  font-size: 14px;
  text-align: center;
  color: ${COLORS.gray};
  margin: 60px auto 30px;
  display: flex;
  width: 320px;
  overflow: hidden;
  position: relative;
`

const Card = styled.article`
  min-width: 300px;
  width: 300px;
  height: 250px;
  padding: 50px 10px;
  position: relative;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 4%);
  transform: translateX(${props => -320 * (props.index)}px);
  transition: all 0.5s ease-in-out;
  span {
    color: ${COLORS.light_gray};
  }
`;

const Strong = styled.strong`
  padding: 0 30px;
  word-wrap: break-word;
  color: ${COLORS.gray};
  /* text-align: start; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Calc = styled.p`
  display: none;
`

const Prev = styled.div`
  /* background: red; */
  position: absolute;
  left: 0;
  bottom: 0;
  width: 45%;
  height: 30%;
  cursor: pointer;
  span {
    color: ${COLORS.light_gray};
    margin: 50px 0;
    display: block;
  }
`

const Next = styled.div`
  /* background: blue; */
  position: absolute;
  right: 0;
  bottom: 0;
  width: 45%;
  height: 30%;
  cursor: pointer;
  span {
    color: ${COLORS.light_gray};
    margin: 50px 0;
    display: block;
  }
`

const Box = styled.li`
  font-size: 15px;
  width: 70%;
  padding: 20px 30px;
  margin: 20px auto;
  text-align: center;
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 4%);
`
