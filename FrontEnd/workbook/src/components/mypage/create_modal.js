import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS, API } from '../../constants/index';
import axios from 'axios';

export default function CreateModal(props){
    const [createname, setCreatename] = useState("")
    const [createtitle, setCreatetitle] = useState("")
    const [createcontent, setCreatecontent] = useState("")
    const [createtype, setCreatetype] = useState("정보처리기사")
    const Workbook  = async() =>{
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user')
        const res = await axios.post(`${API}/workbook/register`,{
            username: username,
            title:createtitle,
            content:createcontent,
            type:createtype,
        },{
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${token}`,
            },
        })

        console.log(res);
        window.location.reload()
    }

    function Change(e){ 
        const {
            target:{name,value}
        } = e
        if(name === 'title'){
            setCreatetitle(value)
        }
        else if(name ==='content'){
            setCreatecontent(value)
        }
        else if(name ==='type'){
            setCreatetype(value)
        }
    }


    return(
        <>
            <Modal action ={`${API}/workbook`} method = "POST" onSubmit={function(e){
                e.preventDefault();
            }.bind(this)}>
                <ImgDiv>
                    <img onClick = { ()=>{props.setCreate(props.create === false)} } src ="./img/x.svg" alt = "x"></img>
                </ImgDiv>

                <InputLabel>
                    <Input type="file" id ="input"/>
                    <Label htmlFor="input"><img src ="./img/+.svg"></img></Label>
                </InputLabel>

                <TextSelect>
                    <TextInput onChange = { Change } value = {createtitle} name = "title" placeholder ="문제집 이름" type="text"></TextInput>
                    <Select defaultValue = "정보처리기사" onChange = { Change } value = {createtype} name="type">
                        <option value="정보처리기사">정보처리기사</option>
                        <option value="YBMCOS">YBM COS</option>
                        <option value="웹디자인 기능사">웹디자인 기능사</option>
                        <option value="리눅스 마스터">리눅스 마스터</option>
                        <option value="TOPCIT">TOPCIT</option>
                        <option value="CCTS">CCTS</option>
                        <option value="CLA">CLA</option>
                    </Select>
                    <Explain onChange = { Change } value = {createcontent} name="content" rows="5" placeholder='문제집 설명'></Explain>
                </TextSelect>

                <Create onClick = {Workbook}>문제집 생성</Create>
 
            </Modal>
        </>
    )
} 

const Modal = styled.form`
    box-sizing:border-box;
    padding:1em;
    position:absolute;
    top:52%;
    left:50%;
    transform: translate(-50%,-50%);
    z-index:2;
    width:35%;
    height:85%;
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
    height:40%;
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
    height:40%;
    margin: 0 auto;
    width:75%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
`;

const TextInput = styled.input`
    margin-top:36px;
    width:97%;
    height:20%;
    border-radius:5px;
    border: 1px solid ${COLORS.light_gray};
    &:focus{
        border-color: ${COLORS.blue};
    }
`;

const Select = styled.select`
    margin-top:20px;
    width:100%;
    height:20%;
    color: ${COLORS.light_gray};
    border-color: ${COLORS.light_gray};
    border-radius:5px;
`;

const Explain = styled.textarea`
    padding:3%;
    width:93%;
    border-color: ${COLORS.light_gray};
    border-radius:5px;
    margin-top:20px;
    resize: none;
    z-index: 100;
`;

const Create = styled.button`
    display: block;
    cursor:pointer;
    color:white;
    line-height:2.5rem;
    margin: 0 auto;
    margin-top:20px;
    text-align:center;
    border-radius:5px;
    width:90%;
    height:8%;
    background-color: ${COLORS.blue};
`;