import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API, COLORS } from '../../constants'

export default function NoticePost() {

  const navigate = useNavigate();

  const location = useLocation()
  const item = location.state.item
  const userId = location.state.userId

  const [notice, setNotice] = useState({
    contents: "",
    id: 0,
    modDate: "",
    regDate: "",
    title: "",
  })

  const getNotice = async() => {
    const res = await axios.get(`${API}/announcement/show/${item.id}` , {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    setNotice(res.data);
  }

  useEffect(() => {
    getNotice()
  }, [])

  const deleteNotice = async (e) => {
    e.preventDefault()
    try {
      await axios.delete(`${API}/announcement/${userId}`, {
        data: notice.id,
        headers: {
          'Content-Type': 'application/json',
        },
    })
      navigate('/notice')
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <>
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
          <Link to={`/notice/editor/${notice.id}`} state={{notice: notice}} >
            <Btn type="submit">수정</Btn>
          </Link>
          <Btn onClick={deleteNotice}>삭제</Btn>
        </BtnBox>
        )}
      </NoticeForm>
    </>
  );
}

const NoticeForm = styled.form`
  width: 70%;
  margin: 70px auto;
`;

const NoticeTitle = styled.h2`
  font-size: 24px;
`

const InfoBox = styled.div`
margin: 15px 0;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  gap: 5px;
`

const InfoData = styled.div``

const Info = styled.p`
  font-size: 13px;
  color: ${COLORS.light_gray};
`

const Line = styled.div`
  border: 0.5px solid ${COLORS.white_gray};
  margin: 15px 0 25px;
`

const InputBox = styled.div`
  margin: 50px 0 150px;
`

const Desc = styled.div`
  margin: 15px 25px;
  font-size: 15px;
`;

const Input = styled.input`
  width: 100%;
  margin-left: 15px;
  padding: 0 15px;
  height: 48px;
  color: ${COLORS.black};
  margin-bottom: 22px;
  border: 1px solid ${COLORS.light_gray};
  background: none;
  &::placeholder {
    font-size: 13px;
    color: ${COLORS.light_gray};
  }
  &:focus {
    outline: none;
    border: 1px solid ${COLORS.blue};
  }
`

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  gap: 20px;
`;

const Btn = styled.button`
  font-size: 14px;
  width: 100px;
  height: 40px;  
  margin: 10px 0 0;
  /* border-radius: 4px; */
  color: ${COLORS.light_gray};
  border: 1px solid ${COLORS.light_gray};
  &:hover{
    border: none;
    color: ${COLORS.white};
    background-color: ${COLORS.blue};
  }
  &:disabled {
    opacity: 0.5;
  }
`
