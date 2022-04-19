import styled from 'styled-components';
import Answer from './Answer';
import { nanoid } from 'nanoid';

<<<<<<< HEAD:FrontEnd/workbook/src/components/study/Answers.js
export default function Answers({mode, question, currentAnswer, click, error, correct}) {
  return (
    <>
      <Form mode={mode}>
=======
export default function Answers({relatedAnswer, question, currentAnswer, click, error, correct}) {

  return (
    <>
      <Form>
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/study/Answers.js
        <Answer
          letter={nanoid()}
          answer={question.answer_a}
          click={click}
          selected={currentAnswer === question.answer_a}
<<<<<<< HEAD:FrontEnd/workbook/src/components/study/Answers.js
          answerCheck={question.correct === question.answer_a}
          error={error}
          correct={correct}
          mode={mode}
=======
          error={error}
          correct={correct}
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/study/Answers.js
        />
        <Answer
          letter={nanoid()}
          answer={question.answer_b}
          click={click}
          selected={currentAnswer === question.answer_b}
<<<<<<< HEAD:FrontEnd/workbook/src/components/study/Answers.js
          answerCheck={question.correct === question.answer_b}
          error={error}
          correct={correct}
          mode={mode}
=======
          error={error}
          correct={correct}
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/study/Answers.js
        />
        <Answer
          letter={nanoid()}
          answer={question.answer_c}
          click={click}
          selected={currentAnswer === question.answer_c}
<<<<<<< HEAD:FrontEnd/workbook/src/components/study/Answers.js
          answerCheck={question.correct === question.answer_c}
          error={error}
          correct={correct}
          mode={mode}
=======
          error={error}
          correct={correct}
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/study/Answers.js
        />
        <Answer
          letter={nanoid()}
          answer={question.answer_d}
          click={click}
          selected={currentAnswer === question.answer_d}
<<<<<<< HEAD:FrontEnd/workbook/src/components/study/Answers.js
          answerCheck={question.correct === question.answer_d}
          error={error}
          correct={correct}
          mode={mode}
=======
          error={error}
          correct={correct}
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/study/Answers.js
        />
        <Answer
          letter={nanoid()}
          answer={question.answer_e}
          click={click}
          selected={currentAnswer === question.answer_e}
<<<<<<< HEAD:FrontEnd/workbook/src/components/study/Answers.js
          answerCheck={question.correct === question.answer_e}
          error={error}
          correct={correct}
          mode={mode}
=======
          error={error}
          correct={correct}
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/study/Answers.js
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
<<<<<<< HEAD:FrontEnd/workbook/src/components/study/Answers.js
  width: ${props => props.mode && `70%`};
=======
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/study/Answers.js
`
