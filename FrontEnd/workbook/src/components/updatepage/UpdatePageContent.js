import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import axios from "axios";
import { COLORS, API } from "../../constants/index";

export default function UpdatepageContent() {
  const user = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  const location = useLocation();
  const workbookData = location.state.workbookdata;

  const [workId, setWorkId] = useState("");
  const [imageUrl, setImageUrl] = useState(workbookData.image);

  const [question, setQuestion] = useState([
    {
      id: "",
      question: "",
      answer_a: "",
      answer_b: "",
      answer_c: "",
      answer_d: "",
      answer_e: "",
      correct: "",
      explanation: "",
    },
  ]);

  const [putWorkbook, setPutWorkbook] = useState({
    title: workbookData.title,
    content: workbookData.content,
    type: workbookData.type,
    image: workbookData.image,
  });

  // 문제 보이기 (Get)
  const GetQuestion = async () => {
    const res = await axios.get(`${API}/work/${user}/${workbookData.id}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    // console.log(res);
    setQuestion(res.data);
  };

  // 문제집 수정
  const UpdateWorkbook = async () => {
    await axios.put(
      `${API}/workbook/update/${user}/${workbookData.id}`,
      {
        title: putWorkbook.title,
        content: putWorkbook.content,
        type: putWorkbook.type,
        image: imageUrl,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    navigate("/mypage");
  };

  // 이미지 업로드 API
  const ChangeImg = async (e) => {
    const uploadFiles = e.target.files[0];
    // console.log(uploadFiles);
    const formData = new FormData();
    formData.append("uploadFiles", uploadFiles);

    const ress = await axios.post(`${API}/upload`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    setImageUrl(ress.data[0].imageUrl);
  };

  // 문제 삭제
  const DeleteQuestion = async (workId) => {
    await axios(`${API}/work/${user}/${workbookData.id}/${workId}`, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.reload();
  };

  const handlingChange = (e) => {
    setPutWorkbook({ ...putWorkbook, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    GetQuestion();
  }, [workId]);

  return (
    <>
      <Article>
        <Myworkbook>
          <p>문제집 만들기</p>
        </Myworkbook>

        <ScrollbarSection>
          <WorkbookForm
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Input type="file" id="input" onChange={ChangeImg} />
            <Label htmlFor="input">
              <WorkbookImg
                src={
                  imageUrl
                    ? imageUrl
                    : putWorkbook.image
                    ? putWorkbook.image
                    : "./img/basic.png"
                }
              />
            </Label>
            <TextSelect>
              <TextInput
                name="title"
                value={putWorkbook.title}
                onChange={handlingChange}
                type="text"
              ></TextInput>
              <Select
                placeholder={workbookData.type}
                name="type"
                value={putWorkbook.type}
                onChange={handlingChange}
              >
                <option value="수능·내신">수능·내신</option>
                <option value="어학">어학</option>
                <option value="자격증">자격증</option>
                <option value="시사·상식">시사·상식</option>
                <option value="기타">기타</option>
              </Select>
              <Explain
                rows="5"
                placeholder={workbookData.content}
                name="content"
                value={putWorkbook.content}
                onChange={handlingChange}
              ></Explain>
              <Workbookupdate type="submit" onClick={UpdateWorkbook}>
                수정
              </Workbookupdate>
            </TextSelect>
          </WorkbookForm>

          <QuestionUl>
            {question.map((questiondata, i) => {
              return (
                <QuestionLi key={questiondata.id}>
                  <Question>
                    {i + 1}. {questiondata.question}
                  </Question>
                  <Answer>[정답 : {questiondata.correct}]</Answer>
                  <Answers>{questiondata.explanation}</Answers>
                  <ButtonDiv>
                    <Link
                      to={"/updatequestion"}
                      state={{
                        workbookid: workbookData.id,
                        question: questiondata,
                      }}
                    >
                      <Update>수정</Update>
                    </Link>
                    <Delete
                      onClick={() => {
                        DeleteQuestion(questiondata.id);
                      }}
                    >
                      삭제
                    </Delete>
                  </ButtonDiv>
                </QuestionLi>
              );
            })}
          </QuestionUl>

          <Link to="/add" state={{ workbookid: workbookData.id }}>
            <CreateBtn src="/img/plus.svg"></CreateBtn>
          </Link>
        </ScrollbarSection>
      </Article>
    </>
  );
}

const Article = styled.article`
  flex-basis: 70%;
  position: relative;
  margin: 0 4% 0 auto;
  border: 3px solid ${COLORS.light_gray};
  border-radius: 15px;
  box-sizing: border-box;
`;

const Myworkbook = styled.div`
  height: 7%;
  border-bottom: 3px solid ${COLORS.light_gray};
  p {
    margin-left: 20px;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 3rem;
  }
`;

const ScrollbarSection = styled.section`
  width: 100%;
  max-height: 90%;
  overflow-x: auto;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: ${COLORS.light_gray};
  }
  &::-webkit-scrollbar-track {
    background-color: ${COLORS.white};
  }
`;
const WorkbookForm = styled.form`
  display: flex;
  margin: 1em 0;
  width: 100%;
  height: 45%;
`;

const Input = styled.input`
  display: none;
  width: 20%;
  height: 100%;
`;
const Label = styled.label`
  margin: 0 50px 0 250px;
  width: 20%;
  height: 100%;
  cursor: pointer;
`;
const WorkbookImg = styled.img`
  width: 100%;
  height: 280px;
  opacity: 0.6;
`;

const TextSelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  width: 30%;
  height: 80%;
`;

const TextInput = styled.input`
  padding-left: 10px;
  margin-top: 36px;
  width: 95%;
  height: 30px;
  border-radius: 5px;
  border: 2px solid ${COLORS.light_gray};
  color: ${COLORS.black};
  font-weight: bold;
  &:focus {
    border-color: ${COLORS.blue};
  }
`;

const Select = styled.select`
  padding-left: 5px;
  margin-top: 20px;
  width: 100%;
  height: 35px;
  border: 2px solid ${COLORS.light_gray};
  border-radius: 5px;
  color: ${COLORS.black};
  font-weight: bold;
`;

const Explain = styled.textarea`
  padding: 3%;
  padding-left: 10px;
  margin-top: 20px;
  width: 93%;
  height: 80px;
  border: 2px solid ${COLORS.light_gray};
  border-radius: 5px;
  color: ${COLORS.black};
  font-weight: bold;
  resize: none;
`;

const Workbookupdate = styled.button`
  margin-top: 20px;
  width: 40%;
  height: 32px;
  border: none;
  border-radius: 5px;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 12px;
`;
const QuestionUl = styled.ul`
  width: 100%;
`;

const QuestionLi = styled.li`
  padding: 2em;
`;

const Question = styled.p`
  width: 900px;
  font-size: 16px;
  font-weight: bold;
  white-space: no-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Answer = styled.p`
  margin: 7px 0 0 6px;
  color: ${COLORS.gray};
  font-weight: 600;
  font-size: 13px;
`;

const Answers = styled.p`
  margin: 7px 0 0 6px;
  width: 900px;
  color: ${COLORS.light_gray};
  font-weight: 400;
  font-size: 13px;
  white-space: no-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonDiv = styled.div`
  display: flex;
  margin: 15px 0 0 6px;
`;

const Update = styled.button`
  margin-right: 10px;
  width: 60px;
  height: 32px;
  border: none;
  border-radius: 5px;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 12px;
`;

const Delete = styled.button`
  width: 60px;
  height: 32px;
  border: none;
  border-radius: 5px;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 12px;
`;

const CreateBtn = styled.img`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  z-index: 20;
  cursor: pointer;
`;
