import Answer from './Answer';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

export default function Answers({mode, question, currentAnswer, click, error, correct}) {
  return (
    <Form mode={mode}>
      <Answer
        letter={nanoid()}
        answer={question.answer_a}
        click={click}
        selected={currentAnswer === question.answer_a}
        answerCheck={question.correct === question.answer_a}
        error={error}
        correct={correct}
        mode={mode}
      />
      <Answer
        letter={nanoid()}
        answer={question.answer_b}
        click={click}
        selected={currentAnswer === question.answer_b}
        answerCheck={question.correct === question.answer_b}
        error={error}
        correct={correct}
        mode={mode}
      />
      <Answer
        letter={nanoid()}
        answer={question.answer_c}
        click={click}
        selected={currentAnswer === question.answer_c}
        answerCheck={question.correct === question.answer_c}
        error={error}
        correct={correct}
        mode={mode}
      />
      <Answer
        letter={nanoid()}
        answer={question.answer_d}
        click={click}
        selected={currentAnswer === question.answer_d}
        answerCheck={question.correct === question.answer_d}
        error={error}
        correct={correct}
        mode={mode}
      />
      <Answer
        letter={nanoid()}
        answer={question.answer_e}
        click={click}
        selected={currentAnswer === question.answer_e}
        answerCheck={question.correct === question.answer_e}
        error={error}
        correct={correct}
        mode={mode}
      />
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 25px 30px;
  width: ${props => props.mode === "exam" && `70%`};
  @media (max-width: 1024px) {
    width: ${props => props.mode === "exam" && `90%`};
    transition: all 0.3s;
  }
`;
