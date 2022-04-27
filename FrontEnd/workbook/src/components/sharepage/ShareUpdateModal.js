import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

export default function ShareUpdateModal(props) {
  return (
    <>
      <Modal className="updatemodal">
        <Try
          onClick={() => {
            props.setSharemodemodal(true);
            props.setSharedeletemodal(false);
          }}
        >
          풀기
        </Try>
        <Delete
          onClick={() => {
            props.setSharedeletemodal(true);
            props.setSharemodemodal(false);
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
  bottom: -2px;
  left: 0;
  margin: 15px auto 0;
  width: 100%;
  height: 20%;
  border: 1px solid ${COLORS.light_gray};
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: rgba(255, 255, 255);
  z-index: 20;
`;

const Try = styled.button`
  width: 27%;
  height: 40%;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
`;

const Delete = styled.button`
  width: 27%;
  height: 40%;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
`;

const Update = styled.button`
  width: 27%;
  height: 40%;
  border: 1px solid ${COLORS.light_gray};
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
`;
