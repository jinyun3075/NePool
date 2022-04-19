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
        <Text>예시 문제집을 푸시겠습니까?</Text>
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
  width: 30%;
  height: 26%;
  padding: 0 1em;
  border-radius: 5px;
  border: 1px solid ${COLORS.light_gray};
  background-color: #fff;
  z-index: 2;
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 1em;
  margin-bottom: 1em;
  border-bottom: none;
`;

const Img = styled.img`
  width: 14px;
  height: 14px;
  pointer-events: auto;
  cursor: pointer;
`;

const Text = styled.p`
  margin-top: 1em;
  font-weight: 700;
  text-align: center;
  font-size: 1rem;
  color: black;
`;

const BtnDiv = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: center;
`;

const StudyMode = styled.div`
  cursor: pointer;
  width: 28%;
  height: 2.5em;
  text-align: center;
  font-size: 1rem;
  border-radius: 5px;
  line-height: 2.5rem;
  margin-right: 0.3em;
  color: ${COLORS.gray};
  border: 1px solid ${COLORS.light_gray};
`;

const TestMode = styled.div`
  cursor: pointer;
  width: 28%;
  height: 2.5em;
  text-align: center;
  font-size: 1rem;
  border-radius: 5px;
  line-height: 2.5rem;
  margin-left: 0.3em;
  color: #fff;
  background-color: ${COLORS.blue};
`;
