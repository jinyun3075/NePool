import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

export default function PostBtn({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
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
  background: ${COLORS.black};
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
