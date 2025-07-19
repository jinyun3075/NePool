import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import Carousel from "./Carousel";
import Footer from "./Footer";
import HeaderSignin from "../header/Header";
import Post from "./Post";
import styled from "styled-components";
import axios from "axios";
import { API } from "../../constants";

export default function Home() {
  // const [scrollY, setScrollY] = useState(0);
  // const [BtnOFF, setBtnOff] = useState(false);

  const [allUser, setAllUser] = useState([
    {
      dtoList: {
        username: "",
        name: "",
        email: "",
        password: "",
        totalPage: "",
      },
      page: "",
      size: "",
      prev: "",
      next: "",
      start: "",
      end: "",
      pageList: "",
    },
  ]);
  const [post, setPost] = useState([
    {
      content: "",
      count: 0,
      id: "",
      share: false,
      title: "",
      username: "",
      image: "",
    },
  ]);

  const getUser = async () => {
    const res = await axios.get(`${API}/user`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setAllUser(res.data.dtoList);
  };
  // const getPost = async () => {
  //   const res = await axios.get(`${API}/workbook/page`, {
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   });
  //   setPost(res.data.dtoList);
  // };

  const allUserCount = allUser.length;
  // const allBookCount = post.length;
  // const handleScroll = () => {
  //   setScrollY(window.pageYOffset);
  //   if (scrollY > 30) {
  //     setBtnOff(true);
  //   } else {
  //     setBtnOff(false);
  //   }
  // };
  // const scrollTop = () => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  //   setScrollY(0);
  //   setBtnOff(false);
  // };

  // useEffect(() => {
  //   getUser();
  //   getPost();
  // }, []);
  // useEffect(() => {
  //   const watch = () => {
  //     window.addEventListener("scroll", handleScroll);
  //   };
  //   watch();
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // });

  return (
    <>
      <HeaderSignin />
      <Carousel allUserCount={allUserCount} />
      {/* <Post /> */}
      {/* <Banner allUserCount={allUserCount} allBookCount={allBookCount} /> */}
      {/* <Footer /> */}
      <TopBtn>
        {/* <button
          className={BtnOFF ? "topOn" : "active"}
          onClick={scrollTop}
        ></button> */}
      </TopBtn>
    </>
  );
}

const TopBtn = styled.div`
  .topOn {
    position: fixed;
    bottom: 5%;
    right: 3%;
    width: 40px;
    height: 40px;
    background: url(/img/top.svg) center/100%;
    :hover {
      position: fixed;
      bottom: 5%;
      right: 3%;
      width: 40px;
      height: 40px;
      background: url(/img/topHover.svg) center/100%;
    }
  }
  .active {
    z-index: 10;
    opacity: 1;
  }
`;
