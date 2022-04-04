import styled from 'styled-components';
import { COLORS } from '../../constants'

export default function NoticePage() {  
  return (
    <>
      <main className="container">
        <h1 className="blind">공지사항</h1>
        <NoticeBoard>
          <NoticeSection>
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
        </NoticeBoard>
      </main>
    </>
  )
}

const NoticeBoard = styled.section`
  position: relative;
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
`

const NoticeList = styled.table`
  border-top: 1px solid ${COLORS.white_gray};
  width: 100%;
  margin: 0 auto;
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