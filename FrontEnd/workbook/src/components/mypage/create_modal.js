import React, { useState } from 'react';
import styled from 'styled-components';
import { COLORS, API } from '../../constants/index';
import axios from 'axios';

export default function CreateModal(props){
    const [imageurl,setImageurl] = useState('');

    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('user')

    const [postworkbook,setPostworkbook] = useState(
        {
            username:username,
            title:'',
            content:'',
            type:'수능·내신',
        }
    )

    const Change = (e) =>{
        setPostworkbook({...postworkbook,[e.target.name]: e.target.value})
    }

    // 문제집 생성 API (Post)
    const Workbook  = async () =>{    
        console.log(imageurl)
        const res = await axios.post(`${API}/workbook/register`,{
            username: postworkbook.username,
            title:postworkbook.title,
            content:postworkbook.content,
            type:postworkbook.type,
            image:imageurl
        },{
            headers: {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${token}`,
            },
        })
        window.location.reload()
        console.log(res.data)
    }


    // 이미지 업로드 API
    const ChangeImg = async (e) =>{
        const uploadFiles = e.target.files[0]
        console.log(uploadFiles)
        const formData = new FormData()
        formData.append('uploadFiles',uploadFiles)
        
        const ress = await axios.post(`${API}/upload`,    
            formData,
            {
                headers: {
                    'Content-type' : 'multipart/form-data',
                    Authorization : `Bearer ${token}`,
                },
            }
        )
        console.log(ress)
        setImageurl(ress.data[0].imageUrl)
    }
    

    return(
        <>
            <Modal onSubmit={function(e){
                e.preventDefault();
            }.bind(this)}>
                <ImgDiv>
                    <img onClick = { ()=>{props.setCreate(props.create === false)} }  src ="./img/x.svg" alt = "x" ></img>
                </ImgDiv>

                <InputLabel> 
                    <Input type="file" id ="input" name = "image"  onChange = {ChangeImg} />
                    <Label htmlFor="input"><img src ="./img/+.svg"></img></Label>
                </InputLabel>

                <TextSelect>
                    <TextInput onChange = { Change } name = "title" value = {postworkbook.title} placeholder ="문제집 이름" type="text"></TextInput>
                    <Select defaultValue ="수능·내신" onChange = { Change } name="type" value = {postworkbook.type} >
                        <option value="수능·내신">수능·내신</option>
                        <option value="어학">어학</option>
                        <option value="자격증">자격증</option>
                        <option value="시사·상식">시사·상식</option>
                        <option value="기타">기타</option>
                    </Select>
                    <Explain onChange = { Change } name="content" value = {postworkbook.content} rows="5" placeholder='문제집 설명'></Explain>
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
    z-index:4;
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