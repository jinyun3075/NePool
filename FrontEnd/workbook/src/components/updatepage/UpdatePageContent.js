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

  const [viewBtn, setViewBtn] = useState(false);

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
          <button onClick={() => navigate(-1)}></button>
          <p>문제집 수정</p>
        </Myworkbook>

        <ClickP>#플러스 버튼을 눌러 문제를 추가해 주세요</ClickP>
        <ScrollbarSection>
          <EditWorkBookView onClick={() => {setViewBtn(!viewBtn)}}>
            {viewBtn ? "문제 수정" : "문제집 표지 수정"}
          </EditWorkBookView>
          <WorkbookForm
            onSubmit={(e) => {
              e.preventDefault();
            }}
            viewBtn={viewBtn}
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
                  <QuestionBox>
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
                  </QuestionBox>
                  
                </QuestionLi>
              );
            })}
          </QuestionUl>

          <BtnBox>
            {!viewBtn && (
              <>
                <Link to="/add" state={{ workbookid: workbookData.id }}>
                  <CreateBtn src="/img/plus.svg"></CreateBtn>
                </Link>
                <>
                  {question.length < 4 && <span>문제 추가하기</span>}
                </>
              </>
            )}
          </BtnBox>
        </ScrollbarSection>
      </Article>
    </>
  );
}

const Article = styled.article`
  flex-basis: 70%;
  position: relative;
  margin: 0 4% 0 auto;
  min-height: 700px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 15px;
  box-sizing: border-box;
  @media (max-width: 1660px) {
    width: 75%;
    transition: all 0.3s;
  }
  @media (max-width: 1024px) {
    width: 50%;
    transition: all 0.3s;
  }
  @media (max-width: 720px) {
    min-width: 439px;
    transition: all 0.3s;
  }
  @media (max-width: 420px) {
    border: none;
    min-width: 400px;
    margin: 0 auto;
    transition: all 0.3s;
  }
`;

const Myworkbook = styled.div`
  display: flex;
  align-items: center;
  height: 6%;
  border-bottom: 1px solid ${COLORS.light_gray};
  button {
    margin-left: 15px;
    width: 24px;
    height: 24px;
    background: url('/img/arrowBack.svg') center no-repeat;
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

const ScrollbarSection = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-height: 700px;
  @media (max-width: 1370px) {
    flex-direction: column;
    align-items: center;
    transition: all 0.3s;
  }
  
  /* overflow-x: auto;
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
  } */
`;
const WorkbookForm = styled.form`
  display: flex;
  /* flex-basis: 25%; */
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
  min-width: 500px;
  height: 550px;
  @media (max-width: 1370px) {
    display: none;
    ${props => props.viewBtn && (
      css`
        display: flex;
      `
    )}
  }
  @media (max-width: 420px) {
    min-width: 300px;
  }
`;

const ClickP = styled.p`
  position: absolute;
  right: 0;
  margin: 25px 15px 0;
  color: ${COLORS.light_gray};
  font-size: 12px;
  font-style: italic;
  text-align: end;
  @media (max-width: 1370px) {
    width: 110px;
  }
  @media (max-width: 420px) {
    width: 90px;
    font-size: 10px;
  }
`

const EditWorkBookView = styled.strong`
  display: none;
  margin: 35px 0 0;
  font-size: 13px;
  padding: 10px 15px;
  border: 1px solid ${COLORS.gray};
  box-shadow: 3px 3px 1px 1px rgb(34 36 38 / 15%);
  cursor: pointer;
  &:hover {
    border: 1px solid ${COLORS.blue};
    background: ${COLORS.blue};
    color: ${COLORS.white};
    box-shadow: 3px 3px 1px 0px rgb(110 150 240 / 45%);
    transition: all 0.3s;
  }
  @media (max-width: 1370px) {
    display: block;
  }
`

const Input = styled.input`
  display: none;
  width: 20%;
  height: 100%;
  border-radius: 10px;
`;
const Label = styled.label`
  /* margin: 0 50px 0 250px; */
  width: 180px;
  height: 250px;
  border-radius: 10px;
  cursor: pointer;
`;
const WorkbookImg = styled.img`
  width: 180px;
  height: 250px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 10px;
  opacity: 0.6;
  object-fit: cover;
`;

const TextSelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 30px auto 0;
  /* width: 30%;
  height: 80%; */
