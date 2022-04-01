import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { API, COLORS } from '../../constants'
import CommentList from './CommentList';

export default function Comments({workbookId}) {

  const [text, setText] = useState("")
  const [isText, setIsText] = useState(false)

  const onChange = (e) => {
    setText(e.target.value)
    if(e.target.value.length > 0 && e.target.value.length < 500) {
      setIsText(true)
    } else {
      setIsText(false)
    }
  }

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: ""
  })

  const getUser = async () => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user")
    const res = await axios.get(`${API}/user/${user}`, {
        headers: {
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
    });
    setUser(res.data);
  };
    
  useEffect(() => {
    getUser();
  }, []);


  const userId = user.id

  const [comments, setComment] = useState([{
    content: "",
    id: "",
    like: 0,
    writer: "",
    regDate: "",
    modeDate: "",
  }])

  const byteCheck = (str) => {
    return str
    .split('') 
    .map(s => s.charCodeAt(0))
    .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0); 
  }

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0);

  const stars = Array(5).fill(0)

  const [starCount, setStarCount] = useState(0)

  const onSaveRating = (index) => {
    setRating(index)
    setStarCount(index)
  }

  const onMouseEnter = (index) => setHoverRating(index);
  
  const onMouseLeave = () => setHoverRating(undefined);
  
  const getComment = async () => {
    const token = sessionStorage.getItem("token");

    const res = await axios.get(`${API}/comment/${workbookId}?page=1&size=500`, {
        headers: {
            "Content-type" : "application/json",
            "Authorization" : `Bearer ${token}`,
        },
    });
    setComment(res.data.dtoList);
  };
    
  useEffect(() => {
    byteCheck(text)
    getComment();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem("token");
    try {
      const contentData = {
        content: text,
        like: starCount,
      }
      await axios.post(`${API}/comment/${userId}/${workbookId}`, contentData, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
      window.location.reload()
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <>
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
                    alt="별점"/>
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
                return <CommentList key={comment.id} comment={comment} workbookId={workbookId} starCount={starCount} user={user}/>
              })}
            </Comment>
          </article>
        )}
      </CommentBoard>
    </>
  )
}

const CommentBoard = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Form = styled.form`
  width: 800px;
  padding: 20px 30px;
  margin-bottom: 35px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 5px;
  position: relative;
`

const StarDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`    

const StarBox = styled.div`
  margin: 15px 0;
  display: flex;
`

const StarCount = styled.span`
  display: block;
  text-align: center;
  font-size: 14px;
`

const Star = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 2px;
`

const Textarea = styled.textarea`
  width: 740px;
  display: block;
  min-height: 120px;
  margin: 10px auto;
  padding: 15px 20px;
  font-family: "Noto Sans KR";
  font-size: 14px;
  line-height: 18px;
  outline: none;
  border: none;
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
    background-color: ${COLORS.light_gray};
    border-radius: 6px;
  }
  &::-webkit-scrollbar-track {
    color: ${COLORS.light_gray};
    border-radius: 6px;
  }
`

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: ${COLORS.light_gray};
`

const ReviewTit = styled.strong`
  font-size: 15px;
  color: ${COLORS.gray};
`

const Comment = styled.ul`
  display: flex;
  flex-direction: column;
  width: 850px;
  margin: 16px auto;
  padding: 0px 10px 40px;
`

const Btn = styled.button`
  font-size: 14px;
  width: 100px;
  height: 45px;
  border-radius: 6px;
  text-align: center;
  margin: 0 10px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  &:disabled {
    background: ${COLORS.alpha_blue};
  }
`
