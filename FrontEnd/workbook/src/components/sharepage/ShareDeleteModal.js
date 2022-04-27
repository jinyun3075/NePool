import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants/index";

export default function ShareDeleteModal(props) {
  const token = sessionStorage.getItem("token");

  const workbookId = props.workbookid;
  const userId = props.userid;

  const shareDeleteWorkbook = async () => {
    await axios.delete(`${API}/share`, {
      data: {
        work_book_id: workbookId,
        user_id: userId,
      },
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
              props.setSharedeletemodal(false);
            }}
            src="/img/x.svg"
            alt="x"
          />
        </ImgDiv>
        <Text>가져오기를 해제 하시겠습니까?</Text>
        <BtnDiv>
          <NoBtn
            onClick={() => {
              props.setSharedeletemodal(false);
            }}
          >
            아니오
          </NoBtn>
          <YesBtn onClick={shareDeleteWorkbook}>예</YesBtn>
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
  width: 350px;
  height: 170px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 5px;
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
  color: black;
  font-weight: 700;
  text-align: center;
  font-size: 1rem;
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
  font-size: 1rem;
  line-height: 2.5rem;
  text-align: center;
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
