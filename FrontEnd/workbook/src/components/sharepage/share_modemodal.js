import React from 'react';
import { COLORS } from '../../constants/index';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

export default function ShareModeModal(props){
  return(
        <>
            <Modal>
                <ImgDiv>
                    <Img onClick = { ()=>{props.setSharemodemodal(false)} } src="./img/x.svg" alt="x" />
                </ImgDiv>
                <Text>예시 문제집을 푸시겠습니까?</Text>
                <BtnDiv>
                    <StudyMode><Link to ={`/studymode/${props.workbookid}`} state={{username: props.username}}>공부모드</Link></StudyMode>
                    <TestMode><Link to ={`/studymode/${props.workbookid}`} state={{username: props.username}}>시험모드</Link></TestMode>
                </BtnDiv>
            </Modal>
        </>
    )
} 


const Modal = styled.div`   
    position:absolute;
    top:50%;
    left:50%;
    width:30%;
    height:26%;
    transform:translate(-50%,-50%);
    border-radius: 5px;
    z-index:2;
    border:1px solid ${COLORS.light_gray};
    padding:0 1em;
    background-color: #fff;
`;

const ImgDiv = styled.div`
    display:flex;
    justify-content:end;
    border-bottom:none;
    margin-top:1em;
    margin-bottom:1em;
`;

const Img = styled.img`
    pointer-events: auto;
    cursor:pointer;
    width:14px;
    height:14px;
`;

const Text = styled.p`
    margin-top:1em;
    font-weight: 700;
    text-align:center;
    font-size:1rem;
    color: black;
`;


const BtnDiv = styled.div`
    margin-top:1em;
    display:flex;
    justify-content:center;
`;

const StudyMode = styled.div`
    cursor:pointer;
    width:28%;  
    height:2.5em;
    text-align:center;
    font-size:1rem;
    border-radius:5px;
    line-height:2.5rem;
    margin-right:0.3em;
    color:${COLORS.gray};
    border:1px solid ${COLORS.light_gray};
`;

const TestMode = styled.div`
    cursor:pointer;
    width:28%;
    height:2.5em;
    text-align:center;
    font-size:1rem;
    border-radius:5px;
    line-height:2.5rem;
    margin-left:0.3em;
    color:#fff;
    background-color:${COLORS.blue};
`;