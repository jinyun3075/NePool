import styled from 'styled-components';
import { COLORS } from '../../constants';

export default function Progress({ mode, total, currentQuestion }) {

  return (
    <>
    {mode ? (
      <ProgressCheck>
        총 {total} 문제
      </ProgressCheck>
    ) : (
      <ProgressCheck>
       문제 {currentQuestion + 1} of {total}
      </ProgressCheck>
    )}
      
    </>
  )
}

const ProgressCheck = styled.h2`
  font-size: 15px;
  margin: 6px 20px;
  color: ${COLORS.gray}
`
