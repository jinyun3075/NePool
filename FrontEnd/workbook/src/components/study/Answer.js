import styled, { css } from 'styled-components';
import { COLORS } from '../../constants'

export default function Answer({ mode, answerCheck, letter, answer, selected, click, error, correct }) {
  return (
    <>
      {mode === "exam" ? (
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
  )
}

const Button = styled.button`
  padding: 20px 30px;
  text-align: start;
  word-wrap: break-word;
  box-shadow: ${props => props.mode !== "exam" && `0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 4%)`};
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
    ${props => (props.correct && props.mode) &&
      css`
        border: 1px solid ${COLORS.blue};
        background: url('/img/QuestionCheck.svg') right 5% center no-repeat;
        color: ${props => (props.correct || props.error) && COLORS.blue};
      `}
    ${props => (props.error && props.mode) &&
      css`
        border: 1px solid ${COLORS.blue};
        background: url('/img/QuestionCheck.svg') right 5% center no-repeat;
        color: ${props => (props.correct || props.error) && COLORS.blue};
      `}
  }
  &.answerCheck {
    background: ${props => (props.correct && COLORS.blue) || (props.error && COLORS.blue)};
    color: ${props => (props.correct || props.error) && COLORS.white};
      ${props => (props.error && props.mode) &&
      css`
        border: 1px solid ${COLORS.wrong};
        background: url('/img/QuestionError.svg') right 5% center no-repeat;
        color: ${props => (props.correct || props.error) && COLORS.error};
      `}
  }
  span {
    display: block;
    width: 95%;
  }
`;
