import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { COLORS, API } from "../../constants/index";

export default function MyWorkbook() {
  const username = sessionStorage.getItem("user");

  const [userInfo, setUserInfo] = useState([
    {
      email: "",
      id: "",
      name: "",
      password: "",
      username: "",
      image: "",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const Mypageinfo = async () => {
    setLoading(true);
    const res = await axios.get(`${API}/user/${username}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setUserInfo(res.data);
  };

  useEffect(() => {
    Mypageinfo();
    return () => {
      setLoading(true);
    };
  }, []);

  return (
    <>
      <Article>
        <Profile>
          <div className="img">
            <ProfileImage src={userInfo.image} alt="profile"></ProfileImage>
          </div>

          <Info>
            <div className="info">
              <Name>{userInfo.name}</Name>
              {/* <Link to="/profile" state={{ userInfo: userInfo }}>
                <InfoImg src="/img/profileupdate.png"></InfoImg>
              </Link> */}
            </div>
            <Email>{userInfo.email}</Email>
          </Info>
        </Profile>

        <Workbook>
          <ul>
            <WorkbookLi>
              <WorkbookImg src="/img/vector_white.svg" alt="문제집" />
              <WorkbookP>나의 문제집</WorkbookP>
            </WorkbookLi>

            <WorkbookLi>
              <Link to="/sharepage" state={{ userid: userInfo.id }}>
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
  @media (max-width: 420px) {
    flex-basis: 0%;
  }
`;

const Profile = styled.div`
  display: flex;
  @media (max-width: 1370px) {
    flex-direction: column;
    gap: 20px;
  }
  @media (max-width: 420px) {
    display: none;
  }
  .img {
    display: flex;
    margin-left: 2em;
  }
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border: 0.5px solid ${COLORS.light_gray};
  border-radius: 10px;
  box-sizing: border-box;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 4px;
  margin-left: 2em;
  .info {
    display: flex;
    justify-content: start;
    align-items: center;
    margin: 0 auto;
    width: 100%;
  }
`;

const InfoImg = styled.img`
  margin-left: 0.7em;
  width: 17px;
  height: 17px;
  line-height: 1rem;
  cursor: pointer;
`;

const Name = styled.p`
  color: ${COLORS.text_gray};
  font-size: 1.3rem;
  font-weight: 700;
`;

const Email = styled.p`
  color: ${COLORS.gray};
  font-family: "Noto Sans KR";
  font-size: 14px;
`;

const Workbook = styled.div`
  margin-top: 30px;
  min-width: 250px;
  @media (max-width: 420px) {
    position: absolute;
    top: 60px;
    width: 100px;
    z-index: 20;
  }
`;

const WorkbookLi = styled.li`
  a {
    display: flex;
  }
  display: flex;
  align-items: center;
  padding: 0.7em 2em;
  margin-top: 1em;
  width: 160px;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  cursor: pointer;

  &:first-child {
    background-color: ${COLORS.blue};
    p {
      color: white;
    }
  }
  @media (max-width: 420px) {
    padding: 5px 15px;
    margin-top: 5px;
    width: 100px;
    font-size: 14px;
    transition: all 0.3s;
  }
`;

const WorkbookImg = styled.img`
  width: 1.1rem;
  height: 1.1rem;
  @media (max-width: 420px) {
    display: none;
  }
`;

const WorkbookP = styled.p`
  margin-left: 1em;
  color: ${COLORS.gray};
`;
