import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Slide from "./slide";

export default function Carousel() {
  const totalSlide = 3;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  //next 버튼 클릭
  const Next = () => {
    currentSlide >= totalSlide
      ? setCurrentSlide(0)
      : setCurrentSlide(currentSlide + 1);
  };
  //prev 버튼 클릭
  const Prev = () => {
    currentSlide === 0
      ? setCurrentSlide(totalSlide)
      : setCurrentSlide(currentSlide - 1);
  };

  useEffect(() => {
    slideRef.current.style.transition = "all 0.5s ease-in-out";
    slideRef.current.style.transform = `translateX(-${currentSlide}00%)`; // 백틱을 사용하여 슬라이드로 이동하는 에니메이션을 만듭니다.
  }, [currentSlide]);

  return (
    <>
      <MainBox>
        <MainTitle>0,004 학생이 인정한 BEST 문제집</MainTitle>
        <CarouselBox>
          <CarouselList ref={slideRef}>
            <Slide />
          </CarouselList>
          <BtnArr>
            <BtnBox>
              <button type="button" onClick={Prev}>
                <img src="/img/prev.svg" alt="이전버튼" />
              </button>
              <button type="button" onClick={Next}>
                <img src="/img/next.svg" alt="다음버튼" />
              </button>
            </BtnBox>
          </BtnArr>
        </CarouselBox>
      </MainBox>
    </>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 530px;
  background-color: rgba(47, 128, 237, 0.27);
`;
const MainTitle = styled.h3`
  color: #000000;
  font-size: 33px;
  font-weight: 500;
  text-align: center;
  padding-top: 67px;
`;
//캐러셀 슬라이드 구현
const CarouselBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px auto;
  overflow: hidden;
  width: 900px;
`;
const CarouselList = styled.ul`
  display: flex;
  justify-content: center;
  width: 900px;
`;
const BtnArr = styled.div`
  position: absolute;
  margin-right: 1060px;
`;
const BtnBox = styled.div`
  position: absolute;
  display: flex;
  width: 1060px;
  height: 300px;
  justify-content: space-between;
`;
