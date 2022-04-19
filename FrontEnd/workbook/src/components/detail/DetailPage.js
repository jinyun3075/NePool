import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Comments from './Comments';
import Preview from './Preview';
import Star from './Star';
import styled from 'styled-components';
import axios from 'axios';
import { API, COLORS } from '../../constants'

export default function DetailPage() {
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");

  const params = useParams();
  const workbookId = params.id;

  const location = useLocation();
  const userName = location.state.username;

  const [workBook, setWorkBook] = useState([
    {
      content: "",
      count: 0,
      id: "", 
      share: false,
      title: "",
      username: "",
    },
  ]);

  const {content, count, id, modDate, share, title, type, username} = workBook;

  const [countUp, setCountUp] = useState(false);
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState("");
  const [averageStar, setAverageStar] = useState(0);
  const [shareModal, setShareModal] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [err, setErr] = useState("");
 
  const getUser = async () => {
    const res = await axios.get(`${API}/user/${user}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setUserData(res.data);
    setUserId(res.data.id);
  };

  const getWorkBook = async () => {
    const res = await axios.get(`${API}/workbook/${userName}/${workbookId}?check=${userData.username !== user ? `${countUp}`: true}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setWorkBook(res.data);
  };

  const getStar = async () => {
    const res = await axios.get(`${API}/comment/like/${workbookId}`, {
      headers: {
        "Content-type" : "application/json",
      },
    });
    setAverageStar(res.data);
  };

  const getShare = async (e) => {
    e.preventDefault();
    const shareData = {
      work_book_id: id,
      user_id: userId,
    };
    const res = await axios.post(`${API}/share/register`, shareData, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setErr(res.data.message);
    setShareModal(true);
    setTimeout(() => {setShareModal(false)}, 3000);
  };

   const getShareCouont = async () => {
    const res = await axios.get(`${API}/share/count/${workbookId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization : `Bearer ${token}`
      },
    });
    setShareCount(res.data);
  };

  useEffect(() => {
    getUser();
    getShareCouont();
  }, []);

  useEffect(() => {
    getWorkBook();
  }, [workbookId]);

  useEffect(() => {
    getStar();
  }, [id]);

  return (
    <main className="container">
      <h1 className="blind">문제집 상세 페이지</h1>
      <DetailBoard>
        <DetailInfo>
          <Info>
            <SubTit>{type}</SubTit>
            <Tit>{title}</Tit>
            <Author>만든이: {username}</Author>
            <span>별점: {averageStar}</span>
            <Explain>{content}</Explain>
            <ButtonBox>
              <Link to={`/studymode/${id}`} state={{username: username}}>
                <ModeBtn>공부모드</ModeBtn>
              </Link>
              <Link to={`/exammode/${id}`} state={{username: username}}>
                <ModeBtn>시험모드</ModeBtn>
              </Link>
              <ModeBtn onClick={getShare}>스크랩</ModeBtn>
              {shareModal && (
                <Modal>
                  {!err ? <p>스크랩 되었습니다. 마이 페이지에서 확인해 주세요!</p> : <p>{err}</p>}
                  <CloseSvg onClick={() => {setShareModal(false)}}/>
                  <Link to={'/sharepage'} state={{userid: userId}}>
                    <Btn>마이 페이지에서 확인하기</Btn>
                  </Link>
                </Modal>
              )}
            </ButtonBox>
          </Info>
        </DetailInfo>
      </DetailBoard>
      <Preview workBook={workBook} />
      <Star
        count={count}
        username={username}
        averageStar={averageStar}
        shareCount={shareCount}
      />
      <Comments workbookId={workbookId}/>
      {!token && (
        <>
          <Blur></Blur>
          <Modal>
            <p>로그인하시면 문제집의 상세 설명과 리뷰를 보실 수 있습니다!</p>
            <Link to={'/login'}>
              <Btn>로그인 하러 가기</Btn>
            </Link>
          </Modal>
        </>
      )}
    </main>
  )
}

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px 40px 30px;
  margin: 15px 50px;
  min-width: 250px;
  border: 1px solid ${COLORS.light_gray};
  background: white;
  color: ${COLORS.gray};
  font-size: 16px;
  p{
    margin: 0 0 30px;
  }
`;

const Btn = styled.button`
  margin: 0 0 10px;
  width: 210px;
  height: 45px;
  border-radius: 6px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 14px;
  text-align: center;
`;

const CloseSvg = styled.div`
  content: '';
  position: absolute;
  top: 15px;
  right: 15px;
  width: 14px;
  height: 14px;
  background: url('/img/x.svg') center no-repeat;
  cursor: pointer;
`;

const Blur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(5px);
  overflow: hidden;
`;

const DetailBoard = styled.section`
  display: flex;
  align-items: center;
  height: 550px;
  background: url('/img/workbookdetail.png');
`;

const DetailInfo = styled.article`
  margin: 0 100px 0 auto;
  width: 700px;
  background: rgba(255, 255, 255, 0.8);
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 50px;
  font-size: 16px;
  span {
    font-size: 15px;
  }
`;

const SubTit = styled.span`
  padding: 10px 0;
`;

const Tit = styled.strong`
  font-size: 32px;
`;

const Author = styled.span`
  padding: 20px 0;
`;

const Explain = styled.p`
  padding: 15px 0;
  font-size: 15px;
`;

const ButtonBox = styled.div`
  display: flex;
`;

const ModeBtn = styled.button`
  margin: 20px 15px 20px 0;
  width: 160px;
  height: 45px;
  border: none;
  border-radius: 5px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 14px;
`;
