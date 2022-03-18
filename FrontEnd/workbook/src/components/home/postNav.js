import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function PostNav() {

  return (
    <>
      <Category>
        <CategoryItem>
          <button>전체</button>
        </CategoryItem>
        <CategoryItem>
          <button>수능내신</button>
        </CategoryItem>
        <CategoryItem>
          <button>어학자격증</button>
        </CategoryItem>
        <CategoryItem>
          <button>국가기술자격증</button>
        </CategoryItem>
        <CategoryItem>
          <button>국가전문자격증</button>
        </CategoryItem>
        <CategoryItem>
          <button>기타자격증</button>
        </CategoryItem>
      </Category>
      {/* <MoreBtn href="#">더보기</MoreBtn> */}
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
