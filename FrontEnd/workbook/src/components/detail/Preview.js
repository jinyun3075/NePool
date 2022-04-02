import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { API, COLORS } from '../../constants';
import PropTypes from 'prop-types';

export default function Preview({workBookId, userName}) {

  // const userName = workBook.username
  // const workBookId = workBook.id

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

  const token = sessionStorage.getItem("token");
  const getQuestion = async () => {
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
    if(token) getQuestion();
  }, [userName])
  
  return (
    <>
      <PrivewBoard>
        <TestPreview>
          <Icon>📖</Icon>
          <Tit>문제 미리보기</Tit>
          <List>
            {quiz.length > 1 && (
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
    </>
  )
}


// Preview.propTypes = {
//   workBookId: PropTypes.string.isRequired,
//   userName: PropTypes.string.isRequired
// };

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
  justify-content: flex-start;
  gap: 25px;
  background: ${COLORS.alpha_blue};
  padding: 30px 15px;
  border-radius: 3px;
`

const Span = styled.div`
  display: flex;
  align-items: flex-start;
  
  span {
    color: ${COLORS.gray};
    /* margin-left: 15px; */
  }
`

const Item = styled.li`
  margin: 0 auto;
  font-size: 15px;
  overflow: hidden;
  word-wrap: break-word;
  white-space: nowrap;
  text-overflow: ellipsis;

`
