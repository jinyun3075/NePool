import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API } from "../../constants";
import { Link, useNavigate } from 'react-router-dom';

export default function StatusModal() {

  const navigate = useNavigate()
  
  const [userName, setUserName] = useState("");

  const getUser = async () => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    // console.log(token);
    // console.log(user);
    const res = await axios.get(`${API}/user/${user}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    setUserName(res.data.name);
    // console.log(res);
  };

  const logout = () => {
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("token")
    window.location.reload()
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <ProfileStatus>
        <StatusBox>
          <StatusImg>
            <img src="/img/mango.jpg" alt="프로필 사진" />
          </StatusImg>
          <StatusProfile>
            <p>{userName}</p>
            <button>프로필 변경하기</button>
          </StatusProfile>
        </StatusBox>
        <StatusMenu>
          <a href="/mypage">마이페이지</a>
          <a onClick={logout}>로그아웃</a>
        </StatusMenu>
      </ProfileStatus>
    </>
  );
}

const ProfileStatus = styled.div`
  z-index: 99;
  position: absolute;
  width:  280px;
  height: 220px;
  border: 1px solid #b6b6b6;
  border-radius: 6px;
  background-color: white;
  margin-top: 46px;
  margin-right: 5px;
`;
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
    cursor: pointer;
  }
`;
