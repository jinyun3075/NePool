import React from "react";
import styled from "styled-components";

export default function NoticeModal() {
  return (
    <>
      <NoticeBox>
        <div>
          <ul>
            <NoticeCont>
              <p>2022년 2월 28일 03:53</p>
              <p>sung2 님이 '정처기 문제집 1'을 스크랩했습니다.</p>
            </NoticeCont>
            <NoticeCont>
              <p>2022년 2월 28일 03:53</p>
              <p>sung2 님이 '정처기 문제집 1'을 스크랩했습니다.</p>
            </NoticeCont>
          </ul>
        </div>
      </NoticeBox>
    </>
  );
}

const NoticeBox = styled.div`
  z-index: 99;
  position: absolute;
  width: 500px;
  margin-top: 46px;
  margin-right: 60px;
  div {
    width: 500px;
    height: 200px;
    border: 1px solid #b6b6b6;
    border-radius: 6px;
    color: #767676;
    background-color: white;
  }
`;
const NoticeCont = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  height: 100px;
  margin-left: 20px;
  &::after {
    position: absolute;
    content: "";
    width: 500px;
    border-top: 1px solid #f5f5f5;
    top: 100px;
    right: -1px;
  }
`;
