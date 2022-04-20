import React from "react";
import HeaderSignin from "../header/Header";
import MyWorkbook from "./MyWorkbook";
import WorkbookContent from "./WorkbookContent";
import styled from "styled-components";

export default function MyPageContent() {
  return (
    <>
      <HeaderSignin />
      <Section>
        <MyWorkbook />
        <WorkbookContent />
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
