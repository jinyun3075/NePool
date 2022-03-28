import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { API, COLORS } from '../../constants';

export default function Preview({workBook, id}) {

  const userName = workBook.username
  const workBookId = workBook.id



  const [quiz, setQuiz] = useState([{
    id: "",
    question: "",
    answer_a: "",
    answer_b: "",
    answer_c: "",
    answer_d: "",
    answer_e: "",
    correct: "",
    explanation: "",
  }])

   

  const getQuestion = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API}/work/${userName}/${workBookId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
      setQuiz(res.data)
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getQuestion();
  }, [workBook])

  console.log(quiz);
  
  return (
    <>
      <PrivewBoard>
        <TestPreview>
          <Icon>📖</Icon>
          <Tit>문제 미리보기</Tit>
          <List>
            {/* {quiz && quiz[0].question} */}
            {/* {quiz && quiz.map((q) => {
              return (
                <Item key={q.id}>
                  <span>{q.question}</span>
                </Item>
              );
            })} */}
          </List>
        </TestPreview>
      </PrivewBoard>
    </>
  )
}

const PrivewBoard = styled.section`
  border: 1px solid ${COLORS.light_gray};
  border-radius: 5px;
  width: 800px;
  margin: 50px auto;
`

const TestPreview = styled.article`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 30px 35px;
`

const Icon = styled.span`
  font-size: 20px;
`

const Tit = styled.span`
  font-size: 20px;
  display: block;
  text-align: center;
  margin: 3px 0 25px;
  color: ${COLORS.blue};
`

const List = styled.ul`
  width: 700px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Item = styled.li`
  font-size: 15px;
  overflow: hidden;
  word-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
`

