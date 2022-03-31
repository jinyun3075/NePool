import React, { useEffect, useState } from 'react';
import { COLORS, API } from '../../constants/index';
import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios'; 


export default function Updatepage_Right() {
    const location = useLocation();
    const workbookid = location.state.workbookid
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const [workid,setWorkid] = useState('');
    console.log(workid);

    // 문제 보이기 (Get)
    const [question,setQuestion] = useState([
        {
            id: "",
            question: "",
            answer_a: "",
            answer_b: "",
            answer_c: "",
            answer_d: "",
            answer_e: "",
            correct: "",
            explanation:"",
        }
    ])
    const GetQuestion = async () =>{
        const res = await axios.get(`${API}/work/${username}/${workbookid}`,{
            headers:{
                'Content-type' : "application/json",
                Authorization : `Bearer ${token}` 
            }
        })
        console.log(res);
        setQuestion(res.data)
    }

    // 문제 수정

    // const UpdateWorkbook = async () =>{
    //     const respond = await axios.put(`${API}/workbook/${username}/${workbookid}`,{
    //         headers:{
    //             'Content-type' : "application/json",
    //             Authorization : `Bearer ${token}` 
    //         }
    //     })
    //     console.log(respond);
    // }
    
    // useEffect(() => {
    //     GetQuestion();
    // }, []);

    
    useEffect(() => {
        GetQuestion();
    }, [workid]);    
   
    const QuestionId = async (id) =>{
        await setWorkid(id)
    }
    
    // 문제 삭제
    const DeleteQuestion = async ()=> {
        const ress = await axios.delete(`${API}/work/${username}/${workbookid}/${workid}`,{
            headers:{
                'Content-type' : "application/json",
                Authorization : `Bearer ${token}` 
            }    
        })    
        console.log(ress)
    }    
    

    return(
        <>
            <Article>

                <Myworkbook>
                    <p>문제집 만들기</p>
                </Myworkbook>

                <ScrollbarSection>

                    <WorkbookDiv>                                
                          <WorkbookImg src ="/img/mango.JPG"/>
                        <TextSelect>
                            <TextInput  placeholder ="문제집 이름" type="text"></TextInput>
                            <Select defaultValue = "수능·내신">
                                <option value="수능·내신">수능·내신</option>
                                <option value="어학">어학</option>
                                <option value="자격증">자격증</option>
                                <option value="시사·상식">시사·상식</option>
                                <option value="기타">기타</option>
                            </Select>
                            <Explain rows="5" placeholder='문제집 설명'></Explain>
                            <button>수정</button>
                        </TextSelect>    
                    </WorkbookDiv>
                    
                    <QuestionUl>
                        {
                            question.map((questiondata,i)=>{
                                return(
                                    <QuestionLi key = {questiondata.id}>
                                        <Question>{i+1}. {questiondata.question}</Question>
                                        <Answer>[정답 : {questiondata.correct}]</Answer>
                                        <Answers>{questiondata.explanation}</Answers>
                                        <ButtonDiv>
                                            <Update>수정</Update>
                                            <Delete onClick = { () => { QuestionId(questiondata.id); DeleteQuestion();} }>삭제</Delete>
                                        </ButtonDiv>
                                    </QuestionLi>
                                )
                            })
                        }
                    </QuestionUl>

                    <Link to ='/add' state= {{workbookid: workbookid}}><CreateBtn>+</CreateBtn></Link>

                </ScrollbarSection>
            </Article>
        </>
    )
}


const Article = styled.article`
    position:relative;
    box-sizing:border-box;
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

const ScrollbarSection = styled.section`
    width:100%;
    max-height:90%;
    overflow-x: auto;
    overflow-y: scroll;
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
const WorkbookDiv = styled.div`
    display:flex;
    margin: 1em 0;
    width:100%;
    height:45%;
`;

const WorkbookImg = styled.div`
    width: 20%;
    height: 280px;
    margin-left: 18%;
    margin-right: 50px;
    background: url(/img/mango.jpg) no-repeat center center/cover;
    opacity: 0.6;
`;

const TextSelect = styled.div`
    width:30%;
    height:80%;
    margin-left:15px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;    
`;

const TextInput = styled.input`
    margin-top:36px;
    width:95%;
    height:30px;
    font-weight:bold;
    padding-left:10px;
    color: ${COLORS.black};
    border-radius:5px;
    border: 2px solid ${COLORS.light_gray};
    &:focus{
        border-color: ${COLORS.blue};
    }
`;

const Select = styled.select`
    margin-top:20px;
    width:100%;
    font-weight:bold;
    height:35px;
    padding-left:5px;
    color: ${COLORS.black};
    border: 2px solid ${COLORS.light_gray};
    border-radius:5px;
`;

const Explain = styled.textarea`
    padding:3%;
    width:93%;
    height:80px;
    font-weight:bold;
    padding-left:10px;
    color: ${COLORS.black};
    border: 2px solid ${COLORS.light_gray};
    border-radius:5px;
    margin-top:20px;
    resize: none;
`;

const QuestionUl = styled.ul`
    width:100%;
`;

const QuestionLi = styled.li`
    padding:2em;
`;

const Question = styled.p`
    font-size:16px;
    font-weight:bold;
`;

const Answer = styled.p`
    margin-top:7px;
    margin-left:6px;
    font-weight:600;
    font-size:13px;
    color:${COLORS.gray};
`;

const Answers = styled.p`
    margin-top:7px;
    margin-left:6px;
    font-weight:400;
    font-size:13px;
    color:${COLORS.light_gray};

`;

const ButtonDiv = styled.div`
    display:flex;
    margin-left:6px;
    margin-top:15px;
`;

const Update = styled.button`
    border:none;
    font-size:12px;
    width:60px;
    height:32px;
    border-radius:5px;
    background-color: ${COLORS.blue};
    margin-right:10px;
    color:#fff;
`;

const Delete = styled.button`
    border:none;
    font-size:12px;
    width:60px;
    height:32px;
    border-radius:5px;
    background-color: ${COLORS.blue};
    color:#fff;
`;

const CreateBtn = styled.button`
    position:absolute;
    z-index:2;
    width:50px;
    font-size:30px;
    line-height:25px;
    height:50px;
    bottom:20px;
    right:20px;
    border-radius:50%;
    background-color:${COLORS.blue};
    color:#fff;
`;
