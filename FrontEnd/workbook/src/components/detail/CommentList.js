import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { API } from '../../constants';

export default function CommentList({workbookId}) {

  const [comment, setComment] = useState([{
    dtoList: [],
    id: "",
    content: "",
    like: 0,
    writer: "",
    regDate: "",
    modeDate: "",
    totalPage: 0,
    page: 0,
    size: 0,
    prev: false,
    next: false,
    start: 0,
    end: 0,
    pageList: []
  }])

  const getComment = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API}/comment/${workbookId}`, {
        headers: {
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
    });
    // setComment(res.data);
    // console.log(res);
  };
    
  useEffect(() => {
    getComment();
  }, []);

  return (
    <>
      <CommentBox>
        <CommentInfo>
          <ReviewBox>
            <StarBox>
              <Star src="/img/star.svg" alt="별점" />
              <Star src="/img/star.svg" alt="별점" />
              <Star src="/img/star.svg" alt="별점" />
              <Star src="/img/star.svg" alt="별점" />
              <Star src="/img/star.svg" alt="별점" />
              <span>(4점)</span>
            </StarBox>
           <CommentText>리뷰입니다. 리뷰입니다.</CommentText>
          </ReviewBox>
          <AuthorBox>
            <AuthorImg src="/img/mango.jpg" alt="누구님의 프로필사진" />
            <AuthorNickName>망고언니</AuthorNickName>
          </AuthorBox>
        </CommentInfo>
      <CommentDate>2022.03.16</CommentDate>
      </CommentBox>
    </>
  )
}
const CommentBox = styled.li`
  padding: 30px 0 20px;
  border-bottom: 0.5px solid #dbdbdb;
`

const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const AuthorImg = styled.img`
  width: 36px;
  height: 36px;
  border: 0.5px solid #dbdbdb;
  border-radius: 50%;
  margin-right: 12px;
`;

const ReviewBox = styled.div`
display: flex;
flex-direction: column;
`

const StarBox = styled.div`
display: flex;
align-items: center;
span {
  font-size: 13px;
  margin-left: 5px;
  color: #767676;
}

`


const AuthorBox = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;

`

const Star = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 2px;
`

const AuthorNickName = styled.strong`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  display: block;
  margin: 6px 6px 0 0;
`;

const CommentDate = styled.span`
  font-weight: 400;
  font-size: 10px;
  line-height: 13px;
  color: #767676;
  margin-top: 8.5px;
  /* &::before {
    content: "·";
    margin-right: 4.5px;
  } */
`;

const CommentText = styled.p`
  margin-top: 15px;
  /* padding-left: 48px; */
  font-size: 14px;
  line-height: 18px;
  color: #333333;
`;

const Background = styled.div`
  &.true {
    position: fixed;
    top: 72px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #777;
    opacity: 0.4;
    z-index: 10;
  }
`;