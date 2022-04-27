import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants";

export default function Post() {
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
      image: "",
    },
  ]);
  const [clickType, setClickType] = useState("all");

  const getUser = async () => {
    const res = await axios.get(`${API}/workbook/page?type=${clickType}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setPost(res.data.dtoList);
  };

  const onClickType = (e) => {
    setClickType(e.target.name);
  };

  useEffect(() => {
    getUser();
  }, [clickType]);

  return (
    <>
      <Title>Latest Workbook</Title>
      <Category>
        <CategoryItem>
          <button
            onClick={onClickType}
            name="all"
            className={`${clickType === "all" && "underLine"}`}
          >
            전체
          </button>
        </CategoryItem>
        <CategoryItem >
          <button
            onClick={onClickType}
            name="수능·내신"
            className={`${clickType === "수능·내신" && "underLine"}`}
          >
            수능·내신
          </button>
        </CategoryItem>
        <CategoryItem>
          <button
            onClick={onClickType}
            name="어학"
            className={`${clickType === "어학" && "underLine"}`}
          >
            어학
          </button>
        </CategoryItem>
        <CategoryItem>
          <button
            onClick={onClickType}
            name="자격증"
            className={`${clickType === "자격증" && "underLine"}`}
          >
            자격증
          </button>
        </CategoryItem>
        <CategoryItem>
          <button
            onClick={onClickType}
            name="시사·상식"
            className={`${clickType === "시사·상식" && "underLine"}`}
          >
            시사·상식
          </button>
        </CategoryItem>
        <CategoryItem>
          <button
            onClick={onClickType}
            name="기타"
            className={`${clickType === "기타" && "underLine"}`}
          >
            기타
          </button>
        </CategoryItem>
      </Category>
      <ItemBox>
        <Items>
          {post.slice(0, 10).map((a) => {
            //map이 순환을 함
            return (
              <li key={a.id}>
                <Link to={`/detail/${a.id}`} state={{ username: a.username }}>
                  <ItemImg>
                    {a.image ? (<img src={a.image} alt="문제집 이미지" />) : (<img src="img/basic.png" alt="기본 이미지"/>)}
                  </ItemImg>
                  <TextBox>
                    <ItemScr size="20px">{a.title}</ItemScr>
                    <ItemScr size="13px">만든이: {a.username}</ItemScr>
                    <ItemTxt>{a.content}</ItemTxt>
                  </TextBox>
                </Link>
              </li>
            );
          })}
        </Items>
      </ItemBox>
      <Link to="/Allpost">
        <MoreBtn>더보기</MoreBtn>
      </Link>
      
    </>
  );
}


const Title = styled.h2`
  /* width: 650px; */
  margin: 20px auto 40px;
  font-family: "Montserrat Alternates";
  font-weight: 700;
  font-size: 45px;
  text-align: center;
  letter-spacing: -2px;
`
//네브바
const Category = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  /* width: 1200px; */
  margin: 0 auto;
  min-width: 860px;
  width: 700px;
  /* border-bottom: 1px solid ${COLORS.light_gray}; */
`;

const CategoryItem = styled.li`
  margin: 0 35px;
  button {
    font-size: 17px;
    padding: 5px 10px;
  }
  position: relative;
  .underLine {
    background: ${COLORS.blue};
    color: ${COLORS.white};
    /* box-sizing: content-box; */
    /* border-bottom: 5px solid ${COLORS.blue}; */
    transition: all 0.5s;
  }
`;
//리스트
const ItemBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Items = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 1010px;
  li {
    margin: 0 5px 20px;
    width: 190px;
    height: 290px;
    border: 1px solid ${COLORS.light_gray};
    border-radius: 6px;
    overflow: hidden;
    a {
      display: inline-block;
      width: 190px;
      height: 290px;
    }
  }
  @media (max-width: 1024px) {
    justify-content: center;
  }
`;

const ItemImg = styled.div`
  width: 190px;
  height: 177px;
  border-bottom: 1px solid ${COLORS.light_gray};
  img {
    width: 190px;
    height: 177px;
    object-fit: cover;
  }
`;

const TextBox = styled.div`
  margin: 10px 10px;
`;

const ItemScr = styled.p`
  margin-bottom: 7px;
  font-size: ${(props) => props.size};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const ItemTxt = styled.p`
  display: inline-block;
  margin: 20px 10px 15px 0;
  width: 170px;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
//더보기 버튼
const MoreBtn = styled.div`
  display: block;
  margin: 35px auto 60px;
  width: 150px;
  height: 40px;
  border: 0.5px solid ${COLORS.light_gray};
  font-size: 15px;
  text-align: center;
  line-height: 40px;
`;
