import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants";

export default function StatusModal() {
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
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <>
      <ProfileStatus>
        <StatusBox>
          <StatusImg>
            <img src={userName.image} alt="프로필 사진" />
          </StatusImg>
          <StatusProfile>
            <p>{userName.name}</p>
           <Link to="/profile" state={{userInfo : userName}}> <button>프로필 변경하기</button></Link>
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
  position: absolute;
  margin-top: 46px;
  margin-right: 5px;
  width: 280px;
  height: 220px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 6px;
  background-color: white;
  z-index: 99;
`;

const StatusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 25px;
  height: 110px;
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
    color: ${COLORS.gray};
    font-size: 16px;
    font-weight: 400;
  }
  button {
    padding: 0;
    color: ${COLORS.blue};
    font-size: 14px;
    font-weight: 400;
  }
`;

const StatusMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 110px;
  a {
    color: ${COLORS.gray};
    cursor: pointer;
  }
`;
