import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API } from "../../constants";

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
    const res = await axios.get(`${API}/workbook?page=1&size=10`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
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
              <li>
                <a href="#">
                  <TextBox>
                    <ItemSrc size="27px">{postData.title}</ItemSrc>
                    <ItemSrc size="13px">만든이: {postData.username}</ItemSrc>
                    <ItemSrc size="15px">{postData.content}</ItemSrc>
                  </TextBox>
                </a>
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
`;
const Items = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 1680px;
  li {
    width: 280px;
    height: 320px;
    border-bottom: 1px solid #b6b6b6;
    /* border-left: 1px solid #b6b6b6; */
    border-right: 1px solid #b6b6b6;
    :nth-child(1),:nth-child(6) {
       border-left: 1px solid #b6b6b6;
    }
    a {
      display: inline-block;
      width: 280px;
      height: 320px;
    }
  }
`;
const TextBox = styled.div`
  margin: 30px 30px 0 30px;
`;
const ItemSrc = styled.p`
  margin-bottom: 15px;
  font-size: ${(props) => props.size};
`;
