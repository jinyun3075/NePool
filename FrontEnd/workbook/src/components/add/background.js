import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants/index";
import AddCont from "./addContent";

export default function Background() {
  return (
    <>
      <Section>
        <Left>
          <Profile>
            <div>
              <ProfileImage src="/img/mango.jpg" alt="profile"></ProfileImage>
            </div>

            <Info>
              <div>
                <Name>정시찬님</Name>
                <InfoImg src="/img/profileupdate.png"></InfoImg>
              </div>
              <Email>123@naver.com</Email>
            </Info>
          </Profile>

          <Workbook>
            <ul>
              <WorkbookLi>
                <WorkbookImg src="/img/vector.svg" alt="문제집"></WorkbookImg>
                <WorkbookP>나의 문제집</WorkbookP>
              </WorkbookLi>

              <WorkbookLi>
                <WorkbookImg src="/img/vector.svg" alt="문제집"></WorkbookImg>
                <WorkbookP>문제집 만들기</WorkbookP>
              </WorkbookLi>

              <WorkbookLi>
                <WorkbookImg src="/img/vector.svg" alt="문제집"></WorkbookImg>
                <WorkbookP>공유 문제집</WorkbookP>
              </WorkbookLi>

              <WorkbookLi>
                <WorkbookImg src="/img/vector.svg" alt="문제집"></WorkbookImg>
                <WorkbookP>공유 문제집</WorkbookP>
              </WorkbookLi>
            </ul>
          </Workbook>
        </Left>
      <AddCont />
      </Section>
    </>
  );
}

const MakeBox = styled.form`
  display: flex;
  justify-content: space-around;
  margin: 50px 0px;

`;
const Input = styled.input`
  width: 450px;
  height: 40px;
  color: ${COLORS.black};
  margin-bottom: 22px;
  border: none;
  border-bottom: 1px solid ${COLORS.light_gray};
  background: none;
  &::placeholder {
    color: #767676;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid ${COLORS.blue};
  }
`;
const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 525px;
  div{
      margin: 20px 0 40px;
  }
`
const RightBox = styled.div`
  /* display: flex; */
  
`
const InputNum = styled.input`
  display: block;
  width: 368px;
  height: 40px;
  color: ${COLORS.black};
  margin: 14px 0 12px;
  padding: 3px 16px;
  border: 2px solid ${COLORS.light_gray};
  border-radius: 5px;
  background: none;
  &::placeholder {
    color: #767676;
  }
  &:focus {
    outline: none;
    border: 1px solid ${COLORS.blue};
  }
`
const InputTxt = styled.textarea`
  display: block;
  width: 450px;
  height: 479px;
  color: ${COLORS.black};
  /* margin: 14px 0 12px; */
  padding: 10px 10px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 5px;
  background: none;
  resize: none;
  &::placeholder {
    color: #767676;
  }
  &:focus {
    outline: none;
    border: 1px solid ${COLORS.blue};
  }
`
const Btn = styled.button`
  width: 80px;
  height: 40px;
  color: white;
  background-color: ${COLORS.blue};
  border-radius: 6px;
  margin-left: 40px;
`

const Section = styled.article`
  width: 100%;
  height: 800px;
  margin-top: 80px;
  display: flex;
`;

const Left = styled.article`
  flex-basis: 25%;
`;

const Profile = styled.div`
  display: flex;
  div {
    width: 100%;
    margin-left: 2em;
    display: flex;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const Info = styled.div`
  margin-left: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  div {
    margin: 0 auto;
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
  }
`;

const InfoImg = styled.img`
  width: 1.1rem;
  height: 1.1rem;
  margin-left: 0.7em;
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
  cursor: pointer;
  margin-top: 30px;
`;

const WorkbookLi = styled.li`
  margin-top: 1.5em;
  padding: 0.5em 3em;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  width: 45%;
  display: flex;
  align-items: center;

  &:nth-child(4) {
    margin-top: 4em;
    position: relative;
    &:before {
      position: absolute;
      top: -30px;
      width: 80%;
      content: "";
      height: 0.5px;
      background-color: ${COLORS.gray};
    }
  }

  &:hover {
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
  color: gray;
`;

const WorkbookP = styled.p`
  color: ${COLORS.gray};
  margin-left: 1em;
`;