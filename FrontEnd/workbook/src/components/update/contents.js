import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

export default function Contents() {
  const [createtitle, setCreatetitle] = useState("");
  const [createcontent, setCreatecontent] = useState("");
  const [createtype, setCreatetype] = useState("정보처리기사");

  function Change(e) {
    const {
      target: { name, value },
    } = e;
    if (name === "title") {
      setCreatetitle(value);
    } else if (name === "content") {
      setCreatecontent(value);
    } else if (name === "type") {
      setCreatetype(value);
    }
  }
  return (
    <>
      <EditBox>
        <EditImg>
          <input type="file" />
        </EditImg>
        <InputBox>
          <InputNum placeholder="예시문제집" />
          <select name="" id="">
            <option value="정보처리기사">정보처리기사</option>
            <option value="YBMCOS">YBM COS</option>
            <option value="웹디자인 기능사">웹디자인 기능사</option>
            <option value="리눅스 마스터">리눅스 마스터</option>
            <option value="TOPCIT">TOPCIT</option>
            <option value="CCTS">CCTS</option>
            <option value="CLA">CLA</option>
          </select>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </InputBox>
      </EditBox>
      <div>
        <ul>
          <li></li>
        </ul>
      </div>
    </>
  );
}

const EditBox = styled.div`
  display: flex;
  height: 280px;
  border: 1px solid black;
  margin-top: 10px;
`;
const EditImg = styled.div`
  input {
    /* display: none; */
    width: 269px;
    height: 351px;
  }
`;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputNum = styled.input`
  display: block;
  width: 368px;
  height: 40px;
  color: ${COLORS.black};
  margin: 14px 0 12px;
  padding: 3px 16px;
  border: 2px solid ${COLORS.light_gray};
  border-radius: 5px;
  background: none;
  &::placeholder {
    color: #767676;
  }
  &:focus {
    outline: none;
    border: 1px solid ${COLORS.blue};
  }
`;
