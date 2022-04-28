import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants";

export default function Slide({ getSlide, currentSlide }) {
  const workBookId = getSlide.id;
  const [star, setStar] = useState(0);

  const starView = parseInt(star * 15);

  const getStar = async () => {
    const res = await axios.get(`${API}/comment/like/${workBookId}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setStar(res.data);
  };

  useEffect(() => {
    getStar();
  }, [workBookId]);

  return (
    <>
      <Link
        to={`/detail/${getSlide.id}`}
        state={{ username: getSlide.username }}
      >
        <CarouselItem>
          <WhiteBox>
            <BestCont>
              <FlexBox>
                <ItemTitle size="30px">{getSlide.title}</ItemTitle>
                <Star>
                  {star > 0 && <StarBox style={{ width: starView }}></StarBox>}
                </Star>
              </FlexBox>
              <ItemCont size="16px">{getSlide.content}</ItemCont>
              <ItemUser size="16px">만든이:{getSlide.username}</ItemUser>
            </BestCont>
          </WhiteBox>
          <SlideImg
            src={`/img/slide${currentSlide + 1}.svg`}
            alt="문제집 이미지"
          />
        </CarouselItem>
      </Link>
    </>
  );
}

const CarouselItem = styled.li`
  margin: 0 10px;
`;

const SlideImg = styled.img`
  width: 830px;
  height: 280px;
  border-radius: 3px;
  @media (max-width: 1060px) {
    width: 700px;
    height: 236px;
  }
  @media (max-width: 860px) {
    display: none;
  }
`;

const WhiteBox = styled.div`
  position: absolute;
  width: 415px;
  height: 280px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.1);
  @media (max-width: 1060px) {
    width: 300px;
    height: 236px;
  }
  @media (max-width: 860px) {
    position: static;
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }
`;

const BestCont = styled.div`
  margin: 30px 30px;
  @media (max-width: 860px) {
    padding: 40px 0px;
  }
`;

const ItemTitle = styled.p`
  padding: 0 0 10px;
  margin: 0 0 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  color: ${COLORS.black};
  font-size: 35px;
  font-weight: bold;
  @media (max-width: 1060px) {
    font-size: 30px;
  }
`;

const FlexBox = styled.div`
  margin: 8px 0;
`;
const ItemUser = styled.p`
  font-size: 14px;
  text-align: end;
`;

const Star = styled.div`
  width: 75px;
  height: 15px;
  background-image: url(/img/fiveStar.svg);
  background-size: 75px 15px;
`;

const StarBox = styled.div`
  height: 15px;
  background-image: url(/img/fiveStarf.svg);
  background-size: 75px 15px;
  z-index: 100;
  overflow: hidden;
`;

const ItemCont = styled.p`
  margin: 0 0 50px;
  font-size: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
`;