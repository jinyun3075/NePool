import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NoticeModal from "./Notice";
import StatusModal from "./Status";
import styled, { css } from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants";

export default function HeaderSignin() {
  const user = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  const noticeRef = useRef();
  const statusRef = useRef();
  //통신 API
  const [userName, setUserName] = useState(
    {
      id: "",
      username: "",
      name: "",
      email: "",
      password: "",
      image: "",
    }
  );
  
  const [noticeOn, setNoticeOn] = useState(false);
  const [statusON, setStatusON] = useState(false);

  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    const res = await axios.get(`${API}/user/${user}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setUserName(res.data);
  };

  const openNotice = (e) => {
    setNoticeOn(true);
    if(noticeRef.current !==e.target) setNoticeOn(false)
  };
  const openStatus = (e) => {
    setStatusON(true);
    if(statusRef.current !==e.target) setStatusON(false)
  };
  
  useEffect(() => {
    getUser();
    return () => {setLoading(true)};
  },[]);

  useEffect(()=>{
    window.addEventListener("click",openNotice);
    window.addEventListener("click",openStatus);
    return()=>{
      window.removeEventListener("click",openNotice);
      window.removeEventListener("click",openStatus);
    }
  }, []);

  return (
    <>
      <Header>
        <HeaderWrap>
          <h1>
            <Link to="/">
              <Logo src="/img/logo.svg" alt="로고" />
            </Link>
          </h1>
          {token !== null ? (
            <ProfileBox>
              <button onClick={openNotice}>
                <NoticeImg src="/img/notice.svg" alt="알림" ref={noticeRef}/>
              </button>
              <NoticeModal noticeOn = {noticeOn} />
              <button onClick={openStatus}>
                <ProfileImg ref={statusRef} src={userName.image} alt="프로필 사진"  />
              </button>
              {statusON === true ? <StatusModal /> : null}
            </ProfileBox>
          ) : (
            <BtnBox>
              <Link to="/login">
                <Btn color="#2f80ed" font="white">
                  로그인
                </Btn>
              </Link>
              <Link to="/join">
                <Btn className="join">회원가입</Btn>
              </Link>
            </BtnBox>
          )}
        </HeaderWrap>
      </Header>
    </>
  );
}

const Header = styled.header`
  border-bottom: 1px solid ${COLORS.light_gray};
`

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 15px 20px;
  margin: 0 auto;
  max-width: 1200px;
  min-width: 300px;
`;

const Logo = styled.img`
  width: 160px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 520px) {
    .join {
      display: none;
    }
  }
`;

const Btn = styled.button`
  margin: 0 10px;
  width: 90px;
  height: 40px;
  border: 0.5px solid ${COLORS.light_gray};
  border-radius: 6px;
  background-color: ${(props) => props.color};
  color: ${(props) => props.font};
  font-size: 14px;
  text-align: center;
  ${props => (props.font === "white") &&
    css`
      border: none;
    `}
  @media (max-width: 520px) {
    margin: 0;
  }
`;

const ProfileBox = styled.div`
  display: flex;
  justify-content: right;
  width: 360px;
`;

const NoticeImg = styled.img`
  width: 40px;
  height: 40px;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid ${COLORS.light_gray};
  box-sizing: border-box;
`;
