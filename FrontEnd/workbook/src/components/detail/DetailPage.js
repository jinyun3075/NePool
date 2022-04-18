import styled from 'styled-components';
import { API, COLORS } from '../../constants'
import Comments from './Comments';
import Preview from './Preview';
import Star from './Star';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DetailPage() {

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

  const params = useParams()
  const workbookId = params.id

  const location = useLocation()
  const userName = location.state.username


  
  const [countUp, setCountUp] = useState(false)
  

  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");

  const [userData, setUserData] = useState("")

  const [userId, setUserId] = useState("")
 
  const getUser = async () => {
    const res = await axios.get(`${API}/user/${user}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setUserData(res.data)
    setUserId(res.data.id);
  };

  useEffect(() => {
    getUser();
  }, []);


  const getWorkBook = async () => {

    const res = await axios.get(`${API}/workbook/${userName}/${workbookId}?check=${userData.username !== user ? `${countUp}`: true}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setWorkBook(res.data)
  };

  useEffect(() => {
    getWorkBook();
    
  }, [workbookId]);

  const {content, count, id, modDate, share, title, type, username} = workBook

  const [averageStar, setAverageStar] = useState(0)

  const getStar = async () => {
    
    const res = await axios.get(`${API}/comment/like/${workbookId}`, {
        headers: {
            "Content-type" : "application/json",
        },
    });
    setAverageStar(res.data)
  };

  useEffect(() => {
    getStar();
  }, [id]);

  const [shareModal, setShareModal] = useState(false)

  const [err, setErr] = useState("")

  const getShare = async (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem("token");
    try {
      const shareData = {
        work_book_id: id,
        user_id: userId,
      }
      const res = await axios.post(`${API}/share/register`, shareData, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
      setErr(res.data.message)
      setShareModal(true)
      setTimeout(() => {setShareModal(false)}, 3000)
    } catch(err) {
      console.log(err);
    }
  }

  const [shareCount, getShareCount] = useState(0)

   const getShareCouont = async () => {

    const res = await axios.get(`${API}/share/count/${workbookId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization : `Bearer ${token}`
      },
    });
    getShareCount(res.data);
  };

  useEffect(() => {
    getShareCouont();
    
  }, []);

  return (
    <>
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
        <Star count={count} username={username} averageStar={averageStar} shareCount={shareCount}/>
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
    </>
  )
}

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid ${COLORS.light_gray};
  background: white;
  font-size: 16px;
  color: ${COLORS.gray};
  margin: 15px 50px;
  padding: 50px 40px 30px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p{
    margin: 0 0 30px;
  }
`

const Btn = styled.button`
  font-size: 14px;
  width: 210px;
  height: 45px;
  border-radius: 6px;
  text-align: center;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  margin: 0 0 10px;
`

const CloseSvg = styled.div`
  content: '';
  position: absolute;
  width: 14px;
  height: 14px;
  top: 15px;
  right: 15px;
  background: url('/img/x.svg') center no-repeat;
  cursor: pointer;
`

const Blur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(5px);
  overflow: hidden;
`

const DetailBoard = styled.section`
  height: 550px;
  display: flex;
  align-items: center;
  background: url('/img/workbookdetail.png');
`

const DetailInfo = styled.article`
  width: 700px;
  margin: 0 auto;
  margin-right: 100px;
  background-color: rgba(255, 255, 255, 0.8);
`

const Info = styled.div`
  margin: 25px 50px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  span {
    font-size: 15px;
  }
`

const SubTit = styled.span`
  padding: 10px 0;
`

const Tit = styled.strong`
  font-size: 32px;
`

const Author = styled.span`
  padding: 20px 0;
`

const Explain = styled.p`
  padding: 15px 0;
  font-size: 15px;
`

const ButtonBox = styled.div`
  display: flex;
`
const ModeBtn = styled.button`
  font-size: 14px;
  width: 160px;
  height: 45px;
  margin: 20px 15px 20px 0;
  color: #fff;
  background-color: ${COLORS.blue};
  border: none;
  border-radius: 5px;
`