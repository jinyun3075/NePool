import { useLocation } from 'react-router-dom';
import HeaderSignin from "../header/header";
import Left from '../mypage/left';
import styled from 'styled-components';
import UpdateCont from './updateContent';

export default function UpdateQuestion({workbookid,workid}) {
    
    return (
      <>
        <HeaderSignin />
        <Section>
          <Left />
          <UpdateCont workbookid={workbookid} workid={workid}/>
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
