import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { API } from "../../constants";
import NoticeModal from "./notice";
import SearchResult from "./search";
import StatusModal from "./status";

export default function HeaderSignin() {
  //유저정보 API
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

  const getUser = async () => {
    const user = sessionStorage.getItem("user");
    const res = await axios.get(`${API}/user/${user}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setUserName(res.data);
    // console.log(res);
  };
  const token = sessionStorage.getItem("token");
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
  const [keyUp, setKeyUp] = useState()
  const onKeyUp = (e) => {
    setKeyUp(e.target.value);
  }
  // console.log(keyUp);
  const getResult = async() => {
    const res = await axios.get(`${API}/search/${keyUp}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    // console.log(res.data);
    setSearch(res.data.workBook);
  };
  // console.log(search);
  useEffect(() => {
    getUser();
  },[]);
  
  useEffect(() => {
    getResult();
  },[keyUp]);
  
  //모달 관련
  const searchRef = useRef();
  const noticeRef = useRef();
  const statusRef = useRef();

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
  //검색창 모달
  const [searchOn, setSearchOn] = useState(false);
  const openSearch = (e) => {
    setSearchOn(true);
    if(searchRef.current !==e.target) setSearchOn(false)
  }
  //알림창 모달
  const [noticeOn, setNoticeOn] = useState(false);
  const openNotice = (e) => {
    setNoticeOn(true);
    if(noticeRef.current !==e.target) setNoticeOn(false)
  };

  //프로필 창 모달
  const [statusON, setStatusON] = useState(false);
  const openStatus = (e) => {
    setStatusON(true);
    if(statusRef.current !==e.target) setStatusON(false)
  };

  return (
    <>
      <header>
        <HeaderWrap>
          <SearchBox>
            <SearchBtn>
              <img src="/img/search.svg" alt="돋보기" />
            </SearchBtn>
            <SearchInp onFocus={openSearch} 
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
  margin-top: 18px;
  padding-bottom: 18px;
  align-items: center;
  border-bottom: 3px solid #c1c1c1;
`;
// 검색창
const SearchBox = styled.form`
  /* z-index: 999; */
  display: flex;
  align-items: center;
  width: 360px;
`;
const SearchBtn = styled.button`
  position: relative;
  z-index: 2;
  width: 40px;
  height: 40px;
  border-radius: 6px;
`;
const CloseBtn = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  margin-left: 321px;
`;
const SearchInp = styled.input`
  position: absolute;
  width: 280px;
  height: 40px;
  border: 0.5px solid #b6b6b6;
  border-radius: 6px;
  padding: 0 40px 0 40px;
  font-size: 15px;
  transition: 500ms width ease-in-out;
  ::placeholder {
    font-size: 15px;
    line-height: 40px;
    color: #b6b6b6;
  }
  :focus {
    outline: none;
    border: 2px solid #2f80ed;
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
  font-size: 14px;
  width: 100px;
  height: 45px;
  border: 0.5px solid #b6b6b6;
  border-radius: 6px;
  text-align: center;
  line-height: 45px;
  background-color: ${(props) => props.color};
  color: ${(props) => props.font};
  margin: 0 10px;
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
