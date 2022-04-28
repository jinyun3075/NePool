import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { API, COLORS } from '../../constants'

export default function NoticePage() {  
  const user = sessionStorage.getItem("user");

  const [notice, setNotice] = useState([{
    contents: "",
    id: 0,
    modDate: "",
    regDate: "",
    title: ""
  }]);
  
  const [userId, setUserId] = useState("");

  const getUser = async() => {
    const res = await axios.get(`${API}/user/${user}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setUserId(res.data.id);
  };

  const getNotice = async () => {
    const res = await axios.get(`${API}/announcement`, {
      headers: {
        "Content-type": "application/json",
      },
    });
      // window.location.reload()
    setNotice(res.data.dtoList);
  };

  useEffect(() => {
    getUser();
    getNotice();
  }, []);

  return (
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
              <th scope="col" className="delnum">번호</th>
              {/* <th scope="col">분류</th> */}
              <th scope="col">제목</th>
              <th scope="col" className="deldate">등록일</th>
            </tr>
          </thead>
          <tbody>
            {notice.map((item, i) => {
              return (
                <tr key={item.id}>
                  <td className="delnum">{notice.length - i}</td>
                  {/* <td>서비스</td> */}
                  <td className='title'>
                    <Link to={`/notice/${item.id}`} state={{item: item, userId: userId}} >
                      <span>{item.title}</span>
                    </Link>
                  </td>
                  <td className="deldate">{item.regDate.slice(0, 10)}</td>
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
  )
}

const NoticeBoard = styled.section`
  position: relative;
  /* margin: 70px 200px; */
  width: 80%;
  margin: 0 auto;
  min-width: 830px;
  @media (max-width: 930px) {
    min-width: 300px;
    padding: 0 15px;
    /* transition: all 0.3s; */
  }
`;

const NoticeSection = styled.div`
  margin: 40px 0;
  text-align: center;
  h2 {
    font-size: 37px;
    font-weight: 700;
  }
  p {
    color: ${COLORS.blue};
    font-size: 14px;
  }
`;

const NoticeList = styled.table`
  margin: 0 auto;
  width: 100%;
  border-top: 1px solid ${COLORS.white_gray};
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
    padding: 14px;
    border: none;
    border-bottom: 1px solid ${COLORS.blue};
    background: ${COLORS.alpha_blue};
    color: ${COLORS.blue};
    font-size: 15px;
    font-weight: 700;
  }
  tr {
    &:hover:not(thead tr) {
      background: ${COLORS.alpha_gray};
      transition: all 0.4s;
    }
  }
  td {
    padding: 20px 0;
    border: none;
    border-bottom: 1px solid ${COLORS.white_gray};
    font-size: 16px;
    text-align: center;
    &.title {
      padding-left: 40px;
      text-align: left;
      @media (max-width: 930px) {
        padding-left: 15px;
      }
    }
  }
  @media (max-width: 930px) {
    .number, .date, .delnum, .deldate {
      display: none;
    }
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 50px;
`;

const Btn = styled.button`
  margin: 10px 0 0;
  width: 100px;
  height: 40px;  
  border: 1px solid ${COLORS.light_gray};
  color: ${COLORS.light_gray};
  font-size: 14px;
  &:hover{
    border: none;
    background: ${COLORS.blue};
    color: ${COLORS.white};
  }
  &:disabled {
    opacity: 0.5;
  }
`;
