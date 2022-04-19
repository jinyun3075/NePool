import { useEffect, useState } from 'react';
import CommentList from './CommentList';
import styled from 'styled-components';
import axios from 'axios';
import { API, COLORS } from '../../constants'

export default function Comments({workbookId}) {
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");
  
  const [userInfo, setUserInfo] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    image: ""
  });

  const userId = userInfo.id;

  const [comments, setComment] = useState([{
    content: "",
    id: "",
    like: 0,
    writer: "",
    regDate: "",
    modeDate: "",
  }]);

  const [text, setText] = useState("");
  const [isText, setIsText] = useState(false);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const stars = Array(5).fill(0);
  const [starCount, setStarCount] = useState(0);

  const getUser = async () => {
    const res = await axios.get(`${API}/user/${user}`, {
        headers: {
            "Content-type" : "application/json",
        },
    });
    setUserInfo(res.data);
  };

  const getComment = async () => {
    const res = await axios.get(`${API}/comment/${workbookId}?page=1&size=500`, {
      headers: {
        "Content-type" : "application/json",
        "Authorization" : `Bearer ${token}`,
      },
    });
    setComment(res.data.dtoList);
  };

  const onChange = (e) => {
    setText(e.target.value);
    if(e.target.value.length > 0 && e.target.value.length < 500) {
      setIsText(true);
    } else {
      setIsText(false);
    }
  };

  const byteCheck = (str) => {
    return str
    .split('')
    .map(s => s.charCodeAt(0))
    .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0); 
  };

  const onSaveRating = (index) => {
    setRating(index);
    setStarCount(index);
  };

  const onMouseEnter = (index) => setHoverRating(index);
  
  const onMouseLeave = () => setHoverRating(undefined);
  
  useEffect(() => {
    getUser();
  }, []);
    
  useEffect(() => {
    byteCheck(text);
    if(token) getComment();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const contentData = {
      content: text,
      like: starCount,
    };
    await axios.post(`${API}/comment/${userId}/${workbookId}`, contentData, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.reload();
  };

  return (
    <CommentBoard>
      <Form onSubmit={onSubmit} >
        <label htmlFor="text">
          <Textarea
            name="text"
            value={text}
            onChange={onChange}
            placeholder="이 문제집에 대한 나의 평가는?"
          />
        </label>
        <BtnBox >
          <StarDiv>
            <StarBox>
            {stars.map((star, index) => {
              return (
                <Star 
                  key={index} 
                  src={(hoverRating || rating) >  index ? "/img/starCheck.svg" : "/img/star.svg"}
                  onClick={() => onSaveRating(index + 1)}
                  onMouseOver={() => onMouseEnter(index + 1)}
                  onMouseLeave={onMouseLeave}
                  alt="별점"
                />
              )
            })}
            </StarBox>
            <StarCount>{starCount} 점</StarCount>
          </StarDiv>
          <div>
            <span>{text.length + "/500"}</span>
            <Btn disabled={!isText}>등록</Btn>
          </div>
        </BtnBox>
      </Form>
      {comments !== undefined && (
        <article>
          <ReviewTit>리뷰({comments.length})</ReviewTit>
          <Comment>
            {comments.map(comment => {
              return (
                <CommentList
                  key={comment.id}
                  comment={comment}
                  workbookId={workbookId}
                  starCount={starCount}
                  user={userInfo}
                />
              )
            })}
          </Comment>
        </article>
      )}
    </CommentBoard>
  )
}

const CommentBoard = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  position: relative;
  padding: 20px 30px;
  margin-bottom: 35px;
  width: 800px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 5px;
`;

const StarDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
` ;   

const StarBox = styled.div`
  display: flex;
  margin: 15px 0;
`;

const StarCount = styled.span`
  display: block;
  text-align: center;
  font-size: 14px;
`;

const Star = styled.img`
  margin-left: 2px;
  width: 25px;
  height: 25px;
`;

const Textarea = styled.textarea`
  display: block;
  padding: 15px 20px;
  margin: 10px auto;
  width: 740px;
  min-height: 120px;
  border: none;
  font-family: "Noto Sans KR";
  font-size: 14px;
  line-height: 18px;
  outline: none;
  resize: none;
  &::placeholder {
    color: ${COLORS.light_gray};
  }
  &:focus {
    border: 1px solid ${COLORS.blue};
    border-radius: 3px;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: ${COLORS.light_gray};
  }
  &::-webkit-scrollbar-track {
    border-radius: 6px;
    color: ${COLORS.light_gray};
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  color: ${COLORS.light_gray};
  font-size: 14px;
`;

const ReviewTit = styled.strong`
  color: ${COLORS.gray};
  font-size: 15px;
`;

const Comment = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0px 10px 40px;
  margin: 16px auto;
  width: 850px;
`;

const Btn = styled.button`
  margin: 0 10px;
  width: 100px;
  height: 45px;
  border-radius: 6px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 14px;
  text-align: center;
  &:disabled {
    background: ${COLORS.alpha_blue};
  }
`;
