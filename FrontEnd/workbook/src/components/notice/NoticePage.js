import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API, COLORS } from '../../constants'

export default function NoticePage() {  

  const user = sessionStorage.getItem("user")

  const [userId, setUserId] = useState("")

  const [notice, setNotice] = useState([{
    contents: "",
    id: 0,
    modDate: "",
    regDate: "",
    title: ""
  }])

  const getUser = async() => {
    const res = await axios.get(`${API}/user/${user}`, {
      headers: {
        "Content-type": "application/json",
      },
    })
    setUserId(res.data.id);
  }

  const getNotice = async () => {
    try {
      const res = await axios.get(`${API}/announcement`, {
      headers: {
        "Content-type": "application/json",
      },
    });
      // window.location.reload()
      setNotice(res.data.dtoList);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser()
    getNotice()
  }, [])


  return (
    <>
      <main className="container">
        <h1 className="blind">공지사항</h1>
        <NoticeBoard>
          <NoticeSection>
            <p>Notice</p>
            <h2>공지사항</h2>
          </NoticeSection>
          <NoticeList>
            <colgroup>
                <col className="number" />
                {/* <col className="category" /> */}
                <col className="title"/>
                <col className="date" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">번호</th>
                {/* <th scope="col">분류</th> */}
                <th scope="col">제목</th>
                <th scope="col">등록일</th>
              </tr>
            </thead>
            <tbody>
              {notice.map((item, i) => {
                return (
                  <tr key={item.id}>
                    <td>{notice.length - i}</td>
                    {/* <td>서비스</td> */}
                    <td className='title'>
                      <Link to={`/notice/${item.id}`} state={{item: item, userId: userId}} >
                        <span>{item.title}</span>
                      </Link>
                    </td>
                    <td>{item.regDate.slice(0, 10)}</td>
                  </tr>
                )
              })}
            </tbody>
          </NoticeList>
          {userId === "NEPOOLADMIN" && (
            <BtnBox>
              <Link to='/notice/editor' state={{}}>
                <Btn>작성</Btn>
              </Link>
            </BtnBox>
          )}
        </NoticeBoard>
      </main>
    </>
  )
}

const NoticeBoard = styled.section`
  position: relative;
  margin: 70px 200px;
  min-width: 830px;
`

const NoticeSection = styled.div`
  text-align: center;
  margin: 40px 0;
  h2 {
    font-size: 37px;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    color: ${COLORS.blue};
  }
`

const NoticeList = styled.table`
  border-top: 1px solid ${COLORS.white_gray};
  width: 100%;
  margin: 0 auto;
  color: ${COLORS.black};
  .number {
    width: 120px;
  }
  .category {
    width: 150px;
  }
  .date {
    width: 160px;
  }
  th {
    color: ${COLORS.blue};
    background: ${COLORS.alpha_blue};
    border: none;
    border-bottom: 1px solid ${COLORS.blue};
    padding: 14px;
    font-weight: 700;
    font-size: 15px;
  }
  tr {
    &:hover:not(thead tr) {
      transition: all 0.4s;
      background: ${COLORS.alpha_gray};
    }
  }
  td {
    border: none;
    border-bottom: 1px solid ${COLORS.white_gray};
    padding: 20px 0;
    text-align: center;
    font-size: 16px;
    &.title {
      text-align: left;
      padding-left: 40px;
    }
  }
`

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
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