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

  const token = sessionStorage.getItem("token");

  const getWorkBook = async () => {

    const res = await axios.get(`${API}/workbook/${userName}/${workbookId}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setWorkBook(res.data)
  };

  useEffect(() => {
    getWorkBook();
  }, [workbookId]);

  const [userId, setUserId] = useState("")
 
  const getUser = async () => {
    const user = sessionStorage.getItem("user");
    const res = await axios.get(`${API}/user/${user}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setUserId(res.data.id);
    // setUserName(res.data.name);
  };

  useEffect(() => {
    getUser();
  }, []);

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
      // window.location.reload()
      console.log(res);
    } catch(err) {
      console.log(err);
    }
  }

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
                  <button>공부모드</button>
                </Link>
                <Link to={`/studymode/${id}`} state={{username: username}}>
                  <button>시험모드</button>
                </Link>
                <button onClick={getShare}>스크랩</button>
              </ButtonBox>
            </Info>
          </DetailInfo>
        </DetailBoard>
        <Preview workBook={workBook} />
        <Star count={count} username={username} averageStar={averageStar} />
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
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    margin: 0 0 15px;
  }
`

const Btn = styled.button`
  font-size: 14px;
  width: 150px;
  height: 45px;
  border: 0.5px solid #b6b6b6;
  border-radius: 6px;
  text-align: center;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
  margin: 0 10px; 
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
  button {
    font-size: 14px;
    width: 160px;
    height: 45px;
    margin: 20px 15px 20px 0;
    color: #fff;
    background-color: ${COLORS.blue};
    border: none;
    border-radius: 5px;
    /* display: none; */
    &:disabled {
      opacity: 0.5;
    }
  }
`
