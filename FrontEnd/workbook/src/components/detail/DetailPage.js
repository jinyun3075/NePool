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
      image: "",
      share: false,
      title: "",
      username: "",
      regDate: "",
    },
  ]);

  const {content, count, id, image, title, type, username, regDate} = workBook;

  const [countUp, setCountUp] = useState(false);
  const [userData, setUserData] = useState("");
  const [authorData, setAuthorData] = useState("")
  const [userId, setUserId] = useState("");
  const [averageStar, setAverageStar] = useState(0);
  const [shareModal, setShareModal] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [err, setErr] = useState("");

  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    setLoading(true);
    const res = await axios.get(`${API}/user/${user}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setUserData(res.data);
    setUserId(res.data.id);
  };

  const getWorkBook = async () => {
    const res = await axios.get(`${API}/workbook/${userName}/${workbookId}?check=true`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setWorkBook(res.data);
  };

  const getWorkBookAuthor = async () => {
    const res = await axios.get(`${API}/user/${username}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setAuthorData(res.data);
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

   const getShareCount = async () => {
    try {
      const res = await axios.get(`${API}/share/count/${workbookId}`, {
        headers: {
          "Content-type": "application/json",
          Authorization : `Bearer ${token}`
        },
      });
      setShareCount(res.data);
    } catch(err) {

    }
  };

  useEffect(() => {
    getUser();
    return () => {setLoading(false)};
  }, []);

  useEffect(() => {
    getShareCount();
  }, [shareModal]);

  useEffect(() => {
    getWorkBook();
  }, [workbookId]);

  useEffect(() => {
    getStar();
    getWorkBookAuthor();
  }, [id]);

  return (
    <main className="container">
      <h1 className="blind">문제집 상세 페이지</h1>
      <DetailBoard>
        <DetailInfo>
          <WorkBookImg src={image} />
          <Info>
            <SubTit>{type}</SubTit>
            <Tit>{title}</Tit>
            <Explain>{content}</Explain>
            <DetailBox>
              <AuthorBox>
                <img src={authorData.image} alt="작성자 프로필" />
                <Author>{authorData.name}</Author>
              </AuthorBox>
              {regDate && <Author>{regDate.slice(0, 10)}</Author>}
            </DetailBox>
            {/* <span>별점: {averageStar}</span> */}
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
  p {
    margin: 0 0 30px;
  }
  @media (max-width: 520px) {
    margin: 0 auto;
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
  content: "";
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
  margin: 90px 0;
  @media (max-width: 1024px) { 
    margin: 90px 0 60px;
  }
  /* height: 550px; */
  /* background: url('/img/workbookdetail.png'); */
`;

const DetailInfo = styled.article`
  display: flex;
  margin: 0 auto;
  align-items: center;
  gap: 100px;
  background: rgba(255, 255, 255, 0.8);
  @media (max-width: 1024px) { 
    flex-direction: column;
    gap: 60px;
    transition: all 0.4s;
  }
`;

const WorkBookImg = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 5px;
  object-fit: cover;
  opacity: 92%;
  @media (max-width: 520px) { 
    width: 70%;
    height: 70%;
    min-width: 260px;
    margin: 0 30px;
    transition: all 0.3s;
  }
  /* box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 4%); */
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  /* margin: 25px 50px; */
  font-size: 16px;
  color: ${COLORS.text_gray};
  @media (max-width: 520px) { 
    width: 70%;
    height: 70%;
    min-width: 260px;
    transition: all 0.3s;
  }
`;

const SubTit = styled.span`
  padding: 10px 0;
  color: ${COLORS.gray};
  font-size: 15px;
  text-align: end;
`;

const Tit = styled.strong`
  padding: 0 0 15px;
  border-bottom: 1px solid ${COLORS.gray};
  color: ${COLORS.text_gray};
  font-size: 32px;
  word-break: break-all;
  max-height: 120px;
  overflow-y: scroll;
    &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: ${COLORS.light_gray};
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
`;

const Author = styled.span`
  padding: 20px 0;
  font-size: 13px;
`;

const Explain = styled.p`
  padding: 18px 0 25px;
  color: ${COLORS.gray};
  font-size: 15px;
`;

const DetailBox = styled.div`
  display: flex;
  justify-content: space-between;
`

const AuthorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img {
    width: 30px;
    height: 30px;
    border: 0.5px solid ${COLORS.light_gray};
    border-radius: 15px;
  }
`

const ButtonBox = styled.div`
  display: flex;
  gap: 15px;
  margin: 40px 0 20px;
`;

const ModeBtn = styled.button`
  width: 120px;
  height: 45px;
  border: 1px solid ${COLORS.gray};
  border-radius: 3px;
  font-size: 14px;
  box-shadow: 3px 3px 1px 1px rgb(34 36 38 / 15%);
  @media (max-width: 520px) { 
    width: 70px;
    min-width: 70px;
    transition: all 0.3s;
  }
  &:hover {
    border: none;
    background: ${COLORS.blue};
    color: ${COLORS.white};
    box-shadow: 3px 3px 1px 0px rgb(110 150 240 / 45%);
    transition: all 0.3s;
  }
`;
