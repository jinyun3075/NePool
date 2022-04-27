import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants/index";

export default function ModeModal(props) {
  return (
    <>
      <Modal>
        <ImgDiv>
          <Img
            onClick={() => {
              props.setModemodal(false);
            }}
            src="./img/x.svg"
            alt="x"
          />
        </ImgDiv>
        <Text>문제집을 푸시겠습니까?</Text>
        <BtnDiv>
          <StudyMode>
            <Link
              to={`/studymode/${props.workbookid}`}
              state={{ username: props.username }}
            >
              공부모드
            </Link>
          </StudyMode>
          <TestMode>
            <Link
              to={`/exammode/${props.workbookid}`}
              state={{ username: props.username }}
            >
              시험모드
            </Link>
          </TestMode>
        </BtnDiv>
      </Modal>
    </>
  );
}

const Modal = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  padding: 0 1em;
  width: 310px;
  height: 170px;
  border-radius: 5px;
  border: 1px solid ${COLORS.light_gray};
  background-color: ${COLORS.white};
  z-index: 20;
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: end;
  margin: 1em 0;
`;

const Img = styled.img`
  width: 14px;
  height: 14px;
  pointer-events: auto;
  cursor: pointer;
`;

const Text = styled.p`
  margin: 20px 0 0;
  color: ${COLORS.black};
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1em;
`;

const StudyMode = styled.div`
  width: 28%;
  height: 2.5em;
  margin-right: 0.3em;
  border-radius: 5px;
  border: 1px solid ${COLORS.light_gray};
  color: ${COLORS.gray};
  font-size: 1rem;
  text-align: center;
  line-height: 2.5rem;
  cursor: pointer;
`;

const TestMode = styled.div`
  margin-left: 0.3em;
  width: 28%;
  height: 2.5em;
  border-radius: 5px;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 1rem;
  text-align: center;
  line-height: 2.5rem;
  cursor: pointer;
`;
