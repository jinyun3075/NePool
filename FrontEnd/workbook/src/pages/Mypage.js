import React from 'react';
import styled from 'styled-components';
import HeaderSignin from '../components/header/header_signin';
import { COLORS } from '../constants';

export default function Mypage() {
  return (
    <>
      <HeaderSignin />
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
                        <img src = "/img/vector.svg" alt = "문제집"></img>
                        <p>나의 문제집</p>
                    </li>
                    <li>
                        <img src = "/img/vector.svg" alt = "문제집"></img>
                        <p>문제집 만들기</p>
                    </li>
                    <li>
                        <img src = "/img/vector.svg" alt = "문제집"></img>
                        <p>공유 문제집</p>
                    </li>
                    <li>
                        <img src = "/img/vector.svg" alt = "문제집"></img>
                        <p>공유 문제집</p>
                    </li>
                </ul>
            </Workbook>
        </Left>

        <Right>
            <div>나의 문제집</div>
            <div>
                <ul>
                    <li>
                        <p>예시 문제집</p>
                        <p>마지막 수정 일시 : 2022-02-28</p>
                    </li>

                    <li>
                        <p>예시 문제집</p>
                        <p>마지막 수정 일시 : 2022-02-28</p>
                    </li>

                    <li>
                        <p>예시 문제집</p>
                        <p>마지막 수정 일시 : 2022-02-28</p>
                    </li>

                    <li>
                        <p>예시 문제집</p>
                        <p>마지막 수정 일시 : 2022-02-28</p>
                    </li>

                    <li>
                        <p>예시 문제집</p>
                        <p>마지막 수정 일시 : 2022-02-28</p>
                    </li>

                    <li>
                        <p>예시 문제집</p>
                        <p>마지막 수정 일시 : 2022-02-28</p>
                    </li>
                    
                    <li>
                        <p>예시 문제집</p>
                        <p>마지막 수정 일시 : 2022-02-28</p>
                    </li>
                </ul>
            </div>
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
    }
`;

const Name = styled.p`
    font-size:1.1rem;
    font-weight:700;
`

const Email = styled.p`
    font-size:0.8rem;
`


const Workbook = styled.div`
    margin-top:30px;

    li{
        img{
            color:gray;
        }
        margin-top:1.5em;
        padding: 0.5em 3em;
        border-top-right-radius:15px;
        border-bottom-right-radius:15px;
        width:45%;
        display:flex;
        align-items:center;

        &:first-child{
            background-color: ${COLORS.blue};
            img{
                color:white;
                color:${COLORS.gray};
            }
            p{
                color: white;
            }
        }

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
            color:${COLORS.gray};
            width:1.1rem;
            height:1.1rem;
        }
        p{
            color:${COLORS.gray};
            margin-left:1em;
        }
    }
`

const Right = styled.article`
    padding:1em;
    margin:0 auto;
    border:1px solid ${COLORS.light_gray};
    border-radius:10px;
    flex-basis:70%;
    div:first-child{
        border-bottom: 1px solid black;
    }

    ul{
        display:grid;
        grid-template-columns: repeat(4, 1fr);
        column-gap: 20px;
        li{
            margin-top:20px;
            border-radius:5px;
            display:flex;
            flex-direction:column;
            justify-content:center;
            border: 1px solid ${COLORS.gray};
            height:18rem;

            p:first-child{
                font-size:1.6rem;
                text-align:center;
            }
            p:last-child{
                font-size:1rem;
                text-align:center;
            }
        }
    }
`

const ProfileImage = styled.img`
    width:100%;
    height:100%;
    border-radius:10px;
`