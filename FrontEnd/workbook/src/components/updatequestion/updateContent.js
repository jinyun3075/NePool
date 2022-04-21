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
  const [selected, setSelected] = useState(false);

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
    setSelected(!selected);
  };

  return (
    <>
      <Right>
        <Myworkbook>
          <p>문제집 만들기</p>
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
                <InputNum
                  name="answerA"
                  type="text"
                  id="answerA"
                  value={answer.answerA}
                  onClick={onClick}
                  onChange={onChange}
                  // className={!selected ? 'selected' : ""}
                />
                <InputNum
                  name="answerB"
                  type="text"
                  id="answerB"
                  value={answer.answerB}
                  onClick={onClick}
                  onChange={onChange}
                />
                <InputNum
                  name="answerC"
                  type="text"
                  id="answerC"
                  value={answer.answerC}
                  onClick={onClick}
                  onChange={onChange}
                />
                <InputNum
                  name="answerD"
                  type="text"
                  id="answerD"
                  value={answer.answerD}
                  onClick={onClick}
                  onChange={onChange}
                />
                <InputNum
                  name="answerE"
                  type="text"
                  id="answerE"
                  value={answer.answerE}
                  onClick={onClick}
                  onChange={onChange}
                ></InputNum>
              </div>
              <div>정답: {answer.correct}</div>
            </LeftBox>
            <RightBox>
              <InputTxt
                name="explanation"
                type="text"
                id="explanation"
                value={answer.explanation}
                onChange={onChange}
                placeholder={question.explanation}
              />
            </RightBox>
          </Box>
          <span>{error}</span>

          <Btn>수정</Btn>
        </MakeBox>
      </Right>
    </>
  );
}

const Myworkbook = styled.div`
  height: 6%;
  border-bottom: 3px solid ${COLORS.light_gray};
  p {
    margin-left: 20px;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 3rem;
  }
`;

const Right = styled.article`
  flex-basis: 70%;
  position: relative;
  margin: 0 auto;
  border: 3px solid ${COLORS.light_gray};
  border-radius: 15px;
`;

//내부내용
const MakeBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 50px 0px;
  span {
    margin: 0 15px;
    color: ${COLORS.error};
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Input = styled.input`
  margin-bottom: 22px;
  width: 450px;
  height: 40px;
  color: ${COLORS.black};
  border: none;
  border-bottom: 1px solid ${COLORS.light_gray};
  background: none;
  &::placeholder {
    color: ${COLORS.gray};
  }
  &:focus {
    border-bottom: 1px solid ${COLORS.blue};
    outline: none;
  }
`;
const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 525px;
  div {
    margin: 20px 0 40px;
  }
`;
const RightBox = styled.div`
  /* display: flex; */
`;

const InputNum = styled.input`
  display: block;
  padding: 3px 16px;
  margin: 14px 0 12px;
  width: 368px;
  height: 40px;
  color: ${COLORS.black};
  border: 2px solid ${COLORS.light_gray};
  border-radius: 5px;
  background: none;
  &::placeholder {
    color: ${COLORS.gray};
  }
  &:focus {
    outline: none;
    border: 1px solid ${COLORS.blue};
  }
  &.selected {
    background: ${COLORS.alpha_gray};
  }
`;
const InputTxt = styled.textarea`
  display: block;
  padding: 10px 10px;
  /* margin: 14px 0 12px; */
  width: 450px;
  height: 479px;
  color: ${COLORS.black};
  border: 1px solid ${COLORS.light_gray};
  border-radius: 5px;
  background: none;
  resize: none;
  &::placeholder {
    color: ${COLORS.gray};
  }
  &:focus {
    outline: none;
    border: 1px solid ${COLORS.blue};
  }
`;
const Btn = styled.button`
  margin-left: 40px;
  width: 80px;
  height: 40px;
  color: ${COLORS.white};
  border-radius: 6px;
  background-color: ${COLORS.blue};
`;
