import styled from 'styled-components';
import { COLORS } from '../../constants'
import Comments from './Comments';
import Star from './Star';

export default function DetailPage() {

  return (
    <>
      <main className="container">
        <h1 className="blind">문제집 상세 페이지</h1>
        <DetailBoard>
          <DetailInfo>
            <Info>
              <SubTit>영어</SubTit>
              <Tit>운전 면허 1종</Tit>
              <Author>만든이: 123</Author>
              <span>별점: 4.5</span>
              <Explain>설마 어디가서 2종따고 운전면허 갖고 있다고 말하고다니는건 아니시죠?</Explain>
              <ButtonBox>
                <button>공부모드</button>
                <button>시험모드</button>
                <button>스크랩</button>
              </ButtonBox>
            </Info>
          </DetailInfo>
        </DetailBoard>
        <Star />
        <Comments />
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