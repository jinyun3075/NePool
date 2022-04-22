import React, { useEffect, useState } from "react";
import Slide from "./Slide";
import styled from "styled-components";
import axios from "axios";
import { API } from "../../constants";

export default function Carousel({ allUserCount }) {
  const totalSlide = 3;

  const [get, setGet] = useState([
    {
      id: "",
      title: "",
      content: "",
      share: "",
      username: "",
      image: "",
      count: "",
      type: "",
      regDate: "",
      modDate: "",
    },
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);

  const getUser = async () => {
    const res = await axios.get(`${API}/workbook/best4`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setGet(res.data);
  };

  const Next = () => {
    currentSlide >= totalSlide
      ? setCurrentSlide(0)
      : setCurrentSlide(currentSlide + 1);
  };
  const Prev = () => {
    currentSlide === 0
      ? setCurrentSlide(totalSlide)
      : setCurrentSlide(currentSlide - 1);
  };
  const getSlide = get[currentSlide];

  useEffect(() => {
    getUser();
  }, []);


  return (
    <>
      <MainBox>
        <MainTitle>{allUserCount}명의 학생이 인정한 BEST 문제집</MainTitle>
        <CarouselBox>
          <BtnBox>
            <img src="/img/prev.svg" alt="이전버튼" onClick={Prev} />
            <img src="/img/next.svg" alt="다음버튼" onClick={Next}/>
          </BtnBox>
          <CarouselList>
            <Slide 
              get={get} 
              getSlide={getSlide} 
              currentSlide={currentSlide} 
            />
          </CarouselList>
        </CarouselBox>
      </MainBox>
    </>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  background-color: rgba(47, 128, 237, 0.27);
`;

const MainTitle = styled.h3`
  padding-top: 67px;
  font-size: 33px;
  font-weight: 500;
  color: #000000;
  text-align: center;
`;
//캐러셀 슬라이드 구현
const CarouselBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px auto;
  width: 830px;
  overflow: hidden;
`;

const CarouselList = styled.ul`
  display: flex;
  width: 850px;
  z-index: 1;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 1060px;
  height: 300px;
  img {
    width: 35px;
    height: 35px;
    cursor: pointer;
  }
`;
