import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

export default function Footer() {
  return (
    <FooterBox>
      <span>Copyright © 일오삼비 All right reserved.</span>
    </FooterBox>
  );
}

const FooterBox = styled.div`
  height: 150px;
  border-top: 1px solid ${COLORS.light_gray};
  text-align: center;
  span {
    color: ${COLORS.gray};
    font-size: 13px;
    line-height: 150px;
  }
`;
