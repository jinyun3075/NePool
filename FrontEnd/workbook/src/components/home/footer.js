import React from 'react';
import styled from 'styled-components';

export default function Footer() {
    return (
        <>
           <FooterBox>
               <span>Copyright © 일오삼비 All right reserved.</span>
           </FooterBox>
        </>
    )
}

const FooterBox = styled.div`
    height: 150px;
    border-top: 1px solid #b6b6b6;
    text-align: center;
    span {
        font-size: 13px;
        line-height: 150px;
        color: #767676;
    }
`