import React from "react";
import HeaderSignin from "../header/header";
import styled from "styled-components";
import MyWorkbook from "../mypage/MyWorkbook";
import UpdatepageContent from "./updatepage_content";

export default function Update_page() {
  return (
    <>
      <HeaderSignin />
      <Section>
        <MyWorkbook />
        <UpdatepageContent />
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
