import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { COLORS, API } from "../../constants/index";

export default function CreateModal(props) {
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("user");

  const [postWorkbook, setPostWorkbook] = useState({
    username: username,
    title: "",
    content: "",
    type: "수능·내신",
  });

  const [imageUrl, setImageUrl] = useState("");

  const change = (e) => {
    setPostWorkbook({ ...postWorkbook, [e.target.name]: e.target.value });
  };

  // 문제집 생성 API (Post)
  const workbook = async () => {
    // console.log(imageUrl)
    await axios.post(
      `${API}/workbook/register`,
      {
        username: postWorkbook.username,
        title: postWorkbook.title,
        content: postWorkbook.content,
        type: postWorkbook.type,
        image: imageUrl,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.reload();
  };

  // 이미지 업로드 API
  const changeImg = async (e) => {
    const uploadFiles = e.target.files[0];
    const formData = new FormData();
    formData.append("uploadFiles", uploadFiles);

    const res = await axios.post(`${API}/upload`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    setImageUrl(res.data[0].imageUrl);
  };

  return (
    <>
      <Modal
        onSubmit={function (e) {
          e.preventDefault();
        }.bind(this)}
      >
        <ImgDiv>
          <img
            onClick={() => {
              props.setCreate(props.create === false);
            }}
            src="./img/x.svg"
            alt="x"
          ></img>
        </ImgDiv>

        <InputLabel>
          <Input type="file" id="input" name="image" onChange={changeImg} />
          <Label htmlFor="input">
            <img src={imageUrl ? imageUrl : "./img/basic_ful.png"}></img>
          </Label>
        </InputLabel>

        <TextSelect>
          <TextInput
            onChange={change}
            name="title"
            value={postWorkbook.title}
            placeholder="문제집 이름"
            type="text"
          ></TextInput>

          <Select
            onChange={change}
            name="type"
            value={postWorkbook.type}
          >
            <option value="수능·내신">수능·내신</option>
            <option value="어학">어학</option>
            <option value="자격증">자격증</option>
            <option value="시사·상식">시사·상식</option>
            <option value="기타">기타</option>
          </Select>

          <Explain
            onChange={change}
            name="content"
            value={postWorkbook.content}
            rows="3"
            placeholder="문제집 설명"
          ></Explain>
        </TextSelect>

        <Create onClick={workbook}>문제집 생성</Create>
      </Modal>
    </>
  );
}

const Modal = styled.form`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 52%;
  left: 50%;
  padding: 1em;
  width: 400px;
  height: 615px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 8px;
  background-color: white;
  box-sizing: border-box;
  z-index: 40;
  @media (max-width: 420px) { 
    width: 360px;
  }
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: end;
  img {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

const InputLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 1em auto 0;
  width: 160px;
  height: 222px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 10px;
  /* box-sizing: border-box; */
  padding: 5px;
  &:hover {
    outline: none;
    border-color: ${COLORS.blue};
  }
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 160px;
  height: 222px;
  color: ${COLORS.light_gray};
  cursor: pointer;

  img {
    width: 160px;
    height: 222px;
    object-fit: cover;
    border-radius: 10px;
    box-sizing: border-box;
  }
`;

const TextSelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 30px auto 0;
  /* width: 75%;
  height: 40%; */
`;

const TextInput = styled.input`
  width: 300px;
  height: 35px;
  border: none;
  padding-left: 5px;
  border-bottom: 1px solid ${COLORS.light_gray};
  /* border-radius: 5px; */
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
  color: ${COLORS.gray};
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

const Create = styled.button`
  display: block;
  margin: 20px auto 0;
  width: 90%;
  height: 8%;
  border-radius: 5px;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  line-height: 2.5rem;
  text-align: center;
  cursor: pointer;
`;
