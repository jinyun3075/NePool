import React from "react";
import styled from "styled-components";

export default function PostBtn() {
  return (
    <>
        <PageBtn>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
        </PageBtn>
    </>
  );
}

const PageBtn = styled.div`
    display: flex;
    justify-content: center;
    margin: 50px auto;
    button {
        width: 40px;
        height: 40px;
        border: 1px solid #b6b6b6;
        font-size: 20px;
        color: #b6b6b6;
        margin: auto 5px;
    }
`
