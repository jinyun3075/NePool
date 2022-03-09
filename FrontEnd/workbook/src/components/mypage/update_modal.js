import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';

export default function UpdateModal(props){
    return(
        <> 
            <Ximg onClick ={()=>{ props.setXimg(props.ximg===false); props.setUpdate(props.update===false); console.log(Boolean(props.update)); console.log(Boolean(props.ximg));}} src = "/img/x.svg" alt = "x" />
            <Modal>
                <Try>풀기</Try>
                <Share>공유</Share>
                <Update>수정</Update>
            </Modal>
        </>
    )
}

const Ximg = styled.img`
    position:absolute;
    top:5%;
    right:5%;
    width:15px;
    height:15px;
    z-index:2;
`;

const Modal = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    z-index:5;
    background-color: white;
    width:60%;
    height:50%;
    border-radius:5px;
    margin:0 auto;
`;

const Try = styled.button`
    background-color: ${COLORS.blue};
    border-radius:5px;
    color:white;
    width:50%;
    height:27%;
    margin-bottom:5px;
`;

const Share = styled.button`
    border-radius:5px;
    background-color: ${COLORS.blue};
    color:white;
    width:50%;
    height:27%;
    margin-bottom:5px;
`;

const Update = styled.button`
    background-color: transparent;
    border: 1px solid ${COLORS.light_gray};
    border-radius:5px;
    width:50%;
    height:27%;
`;