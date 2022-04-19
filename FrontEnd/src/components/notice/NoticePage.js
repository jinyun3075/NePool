<<<<<<< HEAD:FrontEnd/workbook/src/components/notice/NoticePage.js
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


=======
import styled from 'styled-components';
import { COLORS } from '../../constants'

export default function NoticePage() {  
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/notice/NoticePage.js
  return (
    <>
      <main className="container">
        <h1 className="blind">공지사항</h1>
        <NoticeBoard>
          <NoticeSection>
<<<<<<< HEAD:FrontEnd/workbook/src/components/notice/NoticePage.js
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
=======
            <p>전체</p>
            <p>서비스 공지</p>
            <p>이벤트 공지</p>
          </NoticeSection>
          <NoticeList>
            <thead>
              <th>제목</th>
              <th>등록일</th>
            </thead>
            <tbody>
              <tr>
                <td>
                  <a href="#">[안내] 정보처리기사 자격증 관련 서비스 안내</a>
                </td>
                <td>2020-03-11</td>
              </tr>
              <tr>
                <td>
                  <a href="#">[안내] 정보처리기사 자격증 관련 서비스 안내</a>
                </td>
                <td>2020-03-11</td>
              </tr>
              <tr>
                <td>
                  <a href="#">[안내] 정보처리기사 자격증 관련 서비스 안내</a>
                </td>
                <td>2020-03-11</td>
              </tr>
              <tr>
                <td>
                  <a href="#">[안내] 정보처리기사 자격증 관련 서비스 안내</a>
                </td>
                <td>2020-03-11</td>
              </tr>
              <tr>
                <td>
                  <a href="#">[안내] 정보처리기사 자격증 관련 서비스 안내</a>
                </td>
                <td>2020-03-11</td>
              </tr>
              <tr>
                <td>
                  <a href="#">[안내] 정보처리기사 자격증 관련 서비스 안내</a>
                </td>
                <td>2020-03-11</td>
              </tr>
              <tr>
                <td>
                  <a href="#">[안내] 정보처리기사 자격증 관련 서비스 안내</a>
                </td>
                <td>2020-03-11</td>
              </tr>
            </tbody>
          </NoticeList>
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/notice/NoticePage.js
        </NoticeBoard>
      </main>
    </>
  )
}

const NoticeBoard = styled.section`
  position: relative;
<<<<<<< HEAD:FrontEnd/workbook/src/components/notice/NoticePage.js
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
=======
  border: 1.5px solid ${COLORS.light_gray};
  margin: 80px 200px;
  min-width: 830px;
  /* padding: 80px 0; */
`

const NoticeSection = styled.div`
  margin: 45px 30px 25px;
  display: flex;
  gap: 40px;
  font-size: 17px;
  /* justify-content: space-between; */
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/notice/NoticePage.js
`

const NoticeList = styled.table`
  border-top: 1px solid ${COLORS.white_gray};
  width: 100%;
  margin: 0 auto;
<<<<<<< HEAD:FrontEnd/workbook/src/components/notice/NoticePage.js
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
=======
  /* text-align: center; */
  /* border-spacing: 0; */
  th {
    font-size: 15px;
    padding: 25px 5px;
    border: none;
    font-weight: bold;
  }
  td {
    border: none;
    border-top: 1px solid ${COLORS.white_gray};
    border-bottom: 1px solid ${COLORS.white_gray};
    font-size: 14px;
    padding: 25px 5px;
    /* font-weight: bold; */
    text-align: center;
 
  }
`

const Notice = styled.li`
  display: flex;
  justify-content: space-between;
`

const TestTit = styled.strong`
  font-size: 15px;
  font-weight: 700;
  margin-left: 10px;
`

const Label = styled.label`
  display: inline-block;
  position: relative;
  cursor: pointer;
  padding-left: 32px;
  span {
    font-size: 14px;
  }
  &::before {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 16px;
    height: 16px;
    border: 1px solid ${COLORS.light_gray};
    /* background-color: black; */
  }
  `



const Check = styled.input`
  display: none;
  &:checked + .check::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 16px;
    height: 16px;
    border: 1px solid ${COLORS.light_gray};
    background-color: red;
  }
  `
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 25px 30px;
  gap: 15px;
  `
  const Btn = styled.button`
    font-size: 14px;
    width: 85px;
    height: 45px;
    margin-top: 25px;
    color: #fff;
    background-color: ${COLORS.blue};
    border: none;
    border-radius: 5px;
    /* display: none; */
    &:disabled {
      opacity: 0.5;
    }
  `

  const Div = styled.div`
    display: flex;
    gap: 15px;
  `

  const Omr = styled.div`
    width: 15px;
    height: 15px;
    border: 1px solid ${COLORS.light_gray};
    background: none;
    &.on {
      background: ${COLORS.blue};
    }
  `
>>>>>>> 97a1d5ddf13aaac982c147c1a78db9479655dd2e:FrontEnd/src/components/notice/NoticePage.js
