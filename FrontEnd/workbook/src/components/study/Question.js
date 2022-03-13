import { useState } from 'react';
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
  margin-left: 10px;
`
