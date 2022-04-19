import { useLocation } from "react-router-dom";
import HeaderSignin from "../header/header";
import UpdateCont from "./updateContent";
import styled from "styled-components";
import MyWorkbook from "../mypage/myworkbook";

export default function UpdateQuestion({ workbookid, workid }) {
  return (
    <>
      <HeaderSignin />
      <Section>
        <MyWorkbook />
        <UpdateCont workbookid={workbookid} workid={workid} />
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
