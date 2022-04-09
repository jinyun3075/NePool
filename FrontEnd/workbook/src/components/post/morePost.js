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

  //페이징처리
  const [page, setPage] = useState([])
  const [number, setNumber] = useState(1)
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const onClickNum = (e) => {
    setNumber(e.target.value)
  }
  const onClickNext = () => {
    setNumber(parseInt((number-1)/5)*5+6);
  }
  const onClickPrev = () => {
    setNumber(parseInt((number-1)/5)*5-4);
  }
  console.log(parseInt((number-1)/5)*5-4);
  console.log(1);

  const getUser = async () => {
    const res = await axios.get(`${API}/workbook/page?page=${number}&size=10&type=${clickType}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setPost(res.data.dtoList);
    setPage(res.data.pageList);
    setNext(res.data.next);
    setPrev(res.data.prev);
    console.log(res);
  };
  //카테고리별 게시글
  const [clickType, setClickType] = useState("all");
  const onClickType = (e) => {
    setClickType(e.target.name)
    setNumber(1)
  }

  //페이지별 나누기
  useEffect(() => {
    getUser();
  }, [clickType,number]);
  
  return (
    <>
     <Category>
        <CategoryItem>
          <button name="all" onClick={onClickType}>
            전체
          </button>
        </CategoryItem>
        <CategoryItem>
          <button name="수능·내신" onClick={onClickType}>
            수능·내신
          </button>
        </CategoryItem>
        <CategoryItem>
          <button name="어학" onClick={onClickType}>
            어학
          </button>
        </CategoryItem>
        <CategoryItem>
          <button name="자격증" onClick={onClickType}>
            자격증
          </button>
        </CategoryItem>
        <CategoryItem>
          <button name="시사·상식" onClick={onClickType}>
            시사·상식
          </button>
        </CategoryItem>
        <CategoryItem>
          <button name="기타" onClick={onClickType}>
            기타
          </button>
        </CategoryItem>
      </Category>
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
      <PostBtn page={page} onClickNum={onClickNum} next={next} prev={prev} onClickNext={onClickNext} onClickPrev={onClickPrev}/>
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
