import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API } from "../../constants";
import { Link } from 'react-router-dom';

export default function MorePost() {
  const [post, setPost] = useState([
    {
      content: "",
      count: 0,
      id: "",
      share: false,
      title: "",
      username: "",
    },
  ]);

  const getUser = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/workbook?page=1&size=15`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setPost(res.data.dtoList);
  };

  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <>
      <ItemBox>
        <Items>
          {post.map((postData) => {
            return (
              <li key={postData.id}>
                <Link to={`/detail/${postData.id}`} state={{username: postData.username}}>
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
