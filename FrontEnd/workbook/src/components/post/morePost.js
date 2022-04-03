import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API } from "../../constants";
import { Link } from 'react-router-dom';
import PostBtn from "./postButton";

export default function MorePost() {
  const [post, setPost] = useState([
    {
      content: "",
      count: "",
      id: "",
      mogDate: "",
      regDate: "",
      share: "",
      title: "",
      type: "",
      username: "",
    },
  ]);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const getUser = async () => {
    const token = sessionStorage.getItem("token");
    const res = await axios.get(`${API}/workbook?page=1&size=20`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setPost(res.data.dtoList);
    // console.log(res);
  };

  useEffect(() => {
    getUser();
  }, []);
  
  const [data, setData] = useState();
  const onClick = (e) => {
    if(e.target.name === '전체') {
      setData(post)
    } else {
      setData(post.filter(item => item.type === e.target.name))
    }
  };
  return (
    <>
     <Category>
        <CategoryItem>
          <button onClick={onClick} name="전체">
            전체
          </button>
        </CategoryItem>
        <CategoryItem>
          <button onClick={onClick} name="수능·내신">
            수능·내신
          </button>
        </CategoryItem>
        <CategoryItem>
          <button onClick={onClick} name="어학">
            어학
          </button>
        </CategoryItem>
        <CategoryItem>
          <button onClick={onClick} name="자격증">
            자격증
          </button>
        </CategoryItem>
        <CategoryItem>
          <button onClick={onClick} name="시사·상식">
            시사·상식
          </button>
        </CategoryItem>
        <CategoryItem>
          <button onClick={onClick} name="기타">
            기타
          </button>
        </CategoryItem>
      </Category>
      <ItemBox>
        <Items>
          {data === undefined ? (
            <>
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
            </>
          ) : (
            <>
            {data.map((postData) => {
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
            </>
          )}
        </Items>
      </ItemBox>
      <PostBtn
      total = {post.length}
      limit = {limit}
      page = {page} 
      setPage={setPage}
      />
    </>
  );
}

//네브바
const Category = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  border-bottom: 1px solid #b6b6b6;
`;
const CategoryItem = styled.li`
  margin: 0 40px;
  button {
    font-size: 17px;
  }
`;
//리스트
const ItemBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;
const Items = styled.ul`
  display: flex;
  flex-wrap: wrap;
  /* justify-content: center; */
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
