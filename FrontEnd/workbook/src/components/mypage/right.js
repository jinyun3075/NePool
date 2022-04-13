import React, { useEffect, useState } from 'react';
import { COLORS, API } from '../../constants/index';
import {Link} from 'react-router-dom';
import styled,{css} from 'styled-components';
import DeleteModal from '../mypage/delete_modal';
import CreateModal from './create_modal';
import UpdateModal from './update_modal';
import ModeModal from './mode_modal';
import axios from 'axios'; 


export default function Right() {
    let [update, setUpdate] = useState(Array(100).fill(false));
    let [create, setCreate] = useState(false);
    let [deletemodal, setDeletemodal] = useState(false);
    let [modemodal, setModemodal] = useState(false);
    let [workbookid, setWorkbookid] = useState('');
    let [workbookUserName, setworkbookUserName] = useState('');


    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('user');
    
    const workbookdataid = (id) =>{
        setWorkbookid(id);
    }
    
    const workbookdatausername = (username) => {
        setworkbookUserName(username)
    }

    // 문제집 data
    const [workbook,setWorkbook] = useState([
        {
            id:"",
            title:"",
            content:"",
            share:"",
            username:"",
            image:"",   
            count:"",
            type: "",
            regDate:"",
            modDate:""
        },
    ]);



    // 문제집 리스트 API (Get)
    const ReadWorkbook = async () => {
        const res = await axios.get(`${API}/workbook/${username}?page=1&size=500`,{
            headers:{
                'Content-type' : "application/json",
                Authorization : `Bearer ${token}`
            }}
        );
        setWorkbook(res.data.dtoList);
        // console.log(res.data.dtoList);
    }
    
    // 문제집 공유 API
    const ShareWorkbook = async (dataa) =>{
        const res = await axios.put(`${API}/workbook/share/${username}/${dataa}`,
        {

        },
        {
            headers:{
                'Content-type' : 'application/json',
                Authorization : `Bearer ${token}`,
            }}
        );  
        // console.log(res)

    }


    // 클릭한 문제집만 모달 보이기
    const updateboolean = (event) =>{
        if (update[event.target.value] === true){            
            const newarray = [...update]
            newarray[event.target.value] = false
            setUpdate(newarray)
        }
        else{        
            const newarray = [...update]
            for(let i=0;i<newarray.length;i++){
                if(i === event.target.value){
                    newarray[i] = true
                }
                else{newarray[i] = false}
            }
            setUpdate(newarray)
        }
    }
    
    useEffect(() => {
        ReadWorkbook()
    }, [workbook]);  


    return(
        <>
            <Article>
                {
                    create === true ? <CreateModal create = {create} setCreate = {setCreate} /> : null
                }
                
                <Myworkbook>
                    <p>나의 문제집</p>
                </Myworkbook>

                {/* onClick ={() => { setUpdate(!update) } } */}
 
                <Example>
                    {
                        workbook.sort((a,b)=>{if(a.regDate>b.regDate){return 1}else if(a.regDate<b.regDate){return -1}else{return 0}}).map((workbookdata,i)=>{
                            return(
                                    <ExampleLi onClick={ (event) => { workbookdatausername(workbookdata.username); workbookdataid(workbookdata.id); updateboolean(event); }} imageurl={workbookdata.image} data-workbookid={workbookdata.id} value={i} key={workbookdata.id}>
                                        
                                        <Link to={`/detail/${workbookdata.id}`} state={{username:workbookdata.username}}>
                                            <ExampleP1 >{workbookdata.title}</ExampleP1>
                                            <ExampleP2 >마지막 수정 일시 : {workbookdata.modDate.substring(0,10)}</ExampleP2>
                                        </Link>
                                        {
                                            workbookdata.share === false 
                                            ? <WhiteShare data-index ={i} onClick = { (event) => { workbookdataid(workbookdata.id); ShareWorkbook(workbookdata.id);}} /> 
                                            : <BlueShare  data-index ={i} onClick = { (event) => { workbookdataid(workbookdata.id); ShareWorkbook(workbookdata.id);}} />
                                        }   
                                        
                                        {
                                            update[i] === true 
                                            ? <UpdateModal imageurl={workbookdata.image} workbookdata = {workbookdata} setDeletemodal = {setDeletemodal} deletemodal = {deletemodal} modemodal = {modemodal} setModemodal = {setModemodal}/>
                                            : null    
                                        }

                                    </ExampleLi> 

                            )
                        })
                    }
                    
                    {
                        deletemodal === true ? 
                        <DeleteModal workbookid={workbookid} deletemodal={deletemodal} setDeletemodal ={setDeletemodal}/>
                        :null   
                    }

                    {    
                        modemodal === true ?
                        <ModeModal workbookid={workbookid} username={workbookUserName} modemodal = {modemodal} setModemodal = {setModemodal} />
                        :null
                    }

                </Example>

                <CreateBtn onClick ={ ()=>{setCreate(create=true);}}>+</CreateBtn>

            </Article>
        </>
    )
}


const Article = styled.article`
    position:relative;
    margin:0 auto;
    margin-right:4%;
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
                
                ${props => props.imageurl &&
                    css`
                        background: url(${props=>props.imageurl}) no-repeat center center/cover;
                    `
                }

                opacity:0.6;
                height:100%;
            }
`;

const WhiteShare = styled.span`
    position:absolute;
    content:"";
    width:20px;
    height:20px;
    top:10px;
    right:10px;
    cursor:pointer;
    z-index:3;
    background: url(/img/whiteshare.svg) no-repeat center center/cover;
`;

const BlueShare = styled.span`
    position:absolute;
    content:"";
    width:20px;
    height:20px;
    top:10px;
    right:10px;
    cursor:pointer;
    z-index:3;    
    background: url(/img/blueshare.svg) no-repeat center center/cover;
`;

const ExampleP1 = styled.p` 
    cursor:pointer;
    font-size:1.6rem;
    font-weight: 550;
    text-align:center;
    margin-top:25%;
    z-index:2;
    padding: 0 0.5em;
    word-break: break-all;
`;

const ExampleP2 =styled.p`
    cursor:pointer;
    font-size:0.5rem;
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
