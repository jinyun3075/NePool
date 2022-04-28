import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants/index";

export default function UpdateCont({ workbookid }) {
  const username = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  const location = useLocation();
  const question = location.state.question;

  const navigate = useNavigate();

  const [answer, setAnswer] = useState({
    question: question.question,
    answerA: question.answer_a,
    answerB: question.answer_b,
    answerC: question.answer_c,
    answerD: question.answer_d,
    answerE: question.answer_e,
    correct: question.correct,
    explanation: question.explanation,
  });

  const [error, setError] = useState("");

  // 문제수정 API
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
      explanation: answer.explanation,
    };

    const res = await axios.put(
      `${API}/work/${username}/${workbookid}/${question.id}`,
      QuestionData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.message) setError(res.data.message);
    else navigate(-1);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setAnswer({ ...answer, [name]: value });
  };
  const onClick = (e) => {
    const { value } = e.target;
    setAnswer({ ...answer, correct: value });
  };

  return (
    <>
      <Right>
        <Myworkbook>
          <button onClick={() => navigate(-1)}></button>
          <p>문제 수정</p>
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
                placeholder={question.question}
              />
              <div>
                <InputBox htmlFor="answerA">
                  <input
                    name="answer"
                    type="radio"
                    id="answerA"
                    value={answer.answerA}
                    checked={answer.answerA === answer.correct}
                    onClick={onClick}
                  />
                  <InputNum
                    name="answerA"
                    type="text"
                    id="answerA"
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
                    checked={answer.answerB === answer.correct}
                    onClick={onClick}
                  />
                  <InputNum
                    name="answerB"
                    type="text"
                    id="answerB"
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
                    checked={answer.answerC === answer.correct}
                    onClick={onClick}
                  />
                  <InputNum
                    name="answerC"
                    type="text"
                    id="answerC"
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
                    checked={answer.answerD === answer.correct}
                    onClick={onClick}
                  />
                  <InputNum
                    name="answerD"
                    type="text"
                    id="answerD"
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
                    checked={answer.answerE === answer.correct}
                    onClick={onClick}
                  />
                  <InputNum
                    name="answerE"
                    type="text"
                    id="answerE"
                    value={answer.answerE}
                    onChange={onChange}
                  ></InputNum>
                </InputBox>
              </div>
            </LeftBox>
            <TxtAreaBox>
              <InputTxt
                name="explanation"
                type="text"
                id="explanation"
                value={answer.explanation}
                onChange={onChange}
                placeholder={question.explanation}
              />
              <BtnBox>
                <span>{error}</span>
                <Btn>수정</Btn>
              </BtnBox>
            </TxtAreaBox>
          </Box>
        </MakeBox>
      </Right>
    </>
  );
}

const Myworkbook = styled.div`
  display: flex;
  align-items: center;
  height: 6%;
  border-bottom: 1px solid ${COLORS.light_gray};
  button {
    margin-left: 15px;
    width: 24px;
    height: 24px;
    background: url("/img/arrowBack.svg") center no-repeat;
  }
  p {
    margin-left: 10px;
    font-size: 15px;
    line-height: 50px;
  }
  @media (max-width: 420px) {
    display: none;
  }
`;

const Right = styled.article`
  flex-basis: 70%;
  position: relative;
  margin: 0 auto;
  min-height: 700px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 15px;
  @media (max-width: 420px) {
    margin: 30px 0 0;
    border: none;
    transition: all 0.3s;
  }
`;

//내부내용
const MakeBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 80px 0px 0;
  min-width: 1000px;
  @media (max-width: 1380px) {
    padding: 50px 0;
    margin: 0;
    min-width: 80%;
    height: 580px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 15px;
      background-color: ${COLORS.light_gray};
    }
    &::-webkit-scrollbar-track {
      background-color: white;
    }
  }
  @media (max-width: 420px) {
    padding: 10px 0;
    height: 100%;
    transition: all 0.3s;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 1380px) {
    flex-direction: column;
    align-items: center;
  }
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
    color: ${COLORS.gray};
  }
  &:focus {
    border-bottom: 1px solid ${COLORS.blue};
    outline: none;
  }
  @media (max-width: 1380px) {
    width: 100%;
  }
`;
const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin: 20px 0 40px;
  }
  @media (max-width: 1380px) {
    width: 80%;
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

const TxtAreaBox = styled.div`
  @media (max-width: 1380px) {
    width: 80%;
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
  box-sizing: border-box;
  resize: none;
  &::placeholder {
    color: ${COLORS.gray};
  }
  &:focus {
    border: 2px solid ${COLORS.blue};
    outline: none;
  }
  @media (max-width: 1380px) {
    width: 100%;
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
