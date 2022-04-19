import styled, { keyframes } from 'styled-components';
import { COLORS } from "../../constants";

export const ExplanationModal = ({modal, question}) => {
  return (
    <>
      {modal && (
        <Container>
          {question.explanation ? (
            <Div>{question.explanation}</Div>
          ) : (
            <Div>🔍 아직 해설이 없어요</Div>
          )}
        </Container>
      )}
    </>
  );
};

const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Container = styled.article`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 36px 0;
  width: 50%;
  border-radius: 3px;
  background: ${COLORS.white};
  overflow: hidden;
  /* overflow-y: scroll; */
  animation: ${fade} 0.3s ease-in-out forwards;
  z-index: 10;
`;

const Div = styled.div`
  padding: 30px 30px;
  margin: 15px 50px;
  border: 1px solid ${COLORS.light_gray};
  color: ${COLORS.gray};
  font-size: 14px;
`;
