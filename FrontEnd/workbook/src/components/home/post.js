import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../constants";

export default function Post() {
  const [post, setPost] = useState([
    {
      content: "",
      count: 0,
      id: "",
      mogDate: "",
      regDate: "",
      share: false,
      title: "",
      type: "",
      username: "",
    },
  ]);

  const token = sessionStorage.getItem("token");

  const getUser = async () => {
    const res = await axios.get(`${API}/workbook?page=1&size=5000`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setPost(res.data.dtoList);
  };
  
  useEffect(() => {
    getUser();
  }, []);
  
  const [data, setData] = useState();


  // const category = () => {
  //   post.filter((data) => data.type === "어학");
  // };
  const onClick = (e) => {
    if(e.target.name === '전체') {
      setData(post)
    } else {
      setData(post.filter(item => item.type === e.target.name))
    }
    // post.filter(data => post.type === e.target.name)
    // setData(post);
    // console.log(data);
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
              {post.slice(0, 10).map((a) => {
                //map이 순환을 함
                return (
                  <li key={a.id}>
                    <Link
                      to={`/detail/${a.id}`}
                      state={{ username: a.username }}
                    >
                      <ItemImg></ItemImg>
                      <TextBox>
                        <ItemScr size="20px">{a.title}</ItemScr>
                        <ItemScr size="13px">만든이: {a.username}</ItemScr>
                        <ItemTxt size="12px">{a.content}</ItemTxt>
                      </TextBox>
                    </Link>
                  </li>
                );
              })}
            </>
          ) : (
            <>
              {data.slice(0, 10).map((a) => {
                //map이 순환을 함
                return (
                  <li key={a.id}>
                    <Link
                      to={`/detail/${a.id}`}
                      state={{ username: a.username }}
                    >
                      <ItemImg></ItemImg>
                      <TextBox>
                        <ItemScr size="20px">{a.title}</ItemScr>
                        <ItemScr size="13px">만든이: {a.username}</ItemScr>
                        <ItemTxt size="12px">{a.content}</ItemTxt>
                      </TextBox>
                    </Link>
                  </li>
                );
              })}
            </>
          )}
        </Items>
      </ItemBox>
      <MoreBtn href="/Allpost">더보기</MoreBtn>
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
  background: url(/img/example.svg) no-repeat center/103%;
`;
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