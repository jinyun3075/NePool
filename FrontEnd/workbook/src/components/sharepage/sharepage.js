import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderSignin from "../header/Header";
import ShareMyworkbook from "./ShareMyWorkbook";
import ShareContent from "./ShareContent";
import styled from "styled-components";

export default function SharePage() {
  const token = sessionStorage.getItem("token");

  const location = useLocation();
  const userid = location.state.userid;

  const navigate = useNavigate()

  useEffect(() => {
    if(!token) {
      navigate("/",  { replace: true })
    }
  }, [])

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
  @media (max-width: 420px) { 
    border: none;
    margin: 30px 0;
    /* min-width: 340px; */
  }
`;
