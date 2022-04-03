import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HeaderSignin from '../header/header';
import Myshared from './myshared';
import ShareLeft from './shareleft';

export default function Share_page() {
  const location = useLocation()
  const userid = location.state.userid

  return (
    <>
      <HeaderSignin />
      <Section>
        <ShareLeft />
        <Myshared userid = {userid} />
      </Section>
    </>
    )
} 


const Section = styled.article`
    width:100%;
    height:79vh;
    margin-top:80px;
    display:flex;
`;

