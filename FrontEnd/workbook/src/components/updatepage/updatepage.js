import React from 'react';
import styled from 'styled-components';
import HeaderSignin from '../header/header';
import Left from '../mypage/left';
import Updatepage_Right from './updatepage_right';

export default function Update_page() {


  return (
    <>
      <HeaderSignin />

      <Section>
        <Left />
        <Updatepage_Right />
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

