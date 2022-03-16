import styled from 'styled-components';
import { COLORS } from '../../constants'

export default function Answer({ letter, answer, selected, click, error, correct }) {

  let classes = ['answer']
  let errors = ['check']

  if(selected) {
    classes.push('selected')
  }

  if(error) {
    errors.push('wrong')
  } else if(correct) {
    errors.push('correct')
  }

  return (
    <>
      <Check
        type="radio"
        name="check"
        id={letter}
        value={answer}
        onClick={click}
      />
      <Label htmlFor={letter} className={errors.join(' ')} error={error}>
        <span className={classes.join(' ')}>{answer}</span>
      </Label>
    </>
  )
}

const Label = styled.label`
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding-left: 32px;
  span {
    font-size: 14px;
  }
  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 16px;
    height: 16px;
    border: 1px solid ${COLORS.light_gray};
    /* background-color: black; */
  }
  .answer.selected {
    font-weight: 700;
  }
  `

const Check = styled.input`
  display: none;
  &:checked + .check::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 16px;
    height: 16px;
    border: 1px solid ${COLORS.light_gray};
    background: url(img/check.svg) no-repeat center/14px;
    /* background: ${COLORS.blue}; */
    /* background: ${COLORS.wrong}; */
    /* background: ${props => props.error ? COLORS.wrong : COLORS.blue}; */
  }
  &:checked + .wrong::after {
    background: ${COLORS.wrong};
  }
  &:checked + .correct::after {
    background: ${COLORS.blue};
  }
  `
