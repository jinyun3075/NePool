import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants/index";

export default function AddCont({workbookid}) {
  const username = sessionStorage.getItem('user');

  const navigate = useNavigate();
  
  const [answer, setAnswer] = useState({
      question: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
      answerE: "",
      correct: "",
      explanation: ""
    });

  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const QuestionData = {
      question: answer.question,
      answer_a: answer.answerA,
      answer_b: answer.answerB,
      answer_c: answer.answerC,
      answer_d: answer.answerD,
      answer_e: answer.answerE,
      correct: answer.correct,
      explanation: answer.explanation
    };
    const res = await axios.post(`${API}/work/${username}/${workbookid}`, QuestionData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(res.data.message) setError(res.data.message);
    else navigate(-1);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setAnswer({...answer, [name]: value});
  };

  const onClick = (e) => {
    const {value} = e.target;
    setAnswer({...answer, correct: value});
  };

  return (
    <Right>
      <Myworkbook>
        <button onClick={() => navigate(-1)}></button>
        <p>문제 만들기</p>
      </Myworkbook>
      <MakeBox onSubmit={onSubmit} autoComplete="off">
        <Box>
          <LeftBox>
            <Input
              name="question"
              type="text"
              id="question"
              value={answer.question}
              onChange={onChange} 
              placeholder="문제 입력" 
            />
            <div>
              <InputBox htmlFor="answerA">
                <input
                  name="answer"
                  type="radio"
                  id="answerA"
                  value={answer.answerA}
                  onClick={onClick}
                />
                <InputNum
                  name="answerA"
                  type="text"
                  id="answerA"
                  placeholder="보기1"
                  value={answer.answerA}
                  onChange={onChange}
                />
              </InputBox>
              <InputBox htmlFor="answerB">
                <input
                  name="answer"
                  type="radio"
                  id="answerB"
                  value={answer.answerB}
                  onClick={onClick}
                />
                <InputNum
                  name="answerB"
                  type="text"
                  id="answerB"
                  placeholder="보기2"
                  value={answer.answerB}
                  onChange={onChange}
                />
              </InputBox>
              <InputBox htmlFor="answerC">
                <input
                  name="answer"
                  type="radio"
                  id="answerC"
                  value={answer.answerC}
                  onClick={onClick}
                /> 
                <InputNum
                  name="answerC"
                  type="text"
                  id="answerC"
                  placeholder="보기3"
                  value={answer.answerC}
                  onChange={onChange} 
                /> 
              </InputBox>
              <InputBox htmlFor="answerD">
                <input
                  name="answer"
                  type="radio"
                  id="answerD"
                  value={answer.answerD}
                  onClick={onClick}
                /> 
                <InputNum
                  name="answerD"
                  type="text"
                  id="answerD"
                  placeholder="보기4"
                  value={answer.answerD}
                  onChange={onChange} 
                /> 
              </InputBox>
              <InputBox htmlFor="answerE">
                <input
                  name="answer"
                  type="radio"
                  id="answerE"
                  value={answer.answerE}
                  onClick={onClick}
                /> 
                <InputNum
                  name="answerE"
                  type="text"
                  id="answerE"
                  placeholder="보기5"
                  value={answer.answerE}
                  onChange={onChange} 
                /> 
              </InputBox>
            </div>
          </LeftBox>
          <div>
            <InputTxt 
              name="explanation"
              type="text"
              id="explanation"
              value={answer.explanation}
              onChange={onChange} 
              placeholder="설명 추가(선택)"
            />
            <BtnBox>
              <span>{error}</span>
              <Btn>추가</Btn>
            </BtnBox>
          </div>
        </Box>
      </MakeBox>
    </Right>
  )
}
  
const Myworkbook = styled.div`
  display: flex;
  align-items: center;
  height: 6%;
  border-bottom: 2px solid ${COLORS.light_gray};
  button {
    margin-left: 15px;
    width: 24px;
    height: 24px;
    background: url('/img/arrowBack.svg') center no-repeat;
  }
  p {
    margin-left: 10px;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 3rem;
  }
`;

const Right = styled.article`
  flex-basis: 70%;
  position: relative;
  margin: 0 auto;
  min-height: 700px;
  border: 2px solid ${COLORS.light_gray};
  border-radius: 15px;
`;

const MakeBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 80px 0px 0;
  min-width: 1000px;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Input = styled.input`
  padding: 10px 5px;
  margin-bottom: 22px;
  width: 400px;
  height: 40px;
  border: none;
  border-bottom: 1px solid ${COLORS.light_gray};
  background: none;
  color: ${COLORS.black};
  font-size: 15px;
  &::placeholder {
    color: #767676;
  }
  &:focus {
    border-bottom: 1px solid ${COLORS.blue};
    outline: none;
  }
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  div{
    margin: 20px 0 40px;
  }
`;

const InputBox = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  input[type="radio"] {
    width: 20px;
    height: 20px;
  }
`;

const InputNum = styled.input`
  display: block;
  position: relative;
  padding: 3px;
  margin: 14px 0;
  width: 370px;
  height: 40px;
  border: none;
  background: none;
  color: ${COLORS.black};
  box-sizing: border-box;
  transition: all;
  &::placeholder {
    color: ${COLORS.gray};
  }
  &:hover {
    border-bottom: 1px solid ${COLORS.light_gray};
  }
  &:focus {
    border-bottom: 2px solid ${COLORS.blue};
    outline: none;
  }
`;

const InputTxt = styled.textarea`
  display: block;
  padding: 15px;
  width: 450px;
  height: 450px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 5px;
  background: none;
  color: ${COLORS.black};
  font-family: "Noto Sans KR";
  box-sizing: border-box;
  resize: none;
  &::placeholder {
    color: ${COLORS.gray};
  }
  &:focus {
    border: 2px solid ${COLORS.blue};
    outline: none;
  }
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  margin-top: 25px;
  span {
    color: ${COLORS.error};
    font-size: 14px;
  }
`;

const Btn = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 6px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
`;
