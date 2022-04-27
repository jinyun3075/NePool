import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

export default function PostBtn({
  page,
  onClickNum,
  next,
  prev,
  onClickNext,
  onClickPrev,
}) {
  return (
    <>
      <Nav>
        <Button onClick={onClickPrev} disabled={prev === false}>
          &lt;
        </Button>
        {page.map((number) => {
          return (
            <Button key={number} value={number} onClick={onClickNum}>
              {number}
            </Button>
          );
        })}
        <Button onClick={onClickNext} disabled={next === false}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  margin: 0;
  height: 30px;
  width: 30px;
  border: none;
  border-radius: 6px;
  background: ${COLORS.blue};
  color: white;
  font-size: 15px;
  &:hover {
    transform: translateY(-2px);
    background: ${COLORS.gray};
    cursor: pointer;
  }
  &[disabled] {
    transform: revert;
    background: ${COLORS.light_gray};
    cursor: revert;
  }
`;
