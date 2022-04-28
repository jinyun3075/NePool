import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

export default function NoticeModal({ noticeOn }) {
  return (
    <>
      {noticeOn ? (
        <NoticeBox>
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
        </NoticeBox>
      ) : null}
    </>
  );
}

const NoticeBox = styled.div`
  position: absolute;
  width: 500px;
  margin: 46px 60px 0 0;
  z-index: 100;
  @media (max-width: 860px) {
    width: 350px;
  }
  @media (max-width: 520px) {
    width: 280px;
  }
  ul {
    width: 500px;
    height: 200px;
    border: 1px solid ${COLORS.light_gray};
    border-radius: 6px;
    background-color: white;
    color: ${COLORS.gray};
    @media (max-width: 860px) {
      width: 350px;
  }
    @media (max-width: 520px) {
      width: 280px;
  }
  }
`;

const NoticeCont = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  margin-left: 20px;
  height: 100px;
  @media (max-width: 520px) {
    margin: 0 20px;
  }
  &::after {
    position: absolute;
    content: "";
    top: 100px;
    right: -1px;
    width: 500px;
    border-top: 1px solid ${COLORS.white_gray};
    @media (max-width: 860px) {
    width: 350px;
  }
    @media (max-width: 520px) {
    width: 280px;
  }
  }
`;
