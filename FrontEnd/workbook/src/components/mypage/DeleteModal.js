import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants/index";

export default function DeleteModal(props) {
  const username = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");

  const workbookid = props.workbookid;

  const DeleteWorkbook = async () => {
    await axios.delete(`${API}/workbook/delete/${username}/${workbookid}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    window.location.reload();
  };

  return (
    <>
      <Modal>
        <ImgDiv>
          <Img
            onClick={() => {
              props.setDeletemodal(false);
            }}
            src="/img/x.svg"
            alt="x"
          />
        </ImgDiv>
        <Text>문제집을 삭제하시겠습니까?</Text>
        <BtnDiv>
          <NoBtn
            onClick={() => {
              props.setDeletemodal(false);
            }}
          >
            아니오
          </NoBtn>
          <YesBtn onClick={DeleteWorkbook}>예</YesBtn>
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
  border: 1px solid ${COLORS.light_gray};
  border-radius: 5px;
  background-color: ${COLORS.white};
  z-index: 30;
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
  color: black;
  font-weight: 700;
  font-size: 1rem;
  text-align: center;
`;

const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1em;
`;

const NoBtn = styled.div`
  margin-right: 0.3em;
  width: 28%;
  height: 2.5em;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 5px;
  color: ${COLORS.gray};
  text-align: center;
  font-size: 1rem;
  line-height: 2.5rem;
  cursor: pointer;
`;

const YesBtn = styled.div`
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
