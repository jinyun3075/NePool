import styled from 'styled-components';
import { COLORS } from '../../constants';

export default function Progress({ total, currentQuestion }) {

  return (
    <>
      <ProgressCheck>
       문제 {currentQuestion + 1} of {total}
      </ProgressCheck>
    </>
  )
}

const ProgressCheck = styled.h2`
  font-size: 15px;
  margin: 6px 20px;
  color: ${COLORS.gray}
`
