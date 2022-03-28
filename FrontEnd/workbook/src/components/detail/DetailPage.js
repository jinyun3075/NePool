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

  const getWorkBook = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get(`${API}/workbook/${userName}/${workbookId}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setWorkBook(res.data)
  };

  useEffect(() => {
    getWorkBook();
  }, []);

  const {content, count, id, modDate, share, title, type, username} = workBook

  // console.log(workBook);

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
              <span>별점: 4.5</span>
              <Explain>{content}</Explain>
              <ButtonBox>
                <Link to={`/studymode/${id}`} state={{username: username}}>
                  <button>공부모드</button>
                </Link>
                <Link to={`/studymode/${id}`} state={{username: username}}>
                  <button>시험모드</button>
                </Link>
                <button>스크랩</button>
              </ButtonBox>
            </Info>
          </DetailInfo>
        </DetailBoard>
        <Preview workbookId={id} workBook={workBook}/>
        <Star count={count} username={username} />
        <Comments workbookId={workbookId}/>
      </main>
    </>
  )
}

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