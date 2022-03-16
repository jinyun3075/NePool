import { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../../constants'
import CommentList from './CommentList';

export default function Comments() {

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

  const onChange = (e) => {
    setText(e.target.value)
    if(e.target.value.length > 0) {
      setIsText(true)
    } else {
      setIsText(false)
    }
  }

  return (
    <>
      <CommentBoard>
        <Form>
          <label htmlFor="text">
            <Textarea
              name="text"
              value={text}
              onChange={onChange}
              ref={textAreaRef}
              onInput={resizeHeight}
              placeholder="댓글 입력하기..."
            />
          </label>
          <Btn>등록</Btn>
        </Form>
        <Comment>
          <CommentList />
        </Comment>
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
  width: 40%;
  padding: 20px 30px 60px;
  margin-bottom: 50px;
  border: 1px solid black;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    bottom: 45px;
    left: 0;
    border-bottom: 1px solid black;
  }
`

const Textarea = styled.textarea`
  width: 100%;
  margin-bottom: 16px;
  font-size: 14px;
  line-height: 18px;
  outline: none;
  border: none;
  padding: 0;
  resize: none;
  &::placeholder {
    color: #dbdbdb;
  }
`

const Comment = styled.ul`
  display: flex;
  flex-direction: column;
  width: 840px;
  margin: 0 auto;
  padding: 20px 16px 50px;
`

const Btn = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 16px;
  width: 120px;
  height: 45px;
  /* margin: 20px 15px 20px 0; */
  color: #fff;
  background-color: ${COLORS.blue};
  border: none;
  /* border-radius: 5px; */
  /* display: none; */
  &:disabled {
    opacity: 0.5;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    /* align-content: center; */
    /* align-items: center; */
  }
`
