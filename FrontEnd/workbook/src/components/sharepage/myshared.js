import React, { useEffect, useState } from 'react';
import { COLORS, API } from '../../constants/index';
import {Link} from 'react-router-dom';
import styled,{css} from 'styled-components';
import ShareDeleteModal from './share_deletemodal';
import ShareUpdateModal from './share_updatemodal';
import ShareModeModal from './share_modemodal';
import axios from 'axios'; 

export default function Myshared(props) {
    const userid = props.userid
    let [shareupdate, setShareupdate] = useState(Array(100).fill(false));
    let [sharedeletemodal, setSharedeletemodal] = useState(false);
    let [sharemodemodal, setSharemodemodal] = useState(false);
    let [shareworkbookid,setShareworkbookid] = useState("")
    let [shareusername,setShareusername] = useState("");
    const [sharedworkbook,setSharedworkbook] = useState([
        {
            workBook: {
                id:"",
                title:"",
                content:"",
                share:"",
                username:"",
                count:"",
                type:"",
                image:"",
                regDate:"",
                modDate:"",
            },
            user: {
                id:"",
                username: "",
                name: "",
                email: "",
                password: "",
                image:""
            }
        } 
        
    ])
    

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
        // console.log(res);
        // console.log(sharedworkbook)
        setSharedworkbook(res.data.dtoList);
    }

    useEffect(() => {
        ReadShared();
    }, []);


    // 클릭한 문제집만 모달 보이기
    const shareupdateboolean = (event) =>{
        if (shareupdate[event.target.value] === true){            
            const newarray = [...shareupdate]
            newarray[event.target.value] = false
            setShareupdate(newarray)
        }
        else{        
            const newarray = [...shareupdate]
            for(let i=0;i<newarray.length;i++){
                if(i === event.target.value){
                    newarray[i] = true
                }
                else{newarray[i] = false}
            }
            setShareupdate(newarray)
        }
    }

    const workbookId = (id) =>{
        setShareworkbookid(id)
    }

    const username = (username) => {
        setShareusername(username)
    }

    return(
        <>
            <Article>
                
                <Myworkbook>
                    <p>가져온 문제집</p>
                </Myworkbook>
                

                <Example>
                    {
                        sharedworkbook.map((workbookdata,i) => {
                            return(
                                    <ExampleLi onClick ={(event) => { console.log(workbookdata.workBook); setShareupdate(!shareupdate); shareupdateboolean(event); workbookId(workbookdata.workBook.id); username(workbookdata.workBook.username)}} imageurl={workbookdata.workBook.image} value={i} key = { workbookdata.workBook.id}> 
                                        <Link to={`/detail/${workbookdata.workBook.id}`} state={{username:workbookdata.workBook.username}}>
                                            <ExampleP1 >{workbookdata.workBook.title}</ExampleP1>
                                            <ExampleP2 >마지막 수정 일시 : {workbookdata.workBook.modDate.substring(0,10)}</ExampleP2>
                                        </Link>
                                        {
                                            shareupdate[i] === true ? 
                                            <ShareUpdateModal  workbookId ={workbookdata.id} setSharedWorkbook={setSharedworkbook} setSharedeletemodal = {setSharedeletemodal} sharedeletemodal = {sharedeletemodal} sharemodemodal = {sharemodemodal} setSharemodemodal = {setSharemodemodal}/>
                                            : null    
                                        }
                                    </ExampleLi>
                            )
                        })
                    }

                    {
                        sharedeletemodal === true ? 
                        <ShareDeleteModal  workbookid = {shareworkbookid} userid = {userid} sharedeletemodal = {sharedeletemodal} setSharedeletemodal ={setSharedeletemodal}/>
                        :null   
                    }

                    {    
                        sharemodemodal === true ?
                        <ShareModeModal shareusername ={shareusername} shareworkbookid={shareworkbookid} sharemodemodal = {sharemodemodal} setSharemodemodal = {setSharemodemodal} />
                        :null
                    }

                </Example>

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
                background:url(/img/basic.png) no-repeat center center/cover;
                
                ${props => props.imageurl &&
                    css`
                        background: url(${props=>props.imageurl}) no-repeat center center/cover;
                    `
                }
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
