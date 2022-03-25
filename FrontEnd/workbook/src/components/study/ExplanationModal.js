import styled, { keyframes } from 'styled-components';
import { COLORS } from "../../constants";

export const ExplanationModal = ({modal, question}) => {

  return (
    <>
      {modal && (
        <Container>
           <Div>
            {question.explanation}
          </Div>
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
`

const Container = styled.article`
  position: absolute;
  width: 50%;
  bottom: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 36px 0;
  background-color: #fff;
  border-radius: 3px;
  z-index: 10;
  overflow: hidden;
  animation: ${fade} 0.3s ease-in-out forwards;
  /* overflow-y: scroll; */
  &::before {
    position: absolute;
    content: "";
    top: 16px;
    left: 50%;
    width: 50px;
    height: 4px;
    border-radius: 5px;
    /* background-color: #dbdbdb; */
    margin-top: 3px;
    transform: translateX(-50%);
  }
`;

const Div = styled.div`
  border: 1px solid ${COLORS.light_gray};
  font-size: 14px;
  color: ${COLORS.gray};
  margin: 15px 50px;
  padding: 30px 30px;
`