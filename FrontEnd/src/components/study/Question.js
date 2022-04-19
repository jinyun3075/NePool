import styled from 'styled-components';

export default function Question({question}) {
  return (
    <>
      <TestTit>{question}</TestTit>
    </>
  )
}

const TestTit = styled.h3`
  font-size: 15px;
  font-weight: 700;
  margin: 0 30px;
  padding: 30px;
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 8%), 0 2px 8px 0 rgb(34 36 38 / 10%);
  border-radius: 3px;
`
