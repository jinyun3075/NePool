import HeaderSignin from "../header/header";
import MyWorkbook from "../mypage/MyWorkbook";
import UpdateCont from "./UpdateContent";
import styled from "styled-components";

export default function UpdateQuestion({ workbookid }) {
  return (
    <>
      <HeaderSignin />
      <Section>
        <MyWorkbook />
        <UpdateCont workbookid={workbookid} />
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
