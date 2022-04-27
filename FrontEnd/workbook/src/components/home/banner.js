import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants";

export default function Banner({allUserCount}) {
  const user = sessionStorage.getItem("user");

  const [allWorkBook, setAllWorkBook] = useState("");
  const [userId, setUserId] = useState("");
  const [notice, setNotice] = useState("")

  const getAllWorkbook = async () => {
    const res = await axios.get(`${API}/workbook/all`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setAllWorkBook(res.data);
  };
  const getUser = async () => {
    const res = await axios.get(`${API}/user/${user}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setUserId(res.data.id);
  };
  const getNotice = async () => {
    const res = await axios.get(`${API}/announcement `, {
      headers: {
        "Content-type": "application/json",
      },
    })
    setNotice(res.data.dtoList[0])
  };

  useEffect(() => {
    getUser();
    getAllWorkbook();
    getNotice();
  }, []);

  return (
    <>
      <BannerBox>
        <TextBox>
       
          <BannerText size="25px">
            현재
            <BannerText size="36px" weight="bold">
              &nbsp;{allUserCount}명
            </BannerText>
            의 학생 분들이
            </BannerText>
            <BannerText size="25px">
            <BannerText size="36px" weight="bold">
              &nbsp;{allWorkBook}개
            </BannerText>
            에 달하는 내풀 문제집을 풀고 있습니다!
          </BannerText>
        </TextBox>
        <div>
          {/* <BannerText size="30px">당장 시험 준비를 해야한다면?</BannerText> */}
        </div>
        <ButtonBox>
          <Link to="/Allpost">
            <Btn bg="white" border="0.5px solid #b6b6b6">
              전체 문제 보러가기
            </Btn>
          </Link>
          <Link to="/Join">
            <Btn bg="#2f80ed" color="white">
              회원가입 하러가기
            </Btn>
          </Link>
        </ButtonBox>
      </BannerBox>
      <NotionBox>
        <Notion>
          {notice && (
            <Link to={`/notice/${notice.id}`} state={{item: notice, userId: userId}}>
              <MainNotion>{notice.title}</MainNotion>
            </Link>
          )}
          <Link to="/notice">
            <WholeBtn>전체보기</WholeBtn>
          </Link>
        </Notion>
      </NotionBox>
    </>
  );
}

const BannerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 80px 0 0;
  height: 300px;
  background: #EDF3F7;
  padding: 60px 0;
  /* background: url(/img/background.svg) center/100% no-repeat; */
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`
const BannerText = styled.span`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
`;

const ButtonBox = styled.button`
  display: flex;
`;

const Btn = styled.div`
  display: block;
  margin: 0 10px;
  width: 220px;
  height: 50px;
  box-sizing: border-box;
  border: ${(props) => props.border};
  border-radius: 3px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  font-size: 15px;
  line-height: 50px;
  box-shadow: 3px 3px 1px 0px rgb(34 36 38 / 15%);
`;

const NotionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const Notion = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  gap: 50px;
`;

const MainNotion = styled.span`
  display: inline-block;
  /* font-size: 15px; */
  position: relative;
  &:hover {
    color: ${COLORS.blue};
  }
`;

const WholeBtn = styled.span`
  font-size: 14px;
  color: ${COLORS.gray};
  /* text-decoration: underline; */
  /* &:hover {
    color: ${COLORS.blue};
  } */
`;
