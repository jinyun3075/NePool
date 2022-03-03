import React from 'react';
import styled from 'styled-components';

export default function HeaderSignin() {
  return (
    <>
      <header>
        <HeaderWrap>
          <SearchBox>
            <button>
              <img src="/img/search.svg" alt="돋보기" />
            </button>
          </SearchBox>
          <h1><a href="#"><img src="/img/logo.svg" alt="로고" /></a></h1>
          {/* <BtnBox>
            <Btn color='#2f80ed' font='white'>로그인</Btn>
            <Btn>회원가입</Btn>
          </BtnBox> */}
          <ProfileBox>
            <button className="notice">
              <img src="/img/notice.svg" alt="알림" />
            </button>
            <button className="profile">
              <ProfileImg src="/img/mango.jpg" alt="프로필 사진" />
            </button>
          </ProfileBox>
        </HeaderWrap>
      </header>
    </>
  );
}

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
`

const SearchBox = styled.div`
   width: 220px;
   button {
    width: 40px;
    height: 40px;
    border: 0.5px solid #b6b6b6;
    border-radius: 6px;
   }
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
  width: 220px;
`
const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 6px;
`