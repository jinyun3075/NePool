import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants";

export default function SearchResult({ search }) {
  return (
    <>
      <NoticeBox>
        <div>
          <SearchList>
            {search !== undefined && (
              <>
                {search.map((data) => {
                  return (
                      <Link 
                      to={`/detail/${data.id}`}
                      state={{username: data.username}}
                      key={data.id}
                      >
                        <NoticeCont >
                          <p>만든이: {data.username}</p>
                          <p>{data.title}</p>
                        </NoticeCont>
                      </Link>
                  );
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
  position: absolute;
  top: 55px;
  width: 360px;
  z-index: 3;
  div {
    padding-top: 7px;
    padding-bottom: 7px;
    width: 360px;
    height: 210px;
    border: 2px solid ${COLORS.blue};
    border-top: none;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    background-color: white;
    color: ${COLORS.gray};
    &::after {
      content: "";
      position: absolute;
      top: 7px;
      right: 5px;
      width: 345px;
      border-top: 2px solid ${COLORS.light_gray};
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
    border-radius: 15px;
    background-color: ${COLORS.light_gray};
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
  padding-left: 20px;
  height: 100px;
  &:hover {
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    background-color: #edf5ff;
  }
`;
