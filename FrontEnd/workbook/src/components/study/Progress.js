import styled from 'styled-components';

export default function Progress({ total, currentQuestion }) {

  return (
    <>
      <ProgressCheck>
        Qusetion {currentQuestion + 1} of {total}
      </ProgressCheck>
    </>
  )
}

const ProgressCheck = styled.h2`
  font-size: 16px;
  margin: 5px 20px;
`
