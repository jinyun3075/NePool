import { useLocation } from "react-router-dom";
import HeaderSignin from "../header/Header";
import AddCont from "./AddContent";
import MyWorkbook from "../mypage/MyWorkbook";
import styled from "styled-components";

export default function Add() {
  const location = useLocation();
  const workbookid = location.state.workbookid;

  return (
    <>
      <HeaderSignin />
      <Section>
        <MyWorkbook />
        <AddCont workbookid={workbookid} />
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
