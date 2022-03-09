import React, { useState } from 'react';
import styled from 'styled-components';
import HeaderSignin from '../header/header_signin';
import { COLORS } from '../../constants/index';
import DeleteModal from '../mypage/delete_modal';
import CreateModal from './create_modal';
import UpdateModal from './update_modal';

export default function My_page() {

  let [create, setCreate] = useState(false);
  let [update, setUpdate] = useState(false);
  let [ximg, setXimg] = useState(false);

  return (
    <>
      <HeaderSignin />

      {
                    create === true ? <CreateModal create = {create} setCreate = {setCreate} /> : null
      }

      <Section>
        <Left>
            <Profile>
                <div>
                    <ProfileImage src ="/img/mango.jpg" alt = "profile"></ProfileImage>
                </div>

                <Info>
                    <div>
                        <Name>정시찬님</Name>
                        <img src="/img/profileupdate.png"></img>
                    </div>
                    <Email>123@naver.com</Email>
                </Info>
            </Profile>
            
            <Workbook>
                <ul>
                    <li>
                        <img className="vector" src = "/img/vector.svg" alt = "문제집"></img>
                        <p>나의 문제집</p>
                    </li>
                    <li>
                        <img className="vector" src = "/img/vector.svg" alt = "문제집"></img>
                        <p>문제집 만들기</p>
                    </li>
                    <li>
                        <img className="vector" src = "/img/vector.svg" alt = "문제집"></img>
                        <p>공유 문제집</p>
                    </li>
                    <li>
                        <img className="vector" src = "/img/vector.svg" alt = "문제집"></img>
                        <p>공유 문제집</p>
                    </li>
                </ul>
            </Workbook>
        </Left>

        <Right>
            <Myworkbook>
                <p>나의 문제집</p>
            </Myworkbook>
                <Example>
                    <ExampleLi onClick ={()=> { setUpdate(update = true); setXimg(ximg = true); } }> 
                        <p>예시 문제집</p>
                        <p>마지막 수정 일시 : 2022-02-28</p>
                        {
                            (update === true) && (ximg === true) ? 
                            <UpdateModal ximg={ximg} setXimg = {setXimg} update={update} setUpdate={setUpdate} /> :
                            null
                        }
                    </ExampleLi>
                    
                    <ExampleLi>
                        <p>예시 문제집</p>
                        <p>마지막 수정 일시 : 2022-02-28</p>
                    </ExampleLi>

                    <ExampleLi>
                        <p>예시 문제집</p>
                        <p>마지막 수정 일시 : 2022-02-28</p>
                    </ExampleLi>

                    <ExampleLi>
                        <p>예시 문제집</p>
                        <p>마지막 수정 일시 : 2022-02-28</p>
                    </ExampleLi>

                </Example>

                <CreateBtn onClick ={ ()=>{setCreate(create=true)}}>+</CreateBtn>

                <DeleteModal />
        </Right>

      </Section>


    </>
    )
} 


const Section = styled.article`
    width:100%;
    height:800px;
    margin-top:80px;
    display:flex;
`;

const Left = styled.article`
    flex-basis:25%;
`;

const Profile = styled.div`
    display:flex;
    div{
        width:100%;
        margin-left:2em;
        display:flex;
    }
`

const ProfileImage = styled.img`
    width:100%;
    height:100%;
    border-radius:10px;
`

const Info = styled.div`
    margin-left:3px;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:start;
    div{
        margin:0 auto;
        display:flex;
        justify-content:left;
        align-items:center;
        width:100%
    }
    img{
        width:1.1rem;
        height:1.1rem;
        margin-left:0.7em;
        line-height:1rem;
        cursor:pointer;
    }
`;

const Name = styled.p`
    font-size:1.3rem;
    font-weight:700;
`

const Email = styled.p`
    font-size:1rem;
`


const Workbook = styled.div`
    margin-top:30px;

    li{
        cursor:pointer;
        margin-top:1.5em;
        padding: 0.5em 3em;
        border-top-right-radius:15px;
        border-bottom-right-radius:15px;
        width:45%;
        display:flex;
        align-items:center;

        
        &:nth-child(4){
            margin-top:4em;
            position:relative;
            &:before{
                position:absolute;
                top:-30px;
                width:80%;
                content:'';
                height:0.5px;
                background-color:${COLORS.gray};
            }
        }

        img{
            width:1.1rem;
            height:1.1rem;
            color:gray;
        }
        p{
            color:${COLORS.gray};
            margin-left:1em;
        }

        &:hover{
            background-color: ${COLORS.blue};
            .vector path{
                fill:white;
            }
            p{
                color: white;
            }
        }
        
    }
`

const Myworkbook = styled.div`
    border-bottom: 3px solid ${COLORS.light_gray};
    height:6%;
    p{
        font-size:1.1rem;
        font-weight: 700;
        line-height:3rem;
        margin-left:20px;
    }
`;

const Right = styled.article`
    position:relative;
    margin:0 auto;
    border:3px solid ${COLORS.light_gray};
    border-radius:15px;
    flex-basis:70%;
`
const Example = styled.ul`
    padding:1em 3em;
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 25px;
`;

const ExampleLi = styled.li`
        margin-top:20px;
        height:20rem;
        position:relative;
        cursor:pointer;
        z-index:1;
        &:after{
                position:absolute;
                top:0;
                left:0;
                content:"";
                width:100%;
                height:100%;
                background:url(/img/mango.jpg) no-repeat center center/cover;
                border-radius:20px;
                opacity:0.4;
                height:100%;
            }

        p:first-child{
            font-size:1.6rem;
            font-weight: 550;
            text-align:center;
            margin-top:25%;
        }
        p:last-child{
            font-size:0.3rem;
            color:${COLORS.gray};
            font-weight:500;
            text-align:center;
            margin-bottom:0;
        }
`;

const CreateBtn = styled.button`
    position:absolute;
    width:50px;
    font-size:30px;
    height:50px;
    bottom:20px;
    right:20px;
    border-radius:50%;
    background-color:${COLORS.blue};
    color:#fff;
`;