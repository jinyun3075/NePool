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
  )
}


const Button = styled.button`
  padding: 20px 30px;
  text-align: start;
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 4%);
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
  }
`