import React, { useEffect, useState } from 'react';
import { COLORS, API } from '../../constants/index';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import DeleteModal from '../mypage/delete_modal';
import CreateModal from '../mypage/create_modal';
import UpdateModal from '../mypage/update_modal';
import ModeModal from '../mypage/mode_modal';
import axios from 'axios'; 

// array = [{dtoList:[{worbook:hey}]}]

export default function Myshared(props) {
    const userid = props.userid
    let [create, setCreate] = useState(false);
    let [update, setUpdate] = useState(false);
    let [deletemodal, setDeletemodal] = useState(false);
    let [modemodal, setModemodal] = useState(false);
    const [sharedworkbook,setSharedworkbook] = useState([
        {
            dtoList: [
                {
                    workBook: {
                        regDate: "",
                        modDate: "",
                        id: "",
                        title: "",
                        content: "",
                        type: "",
                        share: "",
                        writer: {
                            regDate: "",
                            modDate: "",
                            uno: "",
                            username: "",
                            email: "",
                            name: "",
                            password: ""
                        },
                        count: ""
                    },
                    nePoolUser: {
                        regDate: "",
                        modDate: "",
                        uno: "",
                        username: "",
                        email: "",
                        name: "",
                        password: ""
                    }
                }
    ]}]);

    // const workbook = sharedworkbook.dtoList.workBook
    // const username = sharedworkbook[0].dtoList[0].workBook.writer.username
    
  const ReadShared = async () => {
        const token = sessionStorage.getItem('token')
        const res = await axios.get(`${API}/share/${userid}`,{
            headers:{
                'Content-type' : "application/json",
                Authorization : `Bearer ${token}`
            }}
        );
        console.log(res);
        // console.log(sharedworkbook)
        setSharedworkbook(res.data.dtoList);
    }

    useEffect(() => {
        ReadShared();
    }, []);

    useEffect(() => {
        ReadShared();
    }, [userid]);
    return(
        <>
            <Article>
                {
                    create === true ? <CreateModal create = {create} setCreate = {setCreate} /> : null
                }
                
                <Myworkbook>
                    <p>가져온 문제집</p>
                </Myworkbook>
                

                {/* <Example>
                    {
                        sharedworkbook.map((workbookdata) => {
                            return(
                                    <ExampleLi onClick ={() => { setUpdate(!update) }} key = { workbookdata.workBook.id}> 
                                        <Link to={`/detail/${workbookdata.workBook.id}`} state={{username:workbookdata.workBook.writer.username}}>
                                            <ExampleP1 >{workbookdata.workBook.title}</ExampleP1>
                                            <ExampleP2 >마지막 수정 일시 : {workbookdata.workBook.writer.modDate.substring(0,10)}</ExampleP2>
                                        </Link>
                                        {
                                            update === true ? 
                                            <UpdateModal workbook ={workbookdata} setWorkbook={setSharedworkbook} setDeletemodal = {setDeletemodal} deletemodal = {deletemodal} modemodal = {modemodal} setModemodal = {setModemodal}/>
                                            : null    
                                        }
                                    </ExampleLi>
                            )
                        })
                    }

                    {
                        deletemodal === true ? 
                        <DeleteModal deletemodal = {deletemodal} setDeletemodal ={setDeletemodal}/>
                        :null   
                    }

                    {    
                        modemodal === true ?
                        <ModeModal modemodal = {modemodal} setModemodal = {setModemodal} />
                        :null
                    }

                </Example> */}

                <CreateBtn onClick ={ ()=>{setCreate(create=true);}}>+</CreateBtn>
            </Article>
        </>
    )
}


const Article = styled.article`
    position:relative;
    margin:0 auto;
    border:3px solid ${COLORS.light_gray};
    border-radius:15px;
    flex-basis:70%;
`

const Myworkbook = styled.div`
    border-bottom: 3px solid ${COLORS.light_gray};
    height:7%;
    p{
        font-size:1.1rem;
        font-weight: 700;
        line-height:3rem;
        margin-left:20px;
    }
`;


const Example = styled.ul`
    max-height:85%;
    overflow-x: auto;
    overflow-y: scroll;
    padding:1em 3em;
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 25px;
    &::-webkit-scrollbar{
        width: 6px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: ${COLORS.light_gray};
        border-radius:15px;
    }
    &::-webkit-scrollbar-track{
        background-color: white;
    }
`;

const ExampleLi = styled.li`
        cursor:pointer;
        margin-top:20px;
        margin-bottom:20px;
        height:20rem;
        position:relative;
        &:after{
                position:absolute;
                border-radius:6px;
                z-index:-1;
                top:0;
                left:0;
                content:"";
                width:100%;
                height:100%;
                background:url(/img/mango.png) no-repeat center center/cover;
                opacity:0.6;
                height:100%;
            }
`;

const ExampleP1 = styled.p` 
    cursor:pointer;
    font-size:1.6rem;
    font-weight: 550;
    text-align:center;
    margin-top:25%;
    z-index:2;
`;

const ExampleP2 =styled.p`
    cursor:pointer;
    font-size:0.3rem;
    color:${COLORS.gray};
    font-weight:500;
    text-align:center;
    margin-bottom:0;
    z-index:2;
`;

const CreateBtn = styled.button`
    position:absolute;
    z-index:2;
    width:50px;
    font-size:30px;
    height:50px;
    bottom:20px;
    right:20px;
    border-radius:50%;
    background-color:${COLORS.blue};
    color:#fff;
`;
