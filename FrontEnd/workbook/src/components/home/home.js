import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderSignin from "../header/header";
import Carousel from "./carousel";
import Banner from "./banner";
import Footer from "./footer";
import Post from "./post";
import axios from "axios";
import { API } from "../../constants";

export default function Home() {
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

  const getUser = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/user`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    setAllUser(res.data.dtoList);
  };

  useEffect(() => {
    getUser();
  }, []);

  const allUserCount = allUser.length;
  // console.log(allUserCount);

  const [post, setPost] = useState([
    {
      content: "",
      count: 0,
      id: "",
      share: false,
      title: "",
      username: "",
    },
  ]);

  const getPost = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/workbook?page=1&size=5000`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    setPost(res.data.dtoList);
  };

  useEffect(() => {
    getPost();
  }, []);

  const allBookCount = post.length;

  const [scrollY, setScrollY] = useState(0);
  const [BtnOFF, setBtnOff] = useState(false);

  const handleScroll = () => {
    setScrollY(window.pageYOffset);
    if (scrollY > 30) {
      setBtnOff(true);
    } else {
      setBtnOff(false);
    }
  };
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0);
    setBtnOff(false);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleScroll);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <HeaderSignin />
      <Carousel allUserCount={allUserCount} />
      <Post allUserPost={post} />
      <Banner allUserCount={allUserCount} allBookCount={allBookCount} />
      <Footer />
      <TopBtn>
        <button
          className={BtnOFF ? "topOn" : "active"}
          onClick={scrollTop}
        ></button>
      </TopBtn>
    </>
  );
}

const TopBtn = styled.div`
  .topOn {
    position: fixed;
    width: 40px;
    height: 40px;
    background: url(/img/top.svg) center/100%;
    bottom: 5%;
    right: 3%;
    :hover {
      position: fixed;
      width: 40px;
      height: 40px;
      background: url(/img/topHover.svg) center/100%;
      bottom: 5%;
      right: 3%;
    }
  }
  .active {
    z-index: 10;
    opacity: 1;
  }
`;
