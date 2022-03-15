import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants';

export default function UpdateModal(props){

    return(
        <> 
            <Ximg onClick = { ()=>{props.setDeletemodal(true); props.setModemodal(false);}} src = "/img/x.svg" alt = "x" />
            <Modal>
                <Try onClick = { ()=>{props.setModemodal(true); props.setDeletemodal(false);} }>풀기</Try>
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
    cursor:pointer;
`;

const Modal = styled.div`
    margin:0 auto;
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    margin-top:15px;
    background-color: rgba(255,255,255,0.5);
    width:60%;
    height:55%;
    border-radius:10px;
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