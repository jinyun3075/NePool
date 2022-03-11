import React from 'react';
import styled from 'styled-components';

export default function Carousel() {
    return (
        <>
            <MainBox>
                <MainTitle>0,004 학생이 인정한 BEST 문제집</MainTitle>
                <CarouselBox>
                    <CarouselList>
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
                    <BtnBox>
                        <button type="button">
                            <img src="/img/<.svg" alt="이전버튼" />
                        </button>
                        <button type="button">
                            <img src="/img/>.svg" alt="다음버튼" />
                        </button>
                    </BtnBox>
                    </CarouselList>
                </CarouselBox>
            </MainBox>
        </>
    )
}

const MainBox = styled.div`
    height: 530px;
    background-color: rgba(47,128,237,0.27);
`
const MainTitle = styled.h3`
    color: #000000;
    font-size: 33px;
    font-weight: 500;
    text-align: center;
    padding-top: 67px;
`
//캐러셀 슬라이드 구현
const CarouselBox = styled.div`
   margin: 30px 0;
`
const CarouselList = styled.ul`
    display: flex;
    justify-content: center;
`
const CarouselItem = styled.li`
    margin: 0 10px;
    img {
        width: 210px;
        height: 300px;
        border-radius: 6px;
    }
`
const BtnBox = styled.div`
    position: absolute;
    display: flex;
    width: 1060px;
    height: 300px;
    justify-content: space-between;
`