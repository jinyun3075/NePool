import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostBtn from "./PostButton";
import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants";

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

  const [page, setPage] = useState([]);
  const [number, setNumber] = useState(1);
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(false);
  const [clickType, setClickType] = useState("all");

  const getUser = async () => {
    const res = await axios.get(
      `${API}/workbook/page?page=${number}&size=10&type=${clickType}`,
      {
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    setPost(res.data.dtoList);
    setPage(res.data.pageList);
    setNext(res.data.next);
    setPrev(res.data.prev);
  };

  const onClickNum = (e) => {
    setNumber(e.target.value);
  };
  const onClickType = (e) => {
    setClickType(e.target.name);
    setNumber(1);
  };
  const onClickNext = () => {
    setNumber(parseInt((number - 1) / 5) * 5 + 6);
  };
  const onClickPrev = () => {
    setNumber(parseInt((number - 1) / 5) * 5 - 4);
  };

  useEffect(() => {
    getUser();
  }, [clickType, number]);

  return (
    <>
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
        <CategoryItem>
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
          {post.map((postData) => {
            return (
              <li key={postData.id}>
                <Link
                  to={`/detail/${postData.id}`}
                  state={{ username: postData.username }}
                >
                  <ItemImg>
                    {postData.image ? (
                      <img src={postData.image} alt="문제집 이미지" />
                    ) : (
                      <img src="img/basic.png" alt="기본이미지" />
                    )}
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
      <PostBtn
        page={page}
        onClickNum={onClickNum}
        next={next}
        prev={prev}
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
      />
    </>
  );
}

const Category = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 80px;
  @media (max-width: 900px) {
    flex-wrap: wrap;
    padding: 20px;
  }
  @media (max-width: 520px) {
    flex-wrap: nowrap;
    justify-content: flex-start;
    margin: 0 0 30px;
    width: 360px;
    height: 30px;
    overflow: hidden;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 15px;
      background-color: ${COLORS.light_gray};
    }
    &::-webkit-scrollbar-track {
      background-color: ${COLORS.white};
    }
  }
`;

const CategoryItem = styled.li`
  margin: 0 35px;
  button {
    padding: 5px 10px;
    font-size: 17px;
  }
  .underLine {
    background: ${COLORS.blue};
    color: ${COLORS.white};
    transition: all 0.5s;
  }
  @media (max-width: 520px) {
    margin: 0 20px;
    button {
      padding: 5px 7px;
      width: 70px;
      font-size: 14px;
    }
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
  @media (max-width: 420px) {
    li {
      width: 250px;
      height: 350px;
      transition: all 0.2s;
    }
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
  @media (max-width: 420px) {
    width: 250px;
    height: 230px;
    img {
      width: 250px;
      height: 230px;
      transition: all 0.2s;
    }
  }
`;

const TextBox = styled.div`
  margin: 10px 10px;
`;

const ItemScr = styled.p`
  margin-bottom: 7px;
  text-overflow: ellipsis;
  font-size: ${(props) => props.size};
  white-space: nowrap;
  overflow: hidden;
`;

const ItemTxt = styled.p`
  margin: 20px 10px 15px 0;
  display: inline-block;
  width: 170px;
  font-size: ${(props) => props.size};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
