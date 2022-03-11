import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeaderSignin from '../header/header';
import Carousel from './carousel';
import MainPost from './mainPost';
import Banner from './banner';
import Footer from './footer';

export default function Home() {
    const [scrollY, setScrollY] = useState(0);
    const [BtnOFF, setBtnOff] = useState(false);
    
    const handleScroll = () => {
        setScrollY(window.pageYOffset);
        if(scrollY > 30) {
            setBtnOff(true);
        } else {
            setBtnOff(false);
        }
    }
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setScrollY(0);
        setBtnOff(false);
    }

    useEffect(() => {
        const watch = () => {
            window.addEventListener('scroll', handleScroll);
        }
        watch();
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return (
        <>
          <HeaderSignin />
          <Carousel />
          <MainPost />
          <Banner />
          <Footer />
          <TopBtn><button className={BtnOFF ? "topOn" : "active"} onClick={scrollTop}></button></TopBtn>
        </>
    )
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
    `