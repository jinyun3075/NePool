import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { API, COLORS } from '../../constants';

export default function Preview({workBook}) {
  const token = sessionStorage.getItem("token");

  const workbookId = workBook.id;
  const userName = workBook.username;

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
  }]);

  const getQuestion = async () => {
    const res = await axios.get(`${API}/work/${userName}/${workbookId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setQuiz(res.data);
  };

  useEffect(() => {
    if(token) getQuestion();
  }, [workbookId]);
  
  return (
    <PrivewBoard>
      <TestPreview>
        <Icon>📖</Icon>
        <Tit>문제 미리보기</Tit>
        <List>
          {quiz.length > 0 && (
            <>
              {quiz.slice(0, 3).map((q, index) => {
                return (
                  <Item key={q.id}>
                    <strong>{index + 1}. {q.question}</strong>
                  </Item>
                );
              })}
            </>
            )
          }
        </List>
      </TestPreview>
    </PrivewBoard>
  )
}

const PrivewBoard = styled.section`
  margin: 50px auto;
  width: 800px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 5px;
`;

const TestPreview = styled.article`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px 30px 35px;
`;

const Icon = styled.span`
  font-size: 20px;
`;

const Tit = styled.span`
  display: block;
  margin: 3px 0 25px;
  color: ${COLORS.blue};
  font-size: 20px;
  text-align: center;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 25px;
  padding: 30px 15px;
  width: 700px;
  border-radius: 3px;
  background: ${COLORS.alpha_blue};
`;

const Item = styled.li`
  margin: 0 auto;
  width: 650px;
  font-size: 15px;
  text-align: center;
  overflow: hidden;
  word-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
