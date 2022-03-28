import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../../constants';

export default function UpdateModal(props){
    return(
        <> 
            <Modal className="updatemodal">
                <Try onClick = { ()=>{props.setModemodal(true); props.setDeletemodal(false);} }>풀기</Try>
                <Update><Link to='/update'>수정</Link></Update>
                <Delete onClick = { ()=>{props.setDeletemodal(true); props.setModemodal(false);}} >삭제</Delete>
            </Modal>
        </>
    )
}


const Modal = styled.div`
    z-index:2;
    box-sizing: border-box;
    position:absolute;
    bottom:0;
    left:0;
    margin:0 auto;
    display:flex;
    justify-content: space-evenly;
    align-items: center;
    margin-top:15px;
    background-color: rgba(255,255,255);
    width:100%;
    height:20%;
    border:1px solid ${COLORS.light_gray};
    border-bottom-left-radius:6px;
    border-bottom-right-radius:6px;

`;

const Try = styled.button`
    background-color: ${COLORS.blue};
    color:white;
    width:27%;
    height:40%;

`;

const Delete = styled.button`
    background-color: ${COLORS.blue};
    color:white;
    width:27%;
    height:40%;
`;

const Update = styled.button`
    color:white;
    background-color: ${COLORS.blue};
    border: 1px solid ${COLORS.light_gray};
    width:27%;
    height:40%;
`;