`;

const TextInput = styled.input`
  width: 300px;
  height: 35px;
  border: none;
  padding-left: 5px;
  border-bottom: 1px solid ${COLORS.light_gray};
  color: ${COLORS.text_gray};
  font-size: 14px;
  /* font-weight: 700; */
  &:focus {
    outline: none;
    border-color: ${COLORS.blue};
  }
  &::placeholder {
    font-size: 13px;
    color: ${COLORS.gray};
  }
`;

const Select = styled.select`
  width: 310px;
  height: 40px;
  padding-left: 5px;
  border: none;
  border-bottom: 1px solid ${COLORS.light_gray};
  border-color: ${COLORS.light_gray};
  color: ${COLORS.text_gray};
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: ${COLORS.blue};
  }
  option {
    line-height: 18px;
    color: ${COLORS.text_gray};
  }
  option[value="분류"][disabled] {
    /* display: none; */
  }
`;

const Explain = styled.textarea`
  margin: 10px 0 0;
  padding: 15px 10px;
  width: 290px;
  height: 40px;
  /* border-radius: 5px; */
  border: 1px solid ${COLORS.light_gray};
  border-color: ${COLORS.light_gray};
  color: ${COLORS.text_gray};
  font-size: 14px;
  resize: none;
  z-index: 40;
  &::placeholder {
    font-size: 13px;
    color: ${COLORS.gray};
  }
  &:focus {
    outline: none;
    border-color: ${COLORS.blue};
  }
`;

const Workbookupdate = styled.button`
  margin: 20px auto 0;
  width: 90%;
  /* height: 32px; */
  border: none;
  padding: 12px 0;
  border-radius: 5px;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 14px;
`;
const QuestionUl = styled.ul`
  width: 100%;
  /* flex-basis: 55%; */
  margin: 40px 0;
  height: 550px;
  /* overflow-x: auto; */
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

const QuestionLi = styled.li`
  padding: 14px 100px 0 0px;
  @media (max-width: 1370px) {
    padding: 14px 50px;
  }
  @media (max-width: 420px) {
    padding: 0;
  }
  /* min-width: 650px; */
  /* @media (max-width: 1670px) {
    min-width: 400px;
    padding: 14px 0 0 0;
    transition: all 0.3s;
  } */
`;

const QuestionBox = styled.div`
  padding: 25px 0 15px;
  border-bottom: 1px solid ${COLORS.alpha_gray};
  @media (max-width: 1370px) {
    min-width: 350px;
    transition: all 0.3s;
  }
  @media (max-width: 420px) {
    width: 90%;
    margin: 0 auto;
  }
`

const Question = styled.p`
  width: 580px;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 1590px) {
    width: auto;
    transition: all 0.3s;
  }
`;

const Answer = styled.p`
  margin: 12px 0 0 6px;
  width: 580px;
  color: ${COLORS.gray};
  font-weight: 600;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-break: break-all;
  @media (max-width: 1590px) {
    width: auto;
    transition: all 0.3s;
  }
`;

const Answers = styled.p`
  margin: 15px 0 0 6px;
  width: 580px;
  color: ${COLORS.light_gray};
  font-weight: 400;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-break: break-all;
  @media (max-width: 1590px) {
    width: auto;
    transition: all 0.3s;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: end;
  margin: 30px 0 0;
`;

const Update = styled.button`
  margin-right: 20px;
  width: 40px;
  height: 25px;
  border: none;
  color: ${COLORS.text_gray};
  font-size: 13px;
  &:hover {
    color: ${COLORS.blue};
    border-bottom: 2px solid ${COLORS.blue};
  }
`;

const Delete = styled.button`
  width: 40px;
  height: 25px;
  border: none;
  color: ${COLORS.text_gray};
  font-size: 13px;
  &:hover {
    color: ${COLORS.blue};
    border-bottom: 2px solid ${COLORS.blue};
  }
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: absolute;
  right: 30px;
  bottom: 30px;
  span {
    color: ${COLORS.light_gray};
    font-size: 13px;
    &::after {
      content: '';
      position: absolute;
      top: -19px;
      left: -9px;
      background: url('/img/showPlus.svg') no-repeat center;
      width: 40px;
      height: 40px;
    }
  }
`;

const CreateBtn = styled.img`
  width: 50px;
  height: 50px;
  z-index: 20;
  cursor: pointer;
`;
