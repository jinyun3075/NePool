import React from 'react';
import styled from 'styled-components';

export default function Mypage() {
  return (
    <>
      <Section>
        <Left>
            <div>
                <img alt = "profile"></img>
                <p>정시찬</p>
                <span></span>
                <p>123@naver.com</p>
            </div>
            
            <div>
                <ul>
                    <li>
                        <img alt = "문제집"></img>
                        <p>나의 문제집</p>
                    </li>
                    <li>
                        <img alt = "문제집"></img>
                        <p>문제집 만들기</p>
                    </li>
                    <li>
                        <img alt = "문제집"></img>
                        <p>공유 문제집</p>
                    </li>
                    <li>
                        <img alt = "문제집"></img>
                        <p>공유 문제집</p>
                    </li>
                </ul>
            </div>
        </Left>

        <Right>
            <div>나의 문제집</div>
            <div>
                <ul>
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
    display:flex;
`;
const Left = styled.article`
    border:1px solid black;
    flex-basis:20%;
`;

const Right = styled.article`
    border:1px solid black;
    flex-basis:80%;
`
