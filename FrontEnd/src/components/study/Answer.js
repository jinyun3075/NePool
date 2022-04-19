<<<<<<< HEAD:FrontEnd/workbook/src/components/study/Answer.js
import styled, { css } from 'styled-components';
import { COLORS } from '../../constants'

export default function Answer({ mode, answerCheck, letter, answer, selected, click, error, correct }) {

  return (
    <>
    {mode ? (
      <>
        <Button 
        name="check"
        id={letter}
        value={answer}
        onClick={click}
        className={selected ? 'selected' : '' || answerCheck ? 'answerCheck' : ''}
        correct={correct}
        error={error}
        mode={mode}
        disabled={correct || error}
      >
        <span>{answer}</span>
      </Button>
      </>
    ) : (
      <Button 
        name="check"
        id={letter}
        value={answer}
        onClick={click}
        className={selected ? 'selected' : ''}
        correct={correct}
        error={error}
        disabled={correct}
      >
        <span>{answer}</span>
      </Button>
    )}
   </> 
=======
import styled from 'styled-components';
import { COLORS } from '../../constants'

export default function Answer({ letter, answer, selected, click, error, correct }) {

  return (
    <Button 
      name="check"
      id={letter}
      value={answer}
      onClick={click}
      className={selected ? 'selected' : ''}
      correct={correct}
      error={error}
      disabled={correct}
    >
      <span>{answer}</span>
    </Button>
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/study/Answer.js
  )
}


const Button = styled.button`
  padding: 20px 30px;
  text-align: start;
<<<<<<< HEAD:FrontEnd/workbook/src/components/study/Answer.js
  box-shadow: ${props => !(props.mode) && `0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 4%)`};
  word-wrap: break-word;
=======
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 4%);
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/study/Answer.js
  &:hover {
    background: ${COLORS.alpha_gray};
  }
  &:active {
    background: ${COLORS.light_gray};
  }
  &.selected {
    background: ${COLORS.alpha_gray};
    background: ${props => (props.correct && COLORS.blue) || (props.error && COLORS.error)};
    color: ${props => (props.correct || props.error) && COLORS.white};
<<<<<<< HEAD:FrontEnd/workbook/src/components/study/Answer.js
    ${props => (props.correct && props.mode) &&
      css`
        background: url('/img/QuestionCheck.svg') right 5% center no-repeat;
        border: 1px solid ${COLORS.blue};
        color: ${props => (props.correct || props.error) && COLORS.blue};
      `}
    ${props => (props.error && props.mode) &&
      css`
        background: url('/img/QuestionCheck.svg') right 5% center no-repeat;
        border: 1px solid ${COLORS.blue};
        color: ${props => (props.correct || props.error) && COLORS.blue};
      `}
  }
  &.answerCheck {
    background: ${props => (props.correct && COLORS.blue) || (props.error && COLORS.blue)};
    color: ${props => (props.correct || props.error) && COLORS.white};
      ${props => (props.error && props.mode) &&
      css`
        background: url('/img/QuestionError.svg') right 5% center no-repeat;
        border: 1px solid ${COLORS.wrong};
        color: ${props => (props.correct || props.error) && COLORS.error};
      `}
  }
  span {
    display: block;
    width: 95%;
=======
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/study/Answer.js
  }
`