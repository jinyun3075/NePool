import React, { useState } from "react";
import { COLORS, API } from "../../constants/index";
import styled from "styled-components";
import axios from "axios";

export default function CreateModal(props) {
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("user");

  const [postworkbook, setPostworkbook] = useState({
    username: username,
    title: "",
    content: "",
    type: "수능·내신",
  });

  const [imageurl, setImageurl] = useState("");

  const Change = (e) => {
    setPostworkbook({ ...postworkbook, [e.target.name]: e.target.value });
  };

  // 문제집 생성 API (Post)
  const Workbook = async () => {
    // console.log(imageurl)
    await axios.post(
      `${API}/workbook/register`,
      {
        username: postworkbook.username,
        title: postworkbook.title,
        content: postworkbook.content,
        type: postworkbook.type,
        image: imageurl,
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
  const ChangeImg = async (e) => {
    const uploadFiles = e.target.files[0];
    const formData = new FormData();
    formData.append("uploadFiles", uploadFiles);

    const ress = await axios.post(`${API}/upload`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    setImageurl(ress.data[0].imageUrl);
  };

  return (
    <>
      <Modal onSubmit={function (e) {e.preventDefault();}.bind(this)}>

        <ImgDiv>
          <img onClick={ () => {props.setCreate(props.create === false); }}
            src="./img/x.svg"
            alt="x"
          ></img>
        </ImgDiv>

        <InputLabel>
          <Input 
          type="file" 
          id="input" 
          name="image" 
          onChange={ChangeImg} 
          />
          <Label htmlFor="input">
            <img src={imageurl ? imageurl : "./img/basic.png"}></img>
          </Label>
        </InputLabel>

        <TextSelect>
          <TextInput
            onChange={Change}
            name="title"
            value={postworkbook.title}
            placeholder="문제집 이름"
            type="text"
          ></TextInput>

          <Select
            defaultValue="수능·내신"
            onChange={Change}
            name="type"
            value={postworkbook.type}
          >
            <option value="수능·내신">수능·내신</option>
            <option value="어학">어학</option>
            <option value="자격증">자격증</option>
            <option value="시사·상식">시사·상식</option>
            <option value="기타">기타</option>
          </Select>

          <Explain
            onChange={Change}
            name="content"
            value={postworkbook.content}
            rows="5"
            placeholder="문제집 설명"
          ></Explain>
        </TextSelect>

        <Create onClick={Workbook}>문제집 생성</Create>
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
  width: 35%;
  height: 85%;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 8px;
  background-color: white;
  box-sizing: border-box;
  z-index: 4;
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
  margin-top: 1em;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  height: 40%;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 15px;
`;

const Input = styled.input`
  display: none;
  width: 100%;
  height: 100;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  color: ${COLORS.light_gray};
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
`;

const TextSelect = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 75%;
  height: 40%;
`;

const TextInput = styled.input`
  margin-top: 36px;
  width: 97%;
  height: 20%;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 5px;
  &:focus {
    border-color: ${COLORS.blue};
  }
`;

const Select = styled.select`
  margin-top: 20px;
  width: 100%;
  height: 20%;
  border-radius: 5px;
  border-color: ${COLORS.light_gray};
  color: ${COLORS.light_gray};
`;

const Explain = styled.textarea`
  padding: 3%;
  margin-top: 20px;
  width: 93%;
  border-radius: 5px;
  border-color: ${COLORS.light_gray};
  resize: none;
  z-index: 100;
`;

const Create = styled.button`
  display: block;
  color: white;
  margin: 0 auto;
  margin-top: 20px;
  width: 90%;
  height: 8%;
  border-radius: 5px;
  background-color: ${COLORS.blue};
  line-height: 2.5rem;
  text-align: center;
  cursor: pointer;
`;
