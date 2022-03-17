import React from 'react';
import styled from 'styled-components';
import HeaderSignin from '../header/header';
import Left from './left';
import Right from './right';

export default function My_page() {


  return (
    <>
      <HeaderSignin />

      <Section>
        <Left />
        <Right />
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

