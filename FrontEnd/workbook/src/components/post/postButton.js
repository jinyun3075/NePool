import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

export default function PostBtn({page, onClickNum, next, prev}) {

  return (
    <>
      <Nav>
        <Button disabled={prev === false} >
          &lt;
        </Button>
        {page.map((number)=>{
          return (
        <Button key={number} value={number} onClick={onClickNum}>
          {number}
        </Button>
          )
        })}
        <Button disabled={next === false}>
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
  `
  
  const Button = styled.button`
  border: none;
  border-radius: 6px;
  width: 30px;
  height: 30px;
  /* padding: 8px; */
  margin: 0;
  background: ${COLORS.blue};
  color: white;
  font-size: 15px;

  &:hover {
    background: ${COLORS.gray};
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: ${COLORS.light_gray};
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: ${COLORS.blue};
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
