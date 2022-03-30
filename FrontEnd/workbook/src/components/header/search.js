import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

export default function SearchResult({search}) {
  return (
    <>
      <NoticeBox>
        <div>
          <SearchList>
              {search !== undefined &&  (
                  <>
                {search.map((data) => {
                    return (
                  <NoticeCont key = {data.id}>
                    <p>만든이: {data.username}</p>
                    <p>{data.title}</p>
                  </NoticeCont>
                    )
                })}
                </>
              )}
          </SearchList>
        </div>
      </NoticeBox>
    </>
  );
}

const NoticeBox = styled.div`
  z-index: 0;
  position: absolute;
  width: 360px;
  top: 55px;

  div {
    width: 360px;
    height: 210px;
    padding-top: 7px;
    padding-bottom: 7px;
    border: 2px solid #2f80ed;
    border-top: none;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    color: #767676;
    background-color: white;
    &::after {
      position: absolute;
      content: "";
      width: 345px;
      border-top: 2px solid #b6b6b6;
      top: 7px;
      right: 5px;
    }
  }
`;
const SearchList = styled.ul`
  padding-top: 10px;
  overflow-x: auto;
  overflow-y: scroll;
  max-height: 200px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.light_gray};
    border-radius: 15px;
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
`;
const NoticeCont = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  height: 100px;
  padding-left: 20px;
  &:hover {
    background-color: #edf5ff;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;
