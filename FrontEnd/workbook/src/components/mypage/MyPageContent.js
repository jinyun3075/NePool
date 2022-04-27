import React, { useEffect } from "react";
import HeaderSignin from "../header/Header";
import MyWorkbook from "./MyWorkbook";
import WorkbookContent from "./WorkbookContent";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function MyPageContent() {
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, []);

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
  @media (max-width: 420px) {
    margin: 30px 0;
    border: none;
  }
`;
