import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { API } from '../../constants'
import NoticeModal from './notice';
import StatusModal from './status';

export default function HeaderSignin() {

  //알림창 모달
  const [noticeOn, setNoticeOn] = useState(false);
  const openNotice = () => {
    setNoticeOn(!noticeOn);
  };

  //프로필 창 모달
  const [statusON, setStatusON] = useState(false);
  const openStatus = () => {
    setStatusON(!statusON);
  };

  return (
    <>
      <header>
        <HeaderWrap>
          <SearchBox>
            <SearchBtn>
              <img src="/img/search.svg" alt="돋보기" />
            </SearchBtn>
            <SearchInp type="text" autoFocus placeholder='문제집을 검색해 보세요!' />
            <CloseBtn>
              <img src="/img/close.svg" alt="지우기" />
            </CloseBtn>
          </SearchBox>
          <h1><a href="/"><Logo src="/img/logo.svg" alt="로고" /></a></h1>
          {/* <BtnBox>
            <Btn color="#2f80ed" font="white">로그인</Btn>
            <Btn>회원가입</Btn>
          </BtnBox> */}
          <ProfileBox>
            <button onClick={openNotice}>
              <NoticeImg src="/img/notice.svg" alt="알림" />
            </button>
            {noticeOn && (
              <NoticeModal />
            )}
            <button onClick={openStatus}>
              <ProfileImg src="/img/mango.jpg" alt="프로필 사진" />
            </button>
            {statusON && (
            <StatusModal />
            )}
          </ProfileBox>
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
  border-bottom: 3px solid #C1C1C1;
`
// 검색창 
const SearchBox = styled.form`
  display: flex;
  align-items: center;
  width: 360px;
`
const SearchBtn = styled.button`
  position: relative;
  z-index: 99;
  width: 40px;
  height: 40px;
  border-radius: 6px;
`
const CloseBtn = styled.button`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  margin-left: 321px;
`
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
`

const Logo = styled.img`
  width: 180px;
`
const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 220px;
`

const Btn = styled.a`
  width: 100px;
  height: 45px;
  border: 0.5px solid #b6b6b6;
  border-radius: 6px;
  text-align: center;
  line-height: 45px;
  background-color: ${props => props.color};
  color: ${props => props.font};
`

const ProfileBox = styled.div`
  display: flex;
  justify-content:right;
  width: 360px;
`
const NoticeImg = styled.img`
  width: 40px;
  height: 40px;
`
const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
`