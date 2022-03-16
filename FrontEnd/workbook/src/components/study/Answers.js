import styled from 'styled-components';
import Answer from './Answer';
import { nanoid } from 'nanoid';

export default function Answers({question, currentAnswer, click, error, correct}) {

  return (
    <>
      <Form>
        <Answer
          letter={nanoid()}
          answer={question.answer_a}
          click={click}
          selected={currentAnswer === question.answer_a}
          error={error}
          correct={correct}
        />
        <Answer
          letter={nanoid()}
          answer={question.answer_b}
          click={click}
          selected={currentAnswer === question.answer_b}
          error={error}
          correct={correct}
        />
        <Answer
          letter={nanoid()}
          answer={question.answer_c}
          click={click}
          selected={currentAnswer === question.answer_c}
          error={error}
          correct={correct}
        />
        <Answer
          letter={nanoid()}
          answer={question.answer_d}
          click={click}
          selected={currentAnswer === question.answer_d}
          error={error}
          correct={correct}
        />
        <Answer
          letter={nanoid()}
          answer={question.answer_e}
          click={click}
          selected={currentAnswer === question.answer_e}
          error={error}
          correct={correct}
        />
      </Form>
    </>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 25px 30px;
  gap: 15px;
`
