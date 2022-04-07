import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { API } from "../../constants";

export default function Slide({ get, ggggg, currentSlide }) {
  // console.log();

  const workBookId = ggggg.id;

  const [star, setStar] = useState(0);

  const getStar = async () => {
    const res = await axios.get(`${API}/comment/like/${workBookId}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setStar(res.data);
  };

  const starView = parseInt(star * 15);

  useEffect(() => {
    getStar();
  }, [workBookId]);

  return (
    <>
      <Link to={`/detail/${ggggg.id}`} state={{ username: ggggg.username }}>
        <CarouselItem>
          <WhiteBox>
            <BestCont>
              <ItemScr size="30px">{ggggg.title}</ItemScr>
              <ItemScr size="16px">만든이:{ggggg.username}</ItemScr>
              {star > 0 &&  
              <StarBox style ={{width: starView}}>
                <FiveStarf src="/img/fiveStarf.svg" alt="체크별점" />
              </StarBox>   
              }
              <FiveStar src="/img/fiveStar.svg" alt="별점" />
              <ItemCont size="16px">{ggggg.content}</ItemCont>
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
  border-radius: 6px;
`;
const WhiteBox = styled.div`
  position: absolute;
  /* top: 223px; */
  width: 415px;
  height: 280px;
  border-radius: 6px;
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
  margin-bottom: 15px;
  font-size: ${(props) => props.size};
`;
const ItemCont = styled.p`
  margin-top: 50px;
  font-size: ${(props) => props.size};
`;

const StarBox = styled.div`
  z-index: 100;
  overflow: hidden;
`;
const FiveStarf = styled.img`
  z-index: 10;
  width: 75px;
  height: 15px;
`;
const FiveStar = styled.img`
  position: absolute;
  width: 75px;
  height: 15px;
  margin-top: 23px;
`;
