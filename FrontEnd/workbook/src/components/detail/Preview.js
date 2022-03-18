import styled from 'styled-components';
import { COLORS } from '../../constants';

export default function Preview() {

  return (
    <>
      <PrivewBoard>
        <testPreview>
          <span>📖</span>
          <Tit>문제 미리보기</Tit>
          <List>
            <li>1. 통신을 위한 프로그램을 생성하여 포트를 할당하고, 클라이언트의 통신 요청 시 클라이언트와 연결하는 내외부 송·수신 연계기술은?</li>
            <li>2. 통신을 위한 프로그램을 생성하여 포트를 할당하고, 클라이언트의 통신 요청 시 클라이언트와 연결하는 내외부 송·수신 연계기술은?</li>
            <li>3. 통신을 위한 프로그램을 생성하여 포트를 할당하고, 클라이언트의 통신 요청 시 클라이언트와 연결하는 내외부 송·수신 연계기술은?</li>
          </List>
        </testPreview>
      </PrivewBoard>
    </>
  )
}

const PrivewBoard = styled.section`
  border: 1px solid ${COLORS.light_gray};
  width: 750px;
  margin: 50px auto;
`

const testPreview = styled.article`
  width: 300px;
  display: flex;
  /* margin-right: 100px; */
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`

const List = styled.ul`
  display: flex;
`

const Tit = styled.span`
  font-size: 16px;
`