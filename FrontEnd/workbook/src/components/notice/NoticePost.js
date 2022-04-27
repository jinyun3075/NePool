import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants";

export default function NoticePost() {
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  const location = useLocation();
  const item = location.state.item;
  const userId = location.state.userId;

  const [notice, setNotice] = useState({
    contents: "",
    id: 0,
    modDate: "",
    regDate: "",
    title: "",
  });

  const [loading, setLoading] = useState(false);

  const getNotice = async () => {
    setLoading(true);
    const res = await axios.get(`${API}/announcement/show/${item.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setNotice(res.data);
  };

  const deleteNotice = async (e) => {
    e.preventDefault();
    await axios.delete(`${API}/announcement/${userId}`, {
      data: notice.id,
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/notice");
  };

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
    getNotice();
    return () => {
      setLoading(true);
    };
  }, []);

  return (
    <NoticeForm>
      <NoticeTitle>{item.title}</NoticeTitle>
      <InfoBox>
        <Info>작성자: NEPOOLADMIN</Info>
        <InfoData>
          {/* <Info>수정 일시 : {item.modDate.slice(0, 10)}</Info> */}
          <Info>작성 일시 : {item.regDate.slice(0, 10)}</Info>
        </InfoData>
      </InfoBox>
      <Line></Line>
      <InputBox>
        <Desc dangerouslySetInnerHTML={{ __html: item.contents }} />
      </InputBox>
      {userId === "NEPOOLADMIN" && (
        <BtnBox>
          <Link to={`/notice/editor/${notice.id}`} state={{ notice: notice }}>
            <Btn type="submit">수정</Btn>
          </Link>
          <Btn onClick={deleteNotice}>삭제</Btn>
        </BtnBox>
      )}
    </NoticeForm>
  );
}

const NoticeForm = styled.form`
  padding: 0 15px;
  margin: 70px auto;
  width: 70%;
  min-width: 350px;
`;

const NoticeTitle = styled.h2`
  font-size: 24px;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  margin: 15px 0;
`;

const InfoData = styled.div`
  display: flex;
  flex-direction: column;
`;

const Info = styled.p`
  color: ${COLORS.light_gray};
  font-size: 13px;
`;

const Line = styled.div`
  margin: 15px 0 25px;
  border: 0.5px solid ${COLORS.white_gray};
`;

const InputBox = styled.div`
  margin: 50px 0 150px;
`;

const Desc = styled.div`
  margin: 15px 25px;
  font-size: 15px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 30px;
`;

const Btn = styled.button`
  margin: 10px 0 0;
  width: 100px;
  height: 40px;
  border: 1px solid ${COLORS.light_gray};
  color: ${COLORS.light_gray};
  font-size: 14px;
  &:hover {
    border: none;
    background: ${COLORS.blue};
    color: ${COLORS.white};
  }
  &:disabled {
    opacity: 0.5;
  }
`;
