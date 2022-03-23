import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { API } from "../../constants";

export default function Slide({ ggggg, currentSlide }) {
  console.log(ggggg);
  
  return (
    <>
      <CarouselItem>
        <img src={`/img/slide${currentSlide + 1}.svg`} alt="문제집 이미지" />
        <WhiteBox>
          <BestCont>
            <ItemScr size="30px">{ggggg.title}</ItemScr>
            <ItemScr size="16px">만든이:{ggggg.username}</ItemScr>
            <ItemScr size="16px">⭐️⭐️⭐️⭐️⭐️(4.5)</ItemScr>
            <ItemScr size="16px">{ggggg.content}</ItemScr>
          </BestCont>
        </WhiteBox>
      </CarouselItem>
    </>
  );
}

const CarouselItem = styled.li`
  margin: 0 10px;
  img {
    width: 830px;
    height: 280px;
    border-radius: 6px;
  }
`;
const WhiteBox = styled.div`
  position: absolute;
  top: 0;
  width: 415px;
  height: 280px;
  background-color: rgba(0, 0, 0, 0.1);
`;
const BestCont = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 30px 30px;
  font-size: ${(props) => props.size};
`;
const ItemScr = styled.p`
  margin-bottom: 7px;
  font-size: ${(props) => props.size};
  :nth-child(3) {
    margin-bottom: 40px;
  }
`;
