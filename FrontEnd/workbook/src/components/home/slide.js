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
              <ItemTitle size="30px">{ggggg.title}</ItemTitle>
              <ItemUser size="16px">만든이:{ggggg.username}</ItemUser>
             <Star>
                {star > 0 &&  
                <StarBox style ={{width: starView}}>
                </StarBox>   
                }
             </Star>
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
  margin: 30px 30px;
`
const ItemTitle = styled.p`
  font-size: 30px;
`
const ItemUser = styled.p`
  margin: 15px 0;
`
const Star = styled.div`
  width: 75px;
  height: 15px;
  background-image: url(/img/fiveStar.svg);
  background-size: 75px 15px;
`
const StarBox = styled.div`
  height: 15px;
  z-index: 100;
  overflow: hidden;
  background-image: url(/img/fiveStarf.svg);
  background-size: 75px 15px;
`

const ItemCont = styled.p`
  margin-top: 50px;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  overflow: hidden;
`