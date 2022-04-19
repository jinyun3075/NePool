import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import NoticeModal from "./notice";
import SearchResult from "./search";
import StatusModal from "./status";
import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants";

export default function HeaderSignin() {
  const user = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  const searchRef = useRef();
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
  const [search, setSearch] = useState([
    {
      content: "",
      count: 0,
      id: "",
      mogDate: "",
      regDate: "",
      share: false,
      title: "",
      type: "",
      username: "",
    },
  ]);
  
  const [keyUp, setKeyUp] = useState();
  const [searchOn, setSearchOn] = useState(false);
  const [noticeOn, setNoticeOn] = useState(false);
  const [statusON, setStatusON] = useState(false);

  const getUser = async () => {
    const res = await axios.get(`${API}/user/${user}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setUserName(res.data);
  };
  const getResult = async() => {
    const res = await axios.get(`${API}/search/${keyUp}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setSearch(res.data.workBook);
  };
  
  const onKeyUp = (e) => {
    setKeyUp(e.target.value);
  };
  const openSearch = (e) => {
    setSearchOn(true);
    if(searchRef.current !==e.target) setSearchOn(false)
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
  },[]);
  useEffect(() => {
    getResult();
  },[keyUp]);
  useEffect(()=>{
    window.addEventListener("click",openSearch);
    window.addEventListener("click",openNotice);
    window.addEventListener("click",openStatus);
    return()=>{
      window.removeEventListener("click",openSearch);
      window.removeEventListener("click",openNotice);
      window.removeEventListener("click",openStatus);
    }
  },[]);

  return (
    <>
      <header>
        <HeaderWrap>
          <SearchBox>
            <SearchBtn>
              <img src="/img/search.svg" alt="돋보기" />
            </SearchBtn>
            <SearchInp 
              onFocus={openSearch} 
              onChange={onKeyUp}
              ref={searchRef}
              type="text"
              placeholder="문제집을 검색해 보세요!"
            />
            <CloseBtn type="reset">
              <img src="/img/close.svg" alt="지우기" />
            </CloseBtn>
            {searchOn === true ?<SearchResult search={search}/> : null}
          </SearchBox>
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
                <Btn>회원가입</Btn>
              </Link>
            </BtnBox>
          )}
        </HeaderWrap>
      </header>
    </>
  );
}

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid ${COLORS.light_gray};
`;

const SearchBox = styled.form`
  display: flex;
  align-items: center;
  width: 360px;
`;

const SearchBtn = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  z-index: 2;
`;

const CloseBtn = styled.button`
  position: absolute;
  margin-left: 321px;
  width: 40px;
  height: 40px;
  border-radius: 6px;
`;

const SearchInp = styled.input`
  position: absolute;
  width: 280px;
  height: 40px;
  padding: 0 40px 0 40px;
  border: 0.5px solid ${COLORS.light_gray};
  border-radius: 6px;
  font-size: 15px;
  transition: 500ms width ease-in-out;
  ::placeholder {
    color: ${COLORS.light_gray};
    font-size: 15px;
    line-height: 40px;
  }
  :focus {
    border: 2px solid ${COLORS.blue};
    outline: none;
  }
`;

const Logo = styled.img`
  width: 180px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  width: 360px;
`;

const Btn = styled.button`
  margin: 0 10px;
  width: 100px;
  height: 45px;
  border: 0.5px solid ${COLORS.light_gray};
  border-radius: 6px;
  background-color: ${(props) => props.color};
  color: ${(props) => props.font};
  font-size: 14px;
  text-align: center;
  line-height: 45px;
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
`;
