import React, { useEffect, useState } from 'react';
import { COLORS, API } from '../../constants/index';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import DeleteModal from '../mypage/delete_modal';
import CreateModal from './create_modal';
import UpdateModal from './update_modal';
import ModeModal from './mode_modal';
import axios from 'axios'; 


export default function Right() {
    let [update, setUpdate] = useState(Array(10).fill(false));
    let [create, setCreate] = useState(false);
    let [deletemodal, setDeletemodal] = useState(false);
    let [modemodal, setModemodal] = useState(false);
    let [workbookid, setWorkbookid] = useState('');
    let [workbookUserName, setworkbookUserName] = useState('');
    

    // 문제집 리스트 받아오기 (Get)
    const [workbook,setWorkbook] = useState([
        {
            content:"",
            count:"",
            id:"",
            share:"",
            title:"",
            username:"",
            regDate: "",
            modDate: "",
        },
    ]);
      
  const ReadWorkbook = async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');
        const res = await axios.get(`${API}/workbook/${username}?page=1&size=500`,{
            headers:{
                'Content-type' : "application/json",
                Authorization : `Bearer ${token}`
            }}
        );
        console.log(res)
        setWorkbook(res.data.dtoList);
    }

    useEffect(()=>{
        // console.log(update)
        console.log(workbookid) 
    },[update])
    

    useEffect(() => {
        ReadWorkbook();
    }, []);  
 
    
    // 문제집 클릭시 해당 모달 보이기
    const yes = (event) =>{
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
    

    const workbookdataid = (id) =>{
        setWorkbookid(id);
    }

    const workbookdatausernmae = (username) => {
      setworkbookUserName(username)
    }

   


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
                        workbook.map((workbookdata,i)=>{
                            return(
                                    <ExampleLi onClick={ (event) => { workbookdatausernmae(workbookdata.username); workbookdataid(workbookdata.id); yes(event); }} data-workbookid={workbookdata.id} value={i} key={workbookdata.id}>
                                        
                                        <ExampleP1 >{workbookdata.title}</ExampleP1>
                                        <ExampleP2 >마지막 수정 일시 : {workbookdata.modDate.substring(0,10)}</ExampleP2>
                                        {
                                            update[i] === true ? 
                                            <UpdateModal workbookid = {workbookid} workworkbook ={workbook} setWorkbook={workbook} setDeletemodal = {setDeletemodal} deletemodal = {deletemodal} modemodal = {modemodal} setModemodal = {setModemodal}/>
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
                background:url(/img/mango.jpg) no-repeat center center/cover;
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
