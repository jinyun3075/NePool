import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { API } from "../../constants";
import Post from "./post";

export default function PostNav() {
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
    const res = await axios.get(`${API}/workbook?page=1&size=5000`, {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    setPost(res.data.dtoList);
  };

  useEffect(() => {
    getUser();
  }, []);

  const [v, setV] = useState([])

  // // const aaaaa = () => {
  // //   const newArr = [...post]
  // //   setV(newArr)
  // // }

  // // aaaaa()
  
  const [rr, setRr] = useState(false)


  const arr = []

  const onClick = (e) => {
    post.map(item=> {
      if(e.target.name==="*" || e.target.name === item.type) {
          item.classList.removeClass("invisible")
      }else{
          item.classList.addClass("invisible");
      }
      // setV(arr)
    })}
  



    // if(e.target.name === "v") {
    //   post.map(item => item.type === "자격증" && arr.push(item));
    //   setV(arr);
    // } else if (e.target.name === "a") {
    //   post.map(item => item.type === "어학" && arr.push(item));
    //   setV(arr);
    // } else if (e.target.name === "b") {
    //   post.map(item => item.type === "수능·내신" && arr.push(item));
    //   setV(arr);
    // } else if (e.target.name === "*" || e.target.name === item.type) {
    //   setV()
    // }


  return (
    <>
      <Category>
        <CategoryItem>
          <button
            name="*"
          >전체</button>
        </CategoryItem>
        <CategoryItem>
          <button name="수능·내신">수능내신</button>
        </CategoryItem>
        <CategoryItem>
          <button 
            onClick={onClick}
            name="어학자격증"
          >어학자격증</button>
        </CategoryItem>
        <CategoryItem>
          <button
          onClick={onClick}
          name="국가기술자격증">국가기술자격증</button>
        </CategoryItem>
        <CategoryItem>
          <button
          onClick={onClick}
          name="국가전문자격증">국가전문자격증</button>
        </CategoryItem>
        <CategoryItem>
          <button name="기타자격증">기타자격증</button>
        </CategoryItem>
      </Category>
      {/* <MoreBtn href="#">더보기</MoreBtn> */}
      <ItemBox>
        <Items>
          {post.slice(0, 10).map((postData) => {
            //map이 순환을 함
            return (
              <li className={"list invisible"} key={postData.id}>
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

//더보기 버튼
const MoreBtn = styled.a`
  display: block;
  width: 230px;
  height: 45px;
  margin: 82px auto 67px;
  border: 0.5px solid #b6b6b6;
  text-align: center;
  font-size: 15px;
  line-height: 45px;
`;

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
    .list{
      width: 190px;
      height: 290px;
      border: 1px solid #b6b6b6;
      margin: 0 5px 10px;
      border-radius: 6px;
      overflow: hidden;
    }
    .list.invisible{
      display:none;
    }
    a {
      display: inline-block;
      width: 190px;
      height: 290px;
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
// const MoreBtn = styled.a`
//   display: block;
//   width: 230px;
//   height: 45px;
//   margin: 35px auto 50px;
//   border: 0.5px solid #b6b6b6;
//   text-align: center;
//   font-size: 15px;
//   line-height: 45px;
// `;