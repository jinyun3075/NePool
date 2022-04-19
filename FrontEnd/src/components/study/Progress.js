import styled from 'styled-components';
import { COLORS } from '../../constants';

<<<<<<< HEAD:FrontEnd/workbook/src/components/study/Progress.js
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
      
=======
export default function Progress({ total, currentQuestion }) {

  return (
    <>
      <ProgressCheck>
       문제 {currentQuestion + 1} of {total}
      </ProgressCheck>
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/study/Progress.js
    </>
  )
}

const ProgressCheck = styled.h2`
  font-size: 15px;
  margin: 6px 20px;
  color: ${COLORS.gray}
`
