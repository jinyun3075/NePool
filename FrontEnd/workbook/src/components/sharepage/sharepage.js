import React from "react";
import { useLocation } from "react-router-dom";
import HeaderSignin from "../header/Header";
import ShareMyworkbook from "./ShareMyWorkbook";
import ShareContent from "./ShareContent";
import styled from "styled-components";

export default function SharePage() {
  const location = useLocation();
  const userid = location.state.userid;

  return (
    <>
      <HeaderSignin />
      <Section>
        <ShareMyworkbook />
        <ShareContent userid={userid} />
      </Section>
    </>
  );
}

const Section = styled.article`
  display: flex;
  margin-top: 80px;
  width: 100%;
  height: 79vh;
`;
