import React from "react";
import styled from "styled-components";

export default function Slide() {
  return (
    <>
      <CarouselItem>
        <img src="/img/book.svg" alt="문제집 이미지" />
      </CarouselItem>
      <CarouselItem>
        <img src="/img/book.svg" alt="문제집 이미지" />
      </CarouselItem>
      <CarouselItem>
        <img src="/img/book.svg" alt="문제집 이미지" />
      </CarouselItem>
      <CarouselItem>
        <img src="/img/book.svg" alt="문제집 이미지" />
      </CarouselItem>
      <CarouselItem>
        <img src="/img/book.svg" alt="문제집 이미지" />
      </CarouselItem>
      <CarouselItem>
        <img src="/img/book.svg" alt="문제집 이미지" />
      </CarouselItem>
      <CarouselItem>
        <img src="/img/book.svg" alt="문제집 이미지" />
      </CarouselItem>
      <CarouselItem>
        <img src="/img/book.svg" alt="문제집 이미지" />
      </CarouselItem>
      <CarouselItem>
        <img src="/img/book.svg" alt="문제집 이미지" />
      </CarouselItem>
      <CarouselItem>
        <img src="/img/book.svg" alt="문제집 이미지" />
      </CarouselItem>
      <CarouselItem>
        <img src="/img/book.svg" alt="문제집 이미지" />
      </CarouselItem>
      <CarouselItem>
        <img src="/img/book.svg" alt="문제집 이미지" />
      </CarouselItem>
    </>
  );
}

const CarouselItem = styled.li`
  margin: 0 10px;
  img {
    width: 210px;
    height: 300px;
    border-radius: 6px;
  }
`;
