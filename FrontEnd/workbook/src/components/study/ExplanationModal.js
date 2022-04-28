import styled, { keyframes } from "styled-components";
import { COLORS } from "../../constants";

export const ExplanationModal = ({ modal, question }) => {
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
  padding: 24px 0;
  width: 50%;
  border-radius: 3px;
  background: ${COLORS.white};
  overflow: hidden;
  animation: ${fade} 0.3s ease-in-out forwards;
  z-index: 10;
  word-break: break-all;
  @media (max-width: 640px) {
    min-width: 360px;
    max-height: 300px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 15px;
      background-color: ${COLORS.light_gray};
    }
    &::-webkit-scrollbar-track {
      background-color: white;
    }
    transition: all 0.2s;
  }
`;

const Div = styled.div`
  padding: 20px 10px;
  margin: 15px 50px;
  color: ${COLORS.gray};
  font-size: 14px;
  @media (max-width: 640px) {
    font-size: 13px;
  }
`;
