import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { API } from '../../constants';

export default function CommentList({comment}) {

  const {content, id, like, modDate, regDate, writer} = comment

  const timeSet = (regDate) => {
    const today = new Date()
    const getPostTime = new Date(regDate)

    getPostTime.setHours(getPostTime.getHours()+9)

    const timeSec = Math.floor((today.getTime() - getPostTime.getTime()) / 1000 / 60 )

    if(timeSec < 1) return '방금 전'
    if(timeSec < 60) return `${timeSec}분 전`

    const timeHour = Math.floor(timeSec / 60);
    if (timeHour < 24) return `${timeHour}시간 전`

    const timeDay = Math.floor(timeHour / 24);
    if (timeDay < 7) return `${timeDay}일 전`

    const timeWeek = Math.round(timeDay / 7);
    if (timeWeek < 4) return `${timeWeek}주 전`
    
    const timeMonth = Math.round(timeDay / 30);
    if (timeMonth < 12) return `${timeMonth}개월 전`

    const timeYear = Math.floor(timeMonth / 365);
    return `${Math.floor(timeYear / 365)}년 전`;
  }

  const updatedDate = timeSet(regDate)

  const [rating, setRating] = useState(0)

  useEffect(() => {
    setRating(like)
  })

  const stars = Array(5).fill(0)

  return (
    <>
      <CommentBox>
        <CommentInfo>
          <ReviewBox>
            <StarBox>
              {stars.map((star, index) => {
              return (
                <Star 
                  key={index} 
                  src={(rating) >  index ? "/img/starCheck.svg" : "/img/star.svg"}
                  alt="별점"/>
              )
            })}
              <span>{like}</span>
            </StarBox>
           <CommentText>{content}</CommentText>
          </ReviewBox>
          <AuthorBox>
            <AuthorImg src="/img/mango.jpg" alt="누구님의 프로필사진" />
            <AuthorNickName>{writer}</AuthorNickName>
          </AuthorBox>
        </CommentInfo>
      <CommentDate>{updatedDate}</CommentDate>
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
  /* margin-right: 12px; */
`;

const ReviewBox = styled.div`
display: flex;
flex-direction: column;
`

const StarBox = styled.div`
display: flex;
align-items: center;
gap: 1px;
span {
  font-size: 13px;
  margin-left: 8px;
  color: #767676;
}

`


const AuthorBox = styled.div`
display: flex;
flex-direction: column;

`

const Star = styled.img`
  width: 20px;
  height: 20px;
  display: block;
  /* margin-left: 2px; */
`

const AuthorNickName = styled.strong`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  /* display: block; */
  /* margin: 6px auto; */
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
  padding: 0 20px 0 2px;
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