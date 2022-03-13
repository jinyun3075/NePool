import React from "react";
import styled from "styled-components";

export default function StatusModal() {
  return (
    <>
      <ProfileStatus>
        <StatusBox>
          <StatusImg>
            <img src="/img/mango.jpg" alt="프로필 사진" />
          </StatusImg>
          <StatusProfile>
            <p>망고</p>
            <button>프로필 변경하기</button>
          </StatusProfile>
        </StatusBox>
        <StatusMenu>
          <a href="#">마이페이지</a>
          <a href="#">로그아웃</a>
        </StatusMenu>
      </ProfileStatus>
    </>
  );
}

const ProfileStatus = styled.div`
  /* display: none; */
  position: absolute;
  width:  280px;
  height: 220px;
  border: 1px solid #b6b6b6;
  border-radius: 6px;
  background-color: white;
  margin-top: 46px;
  margin-right: 5px;
}
`
const StatusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 110px;
  padding: 0 25px;
  border-bottom: 1px solid #f5f5f5;
`;
const StatusImg = styled.div`
  img {
    width: 73px;
    height: 73px;
    border-radius: 6px;
  }
`;
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
`;
const StatusMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 110px;
  a {
    color: #767676;
  }
`;
