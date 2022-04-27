<<<<<<< HEAD
import styled from 'styled-components';

export default function Question({question}) {
  return (
    <TestTit>{question}</TestTit>
  )
}

const TestTit = styled.h3`
  padding: 30px;
  margin: 0 30px;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 700;
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 8%), 0 2px 8px 0 rgb(34 36 38 / 10%);
`;
=======
import styled from 'styled-components';

export default function Question({question}) {
  return (
    <TestTit>{question}</TestTit>
  )
}

const TestTit = styled.h3`
  padding: 30px;
  margin: 0 30px;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 700;
  word-wrap: break-word;
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 8%), 0 2px 8px 0 rgb(34 36 38 / 10%);
`;
>>>>>>> 06f68097701e569c9cf3517a15b981fdce0f81e4
