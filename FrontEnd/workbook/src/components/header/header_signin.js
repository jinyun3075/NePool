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
          <h1><a href="#"><Logo src="/img/logo.svg" alt="로고" /></a></h1>
          {/* <BtnBox>
            <Btn color="#2f80ed" font="white">로그인</Btn>
            <Btn>회원가입</Btn>
          </BtnBox> */}
          <ProfileBox>
            <button>
              <img src="/img/notice.svg" alt="알림" />
            </button>
            <NoticeBox>
              <ul>
                <Notice>
                  <p>2022년 2월 28일 03:53</p>
                  <p>sung2 님이 '정처기 문제집 1'을 스크랩했습니다.</p>
                </Notice>
                <Notice>
                  <p>2022년 2월 28일 03:53</p>
                  <p>sung2 님이 '정처기 문제집 1'을 스크랩했습니다.</p>
                </Notice>
              </ul>
            </NoticeBox>
            <button className="profile">
              <ProfileImg src="/img/mango.jpg" alt="프로필 사진" />
            </button>
          </ProfileBox>
          <ProfileStatus>
            <StatusBox>
              <StatusImg><img src="/img/mango.jpg" alt="프로필 사진" /></StatusImg>
              <StatusProfile>
                <p>망고님</p>
                <button>프로필 변경하기</button>
              </StatusProfile>
            </StatusBox>
             <StatusMenu>
                <a href="#">마이페이지</a>
                <a href="#">로그아웃</a>
             </StatusMenu>
          </ProfileStatus>
        </HeaderWrap>
      </header>
    </>
  );
}

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 200px;
`

const SearchBox = styled.div`
   display: flex;
   align-items: center;
   width: 220px;
   button {
    width: 40px;
    height: 40px;
    border: 0.5px solid #b6b6b6;
    border-radius: 6px;
   }
`
const Logo = styled.img`
  width: 224px;
  height: 77.5px;
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
//알림창 
const NoticeBox = styled.div`
  display: none;
  position: absolute;
  width:  500px;
  height: 200px;
  border: 1px solid #b6b6b6;
  border-radius: 6px;
  color: #767676;
  top: 100px;
  right: 258px;
`
const Notice = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  height: 100px;
  margin-left: 20px;
  &::after {
    position: absolute;
    content:"";
    width: 500px;
    border-top: 1px solid #f5f5f5;
    top: 100px;
    right: 0px;
  }
`
//프로필 상태창
const ProfileStatus = styled.div`
  display: none;
  position: absolute;
  width:  280px;
  height: 220px;
  border: 1px solid #b6b6b6;
  border-radius: 6px;
  top: 100px;
  right: 90px;
`
const StatusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 110px;
  padding: 0 25px;
  border-bottom: 1px solid #f5f5f5;
`
const StatusImg = styled.div`
  img {
    width: 73px;
    height: 73px;
    border-radius: 6px;
  }
`
const StatusProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 110px;
  p {
    margin-bottom: 7px;
    font-size: 16px;
    font-weight: 400;
    color: #767676;
  }
  button {
    padding: 0;
    font-size: 14px;
    font-weight: 400;
    color: #2f80ed;
  }
`
const StatusMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 110px;
  a {
    color: #767676;
  }
`