import React, { useEffect, useState } from 'react';
import { COLORS, API } from '../../constants/index';
import styled from 'styled-components';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function Left() {
    const [userinfo,setUserinfo] = useState([{
        email:"",
        id:"",
        name:"",
        password:"",
        username:"",
    }])
    const Mypageinfo = async ()=>{
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user')
        const res = await axios.get(`${API}/user/${username}`,{
            headers:{
                'Content-type' : "application/json",
                'Authorization' : `Bearer ${token}`
            }
        });
        setUserinfo(res.data)
    }

    useEffect(()=>{
        Mypageinfo()
    },[])

    return(
        <>
            <Article>
                <Profile>
                    <div>
                        <ProfileImage src ="/img/mango.jpg" alt = "profile"></ProfileImage>
                    </div>

                <Info>
                    <div>
                        <Name>{userinfo.name}</Name>
                        <InfoImg src="/img/profileupdate.png"></InfoImg>
                    </div>
                    <Email>{userinfo.email}</Email>
                </Info>
        
                
                </Profile>
            
                <Workbook>
                    <ul>
                        <WorkbookLi>
                            <WorkbookImg src = "/img/vector_white.svg" alt = "문제집"></WorkbookImg>
                            <WorkbookP>나의 문제집</WorkbookP>
                        </WorkbookLi>

                        {/* <Link to='sharepage'> */}
                            <WorkbookLi>
                                <WorkbookImg src = "/img/vector_gray.svg" alt = "문제집"></WorkbookImg>
                                <WorkbookP>가져온 문제집</WorkbookP>
                            </WorkbookLi>
                        {/* </Link> */}
                    </ul>
                </Workbook>
            </Article>
        </>
    )
}

const Article = styled.article`
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
        justify-content:start;
        align-items:center;
        width:100%
    }
`;


const InfoImg = styled.img`
    width:1.1rem;
    height:1.1rem;
    margin-left:0.7em;
    line-height:1rem;
    cursor:pointer;
`;

const Name = styled.p`
    font-size:1.3rem;
    font-weight:700;
`

const Email = styled.p`
    font-size:1rem;
`


const Workbook = styled.div`
    cursor:pointer;
    margin-top:30px;
`;

const WorkbookLi = styled.li`
    margin-top:1.5em;
    padding: 0.5em 3em;
    border-top-right-radius:15px;
    border-bottom-right-radius:15px;
    width:45%;
    display:flex;
    align-items:center;

    &:first-child{
        background-color: ${COLORS.blue};
        .vector path{
            fill:white;
        }
        p{
            color: white;
        }
    }

`;

const WorkbookImg = styled.img`
    width:1.1rem;
    height:1.1rem;
    path {
        fill : #fff;
    }
`;

const WorkbookP = styled.p`
    color:${COLORS.gray};
    margin-left:1em;
`;

