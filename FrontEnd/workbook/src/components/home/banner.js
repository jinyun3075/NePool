import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants";

export default function Banner({allUserCount}) {
  const user = sessionStorage.getItem("user");

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

  const [allWorkBook, setAllWorkBook] = useState("");
  const [userId, setUserId] = useState("");
  const [notice, setNotice] = useState("")

  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    getAllWorkbook();
    getNotice()
  }, []);

  return (
    <>
      <BannerBox>
        <div>
          <BannerText size="20px">
            현재
            <BannerText size="30px" weight="bold">
              &nbsp;{allUserCount}명
            </BannerText>
            의 학생 분들이
            <BannerText size="30px" weight="bold">
              &nbsp;{allWorkBook}개
            </BannerText>
            에 달하는 내풀 문제집을 풀고 있습니다!
          </BannerText>
        </div>
        <div>
          <BannerText size="30px">당장 시험 준비를 해야한다면?</BannerText>
        </div>
        <ButtonBox>
          <Link to="/Allpost">
            <Btn bg="white" border="0.5px solid #b6b6b6">
              👀 전체 문제 보러가기
            </Btn>
          </Link>
          <Link to="/Join">
            <Btn bg="#2f80ed" color="white">
              🙌 회원가입 하러가기
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
  height: 300px;
  background: url(/img/background.svg) center/100% no-repeat;
`;

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
  width: 265px;
  height: 50px;
  border: ${(props) => props.border};
  border-radius: 6px;
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  font-size: 17px;
  line-height: 50px;
`;

const NotionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 170px;
`;

const Notion = styled.div`
  width: 1000px;
  height: 50px;
  background-color: ${COLORS.blue};
  text-align: center;
`;

const MainNotion = styled.span`
  display: inline-block;
  color: white;
  font-size: 15px;
  line-height: 50px;
`;

const WholeBtn = styled.span`
  position: absolute;
  margin-left: 230px;
  color: white;
  line-height: 50px;
  text-decoration: underline;
`;
