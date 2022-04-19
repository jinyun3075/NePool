import React from "react";
import HeaderSignin from "../header/header";
import WorkbookContent from "./workbookcontent";
import styled from "styled-components";
import MyWorkbook from "./myworkbook";

export default function My_page() {
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
