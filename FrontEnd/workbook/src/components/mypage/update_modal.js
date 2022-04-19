import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants";

export default function UpdateModal(props) {
  const workbookdata = props.workbookdata;

  return (
    <>
      <Modal className="updatemodal">
        <Try
          onClick={() => {
            props.setModemodal(true);
            props.setDeletemodal(false);
          }}
        >
          풀기
        </Try>
        <Update>
          <Link
            to="/update"
            state={{ workbookdata: workbookdata, imageurl: props.imageurl }}
          >
            수정
          </Link>
        </Update>
        <Delete
          onClick={() => {
            props.setDeletemodal(true);
            props.setModemodal(false);
          }}
        >
          삭제
        </Delete>
      </Modal>
    </>
  );
}

const Modal = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0 auto;
  margin-top: 15px;
  width: 100%;
  height: 20%;
  border: 1px solid ${COLORS.light_gray};
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: rgba(255, 255, 255);
  box-sizing: border-box;
  z-index: 2;
`;

const Try = styled.button`
  width: 27%;
  height: 40%;
  color: white;
  background-color: ${COLORS.blue};
`;

const Delete = styled.button`
  width: 27%;
  height: 40%;
  color: white;
  background-color: ${COLORS.blue};
`;

const Update = styled.button`
  width: 27%;
  height: 40%;
  border: 1px solid ${COLORS.light_gray};
  background-color: ${COLORS.blue};
  color: white;
`;
