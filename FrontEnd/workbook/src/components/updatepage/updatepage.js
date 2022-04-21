import React from "react";
import HeaderSignin from "../header/header";
import MyWorkbook from "../mypage/MyWorkbook";
import UpdatepageContent from "./UpdatePageContent";
import styled from "styled-components";

export default function UpdatePage() {
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
