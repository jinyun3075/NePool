import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants/index';

export default function CreateModal(props){

    return(
        <>
            <Modal>
                <ImgDiv>
                    <img onClick = { ()=>{props.setCreate(props.create === false)} } src ="./img/x.svg" alt = "x"></img>
                </ImgDiv>

                <InputLabel>
                    <Input type="file" id ="input"/>
                    <Label htmlFor="input"><img src ="./img/+.svg"></img></Label>
                </InputLabel>

                <TextSelect>
                    <TextInput placeholder ="문제집 이름" type="text"></TextInput>
                    <Select name="workbooks">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </Select>
                </TextSelect>

                <Create>문제집 생성</Create>
 
            </Modal>
        </>
    )
} 

const Modal = styled.form`
    padding:1em;
    position:absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    z-index:2;
    width:25%;
    height:70%;
    border-radius:8px;
    border:1px solid ${COLORS.light_gray};
    background-color: white;
`;

const ImgDiv = styled.div`
    display:flex;
    justify-content: end; 
    img{
        cursor:pointer;
        width:16px;
        height:16px;
    }
`

const InputLabel = styled.div`
    position:relative;
    display:flex;
    justify-content: center;
    align-items:center;
    width:50%;
    height:50%;
    margin-top:20px auto;
    border:1px solid ${COLORS.light_gray};
    border-radius:15px;
    margin-top:1em;
    margin-left:auto;
    margin-right:auto;
`;

const Input = styled.input`
    display:none;
    width:100%;
    height:100;
`;

const Label = styled.label`
    cursor:pointer;
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    color:${COLORS.light_gray};
    img{
        width:20%;
        height:20%;
    }
`;

const TextSelect = styled.div`
    height:30%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
`;

const TextInput = styled.input`
    margin-top:36px;
    width:70%;
    height:45px;
    border-radius:5px;
    border-color: ${COLORS.light_gray};
`;

const Select = styled.select`
    margin-top:20px;
    width:73%;
    height:45px;
    border-color: ${COLORS.light_gray};
    border-radius:5px;
`;

const Create = styled.p`
    cursor:pointer;
    color:white;
    line-height:2.5rem;
    margin: 0 auto;
    margin-top:30px;
    text-align:center;
    border-radius:5px;
    width:90%;
    height:8%;
    background-color: ${COLORS.blue};
`;