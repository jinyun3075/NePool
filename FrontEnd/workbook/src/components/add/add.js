import { useLocation } from 'react-router-dom';
import HeaderSignin from "../header/header";
import Left from '../mypage/left';
import styled from 'styled-components';
import AddCont from './addContent';

export default function Add() {
  const location = useLocation()
  const workbookid = location.state.workbookid
    return (
      <>
        <HeaderSignin />
        <Section>
          <Left />
          <AddCont workbookid={workbookid}/>
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
