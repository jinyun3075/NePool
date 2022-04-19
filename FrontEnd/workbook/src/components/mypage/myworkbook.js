import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COLORS, API } from "../../constants/index";
import styled from "styled-components";
import axios from "axios";

export default function MyWorkbook() {
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("user");

  const [userinfo, setUserinfo] = useState([
    {
      email: "",
      id: "",
      name: "",
      password: "",
      username: "",
      image: "",
    },
  ]);

  const Mypageinfo = async () => {
    const res = await axios.get(`${API}/user/${username}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setUserinfo(res.data);
  };

  useEffect(() => {
    Mypageinfo();
  }, []);

  return (
    <>
      <Article>
        <Profile>
          <div>
            <ProfileImage src={userinfo.image} alt="profile"></ProfileImage>
          </div>

          <Info>
            <div>
              <Name>{userinfo.name}</Name>
              <InfoImg src="/img/profileupdate.png"></InfoImg>
            </div>
            <Email>{userinfo.email}</Email>
          </Info>
        </Profile>

        <Workbook>
          <ul>
            <WorkbookLi>
              <WorkbookImg src="/img/vector_white.svg" alt="문제집" />
              <WorkbookP>나의 문제집</WorkbookP>
            </WorkbookLi>

            <WorkbookLi>
              <Link to="/sharepage" state={{ userid: userinfo.id }}>
                <WorkbookImg src="/img/vector_gray.svg" alt="문제집" />
                <WorkbookP>가져온 문제집</WorkbookP>
              </Link>
            </WorkbookLi>
          </ul>
        </Workbook>
      </Article>
    </>
  );
}

const Article = styled.article`
  flex-basis: 25%;
`;

const Profile = styled.div`
  display: flex;
  div {
    display: flex;
    margin-left: 2em;
    width: 100%;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-left: 3px;
  div {
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 0 auto;
    width: 100%;
  }
`;

const InfoImg = styled.img`
  margin-left: 0.7em;
  width: 1.1rem;
  height: 1.1rem;
  line-height: 1rem;
  cursor: pointer;
`;

const Name = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
`;

const Email = styled.p`
  font-size: 1rem;
`;

const Workbook = styled.div`
  margin-top: 30px;
  cursor: pointer;
`;

const WorkbookLi = styled.li`
  a {
    display: flex;
  }
  display: flex;
  align-items: center;
  padding: 0.5em 3em;
  margin-top: 1.5em;
  width: 45%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;

  &:first-child {
    background-color: ${COLORS.blue};
    .vector path {
      fill: white;
    }
    p {
      color: white;
    }
  }
`;

const WorkbookImg = styled.img`
  width: 1.1rem;
  height: 1.1rem;
  path {
    fill: #fff;
  }
`;

const WorkbookP = styled.p`
  margin-left: 1em;
  color: ${COLORS.gray};
`;
