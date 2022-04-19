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

<<<<<<< HEAD:FrontEnd/workbook/src/components/detail/DetailPage.js

  
  const [countUp, setCountUp] = useState(false)
  

  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");

  const [userData, setUserData] = useState("")

  const [userId, setUserId] = useState("")
 
  const getUser = async () => {
    const res = await axios.get(`${API}/user/${user}`, {
=======
  const token = sessionStorage.getItem("token");

  const getWorkBook = async () => {

    const res = await axios.get(`${API}/workbook/${userName}/${workbookId}`, {
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/detail/DetailPage.js
      headers: {
        "Content-type": "application/json",
      },
    });
<<<<<<< HEAD:FrontEnd/workbook/src/components/detail/DetailPage.js
    setUserData(res.data)
    setUserId(res.data.id);
  };

  useEffect(() => {
    getUser();
  }, []);


  const getWorkBook = async () => {

    const res = await axios.get(`${API}/workbook/${userName}/${workbookId}?check=${userData.username !== user ? `${countUp}`: true}`, {
=======
    setWorkBook(res.data)
  };

  useEffect(() => {
    getWorkBook();
  }, [workbookId]);

  const [userId, setUserId] = useState("")
 
  const getUser = async () => {
    const user = sessionStorage.getItem("user");
    const res = await axios.get(`${API}/user/${user}`, {
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/detail/DetailPage.js
      headers: {
        "Content-type": "application/json",
      },
    });
<<<<<<< HEAD:FrontEnd/workbook/src/components/detail/DetailPage.js
    setWorkBook(res.data)
  };

  useEffect(() => {
    getWorkBook();
    
  }, [workbookId]);
=======
    setUserId(res.data.id);
    // setUserName(res.data.name);
  };

  useEffect(() => {
    getUser();
  }, []);
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/detail/DetailPage.js

  const {content, count, id, modDate, share, title, type, username} = workBook

  const [averageStar, setAverageStar] = useState(0)

  const getStar = async () => {
    
    const res = await axios.get(`${API}/comment/like/${workbookId}`, {
        headers: {
            "Content-type" : "application/json",
<<<<<<< HEAD:FrontEnd/workbook/src/components/detail/DetailPage.js
=======
   
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/detail/DetailPage.js
        },
    });
    setAverageStar(res.data)
  };

  useEffect(() => {
    getStar();
  }, [id]);

<<<<<<< HEAD:FrontEnd/workbook/src/components/detail/DetailPage.js
  const [shareModal, setShareModal] = useState(false)

  const [err, setErr] = useState("")

=======
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/detail/DetailPage.js
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
<<<<<<< HEAD:FrontEnd/workbook/src/components/detail/DetailPage.js
      setErr(res.data.message)
      setShareModal(true)
      setTimeout(() => {setShareModal(false)}, 3000)
=======
      // window.location.reload()
      console.log(res);
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/detail/DetailPage.js
    } catch(err) {
      console.log(err);
    }
  }

<<<<<<< HEAD:FrontEnd/workbook/src/components/detail/DetailPage.js
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

=======
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/detail/DetailPage.js
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
<<<<<<< HEAD:FrontEnd/workbook/src/components/detail/DetailPage.js
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
=======
                  <button>공부모드</button>
                </Link>
                <Link to={`/studymode/${id}`} state={{username: username}}>
                  <button>시험모드</button>
                </Link>
                <button onClick={getShare}>스크랩</button>
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/detail/DetailPage.js
              </ButtonBox>
            </Info>
          </DetailInfo>
        </DetailBoard>
        <Preview workBook={workBook} />
<<<<<<< HEAD:FrontEnd/workbook/src/components/detail/DetailPage.js
        <Star count={count} username={username} averageStar={averageStar} shareCount={shareCount}/>
=======
        <Star count={count} username={username} averageStar={averageStar} />
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/detail/DetailPage.js
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
<<<<<<< HEAD:FrontEnd/workbook/src/components/detail/DetailPage.js
  padding: 50px 40px 30px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p{
    margin: 0 0 30px;
=======
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    margin: 0 0 15px;
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/detail/DetailPage.js
  }
`

const Btn = styled.button`
  font-size: 14px;
<<<<<<< HEAD:FrontEnd/workbook/src/components/detail/DetailPage.js
  width: 210px;
  height: 45px;
=======
  width: 150px;
  height: 45px;
  border: 0.5px solid #b6b6b6;
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/detail/DetailPage.js
  border-radius: 6px;
  text-align: center;
  background-color: ${COLORS.blue};
  color: ${COLORS.white};
<<<<<<< HEAD:FrontEnd/workbook/src/components/detail/DetailPage.js
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
=======
  margin: 0 10px; 
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/detail/DetailPage.js
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
<<<<<<< HEAD:FrontEnd/workbook/src/components/detail/DetailPage.js
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
=======
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
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/detail/DetailPage.js
