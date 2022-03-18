import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants/index";
import Left from "../mypage/left";
import Contents from "./contents";

export default function Frame() {
  return (
    <>
      <Section>
        <Left />
        <Article>
          <Myworkbook>
            <p>나의 문제집</p>
          </Myworkbook>
          <Contents />
        </Article>
      </Section>
    </>
  );
}

const Section = styled.article`
  width: 100%;
  height: 79vh;
  margin-top: 80px;
  display: flex;
`;
const Article = styled.article`
    position:relative;
    margin:0 auto;
    border:3px solid ${COLORS.light_gray};
    border-radius:15px;
    flex-basis:70%;
`
const Myworkbook = styled.div`
    border-bottom: 3px solid ${COLORS.light_gray};
    height:7%;
    p{
        font-size:1.1rem;
        font-weight: 700;
        line-height:3rem;
        margin-left:20px;
    }
`;