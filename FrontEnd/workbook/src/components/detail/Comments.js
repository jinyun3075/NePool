import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { API, COLORS } from '../../constants'
import CommentList from './CommentList';

export default function Comments({workbookId}) {

  const textAreaRef = useRef(null)

  const resizeHeight = useCallback(() => {
    if (textAreaRef === null || textAreaRef.current === null) {
      return
    }
    textAreaRef.current.style.height = '18px'
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
  }, [])
  
  const [text, setText] = useState("")
  const [isText, setIsText] = useState(false)

  const [activeText, setActiveText] = useState(false)

  const onChange = (e) => {
    setText(e.target.value)
    if(e.target.value.length > 0) {
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
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user")
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

  const onSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token");
    try {
      const contentData = {content: text}
      const res = await axios.post(`${API}/comment/${userId}/${workbookId}`, contentData, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
      console.log(res);
    } catch(err) {
      console.log(err);
    }
  }

  const onClick = () => {
    setActiveText(!activeText)
  }

  return (
    <>
      <CommentBoard>
        <Form onSubmit={onSubmit}> 
          <label htmlFor="text">
            <Textarea
              name="text"
              value={text}
              onChange={onChange}
              ref={textAreaRef}
              onInput={resizeHeight}
              onClick={onClick}
              placeholder="이 문제집에 대한 나의 평가는?"
            />
          </label>
          {activeText && <Btn disabled={!isText}>등록</Btn>}
        </Form>
        <article>
          <ReviewTit>리뷰(2)</ReviewTit>
          <Comment>
            <CommentList workbookId={workbookId}/>
            <CommentList workbookId={workbookId}/>
          </Comment>
        </article>
        
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
  /* &::after {
    content: '';
    position: absolute;
    width: 100%;
    bottom: 45px;
    left: 0;
    border-bottom: 1px solid ${COLORS.light_gray};
  } */
`

const Textarea = styled.textarea`
  width: 100%;
  margin-bottom: 8px;
  font-family: "Noto Sans KR";
  font-size: 14px;
  line-height: 18px;
  outline: none;
  border: none;
  padding: 0;
  resize: none;
  &::placeholder {
    color: ${COLORS.light_gray}
  }
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
  font-size: 16px;
  border: none;
  color: ${COLORS.blue};
  &:disabled {
    color: ${COLORS.light_gray};
  }
`
