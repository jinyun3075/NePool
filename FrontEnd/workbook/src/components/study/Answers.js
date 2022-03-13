import styled from 'styled-components';
import Answer from './Answer';

export default function Answers({question, currentAnswer, click, error, correct}) {

  return (
    <>
      <Form>
        <Answer
          letter="a"
          answer={question.answer_a}
          click={click}
          selected={currentAnswer === "a"}
          error={error}
          correct={correct}
        />
        <Answer
          letter="b"
          answer={question.answer_b}
          click={click}
          selected={currentAnswer === "b"}
          error={error}
          correct={correct}
        />
        <Answer
          letter="c"
          answer={question.answer_c}
          click={click}
          selected={currentAnswer === "c"}
          error={error}
          correct={correct}
        />
        <Answer
          letter="d"
          answer={question.answer_d}
          click={click}
          selected={currentAnswer === "d"}
          error={error}
          correct={correct}
        />
        <Answer
          letter="e"
          answer={question.answer_e}
          click={click}
          selected={currentAnswer === "e"}
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
