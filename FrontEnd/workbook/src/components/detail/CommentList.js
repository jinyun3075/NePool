import {useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API, COLORS } from '../../constants';

export default function CommentList({comment, user}) {
  const token = sessionStorage.getItem("token");

  const {content, id, like, regDate, writer} = comment;
  
  const [allUser, setAllUser] = useState([
    {
      email: "",
      id: "",
      image: "",
      name: "",
      password: "",
      username: "",
    }
  ]);
  
  const [writerImg, setWriterImg] = useState("");
  const [rating, setRating] = useState(0);
  const stars = Array(5).fill(0);

  const [loading, setLoading] = useState(false);

  const getAllUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/user`, {
        headers: {
          "Content-type" : "application/json",
        },
      });
      setAllUser(res.data.dtoList);
    } catch(err) {
      console.log(err);
    }
  };

  const userFind = () => {
    allUser.map((v) => {v.name === writer && setWriterImg(v.image)});
  };

  const timeSet = (regDate) => {
    const today = new Date();
    const getPostTime = new Date(regDate);

    getPostTime.setHours(getPostTime.getHours()+9);

    const timeSec = Math.floor((today.getTime() - getPostTime.getTime()) / 1000 / 60 );

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

  const updatedDate = timeSet(regDate);

  const deleteComment = async () => {
    await axios.delete(`${API}/comment/${id}/${writer}`, {
      headers: {
        "Content-type" : "application/json",
        "Authorization" : `Bearer ${token}`,
      },
    });
    window.location.reload();
  };

  useEffect(() => {
    getAllUser();
    setRating(like);
    return () => { setLoading(false) }
  }, []);

  useEffect(() => {
    userFind();
  }, [allUser]);

  return (
    <CommentBox>
      <CommentInfo>
        <ReviewBox>
          <StarBox>
            {stars.map((star, index) => {
              return (
                <Star 
                  key={index}
                  src={(rating) >  index ? "/img/starCheck.svg" : "/img/star.svg"}
                  alt="별점"
                />
              )
            })}
            <span>{like}</span>
          </StarBox>
          <CommentText>{content}</CommentText>
        </ReviewBox>
        <AuthorBox>
          <AuthorImg src={writerImg} alt="프로필사진" />
          <AuthorNickName>{writer}</AuthorNickName>
        </AuthorBox>
      </CommentInfo>
      <CommentUtil>
        <CommentDate>{updatedDate}</CommentDate>
        {user.name === writer && <button onClick={deleteComment}>삭제</button>}
      </CommentUtil>
    </CommentBox>
  )
}

const CommentBox = styled.li`
  padding: 30px 0 20px;
  border-bottom: 0.5px solid ${COLORS.white_gray};
`;

const CommentInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4px;
`;

const CommentUtil = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    margin-top: 5px;
    color: ${COLORS.gray};
    font-size: 13px;
  }
`;

const AuthorImg = styled.img`
  width: 36px;
  height: 36px;
  border: 0.5px solid ${COLORS.white_gray};
  border-radius: 50%;
`;

const ReviewBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StarBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1px;
  span {
    margin-left: 8px;
    color: ${COLORS.gray};
    font-size: 13px;
  }
`;

const AuthorBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Star = styled.img`
  display: block;
  width: 20px;
  height: 20px;
`;

const AuthorNickName = styled.strong`
  display: -webkit-box;
  margin: 3px 0;
  width: 60px;
  font-size: 13px;
  font-weight: 500;
  line-height: 18px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const CommentDate = styled.span`
  margin-top: 8.5px;
  color: ${COLORS.gray};
  font-size: 10px;
  font-weight: 400;
  line-height: 13px;
`;

const CommentText = styled.p`
  padding: 0 20px 0 2px;
  margin-top: 15px;
  color: ${COLORS.text_gray};
  font-size: 14px;
  line-height: 18px;
`;
