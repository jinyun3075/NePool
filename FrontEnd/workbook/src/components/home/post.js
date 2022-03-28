import React from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';

export default function Post({allUserPost}) {

  return (
    <>
      <ItemBox>
        <Items>
          {allUserPost.slice(0, 10).map((postData) => {
            //map이 순환을 함
            return (
              <li key={postData.id}>
                <Link to={`/detail/${postData.id}`}  state={{username: postData.username}} >
                  <ItemImg>
                  </ItemImg>
                  <TextBox>
                    <ItemScr size="20px">{postData.title}</ItemScr>
                    <ItemScr size="13px">만든이: {postData.username}</ItemScr>
                    <ItemTxt size="12px">{postData.content}</ItemTxt>
                  </TextBox>
                </Link>
              </li>
            );
          })}
        </Items>
      </ItemBox>
      <MoreBtn href="/Allpost">더보기</MoreBtn>
    </>
  );
}

//리스트
const ItemBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const Items = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 1010px;
  li {
    width: 190px;
    height: 290px;
    border: 1px solid #b6b6b6;
    margin: 0 5px 10px;
    border-radius: 6px;
    overflow: hidden;
    a {
      display: inline-block;
      width: 190px;
      height: 290px;
    }
  }
`;
const ItemImg = styled.div`
  width: 190px;
  height: 177px;
  border-bottom: 1px solid #b6b6b6;
  background: url(/img/example.svg) no-repeat center/103% ;
`
const TextBox = styled.div`
  margin: 10px 10px;
`;
const ItemScr = styled.p`
  margin-bottom: 7px;
  font-size: ${(props) => props.size};
`;
const ItemTxt = styled.p`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 170px;
  margin: 20px 10px 15px 0;
  font-size: ${(props) => props.size};
`;

//더보기 버튼
const MoreBtn = styled.a`
  display: block;
  width: 230px;
  height: 45px;
  margin: 35px auto 50px;
  border: 0.5px solid #b6b6b6;
  text-align: center;
  font-size: 15px;
  line-height: 45px;
`;
