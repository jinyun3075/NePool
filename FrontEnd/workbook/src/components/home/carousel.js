import React, { useEffect, useRef, useState } from "react";
import Slide from "./Slide";
import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants";
import SearchResult from "../header/Search";

export default function Carousel({ allUserCount }) {
  const totalSlide = 3;

  const searchRef = useRef();

  const [search, setSearch] = useState([
    {
      content: "",
      count: 0,
      id: "",
      mogDate: "",
      regDate: "",
      share: false,
      title: "",
      type: "",
      username: "",
    },
  ]);

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

  const [keyUp, setKeyUp] = useState();
  const [searchOn, setSearchOn] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const getResult = async () => {
    if (keyUp) {
      const res = await axios.get(`${API}/search/${keyUp}`, {
        headers: {
          "Content-type": "application/json",
        },
      });
      setSearch(res.data.workBook);
    }
  };

  const getUser = async () => {
    const res = await axios.get(`${API}/workbook/best4`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setGet(res.data);
  };

  const onKeyUp = (e) => {
    setKeyUp(e.target.value);
  };
  const openSearch = (e) => {
    setSearchOn(true);
    if (searchRef.current !== e.target) setSearchOn(false);
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

  useEffect(() => {
    getResult();
  }, [keyUp]);

  useEffect(() => {
    window.addEventListener("click", openSearch);
    return () => {
      window.removeEventListener("click", openSearch);
    };
  }, []);

  return (
    <>
      <MainBox>
        <MainTit>
          You make <span>Workbook</span>
        </MainTit>
        <SearchBox>
          <SearchBtn>
            <img src="/img/search.svg" alt="돋보기" />
          </SearchBtn>
          <SearchInp
            onFocus={openSearch}
            onChange={onKeyUp}
            ref={searchRef}
            type="text"
            placeholder="문제집을 검색해 보세요!"
          />
          {searchOn && (
            <CloseBtn type="reset">
              <img src="/img/close.svg" alt="지우기" />
            </CloseBtn>
          )}
          {searchOn === true ? <SearchResult search={search} /> : null}
        </SearchBox>
        <MainTitle>Best 4</MainTitle>
        {/* <MainTitle>{allUserCount}명의 학생이 인정한 BEST 문제집</MainTitle> */}
        <CarouselBox>
          <BtnBox>
            <img src="/img/prev.svg" alt="이전버튼" onClick={Prev} />
            <img src="/img/next.svg" alt="다음버튼" onClick={Next} />
          </BtnBox>
          <CarouselList>
            <Slide get={get} getSlide={getSlide} currentSlide={currentSlide} />
          </CarouselList>
        </CarouselBox>
      </MainBox>
    </>
  );
}

const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainTit = styled.p`
  margin: 70px 0 40px;
  width: 650px;
  font-family: "Montserrat Alternates";
  font-style: bold;
  font-weight: 700;
  font-size: 80px;
  text-align: center;
  letter-spacing: -2px;
  span {
    color: ${COLORS.blue};
  }
  @media (max-width: 520px) {
    font-size: 61px;
  }
`;

const SearchBox = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  margin: 15px 0 0;
  width: 360px;
`;

const SearchBtn = styled.button`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  z-index: 20;
  img {
    width: 20px;
    height: 20px;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  margin-left: 321px;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  img {
    width: 15px;
    height: 15px;
  }
`;

const SearchInp = styled.input`
  position: absolute;
  padding: 0 40px 0 40px;
  width: 280px;
  height: 40px;
  border: 0.5px solid ${COLORS.light_gray};
  border-radius: 3px;
  font-size: 15px;
  transition: 500ms width ease-in-out;
  ::placeholder {
    color: ${COLORS.light_gray};
    font-size: 14px;
    line-height: 40px;
  }
  :focus {
    border: 2px solid ${COLORS.blue};
    outline: none;
  }
`;

const MainTitle = styled.h3`
  margin: 100px 0 20px;
  width: 650px;
  font-family: "Montserrat Alternates";
  font-weight: 700;
  font-size: 45px;
  text-align: center;
  letter-spacing: -2px;
  span {
    color: ${COLORS.blue};
  }
`;
//캐러셀 슬라이드 구현
const CarouselBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px auto 120px;
  width: 830px;
  overflow: hidden;
  @media (max-width: 860px) {
    width: 300px;
  }
`;

const CarouselList = styled.ul`
  display: flex;
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
  @media (max-width: 1060px) {
    width: 800px;
    height: 236px;
  }
  @media (max-width: 860px) {
    padding-top: 30px;
    width: 470px;
    height: 300px;
  }
  @media (max-width: 520px) {
    padding-top: 30px;
    width: 370px;
    height: 300px;
  }
`;
