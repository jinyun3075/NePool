import { useLocation } from "react-router-dom";
import HeaderSignin from "../header/Header";
import AddCont from "./addContent";
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
  width: 100%;
  height: 79vh;
  margin-top: 80px;
  display: flex;
`;
