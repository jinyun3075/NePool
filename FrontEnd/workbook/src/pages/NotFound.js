import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { COLORS } from '../constants';

export default function NotFound() {
  const navigate = useNavigate()
  
  return (
    <Container>
      <Div>
        <Tit404>페이지를 찾을 수 없습니다.</Tit404>
        <div>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. 입력하신 주소가 정확한지 다시 한 번 확인해주세요.</div>
        <PrevBtn onClick={() => {navigate(-1)}}>이전 페이지</PrevBtn>
      </Div>
    </Container>
  )
}

const Container = styled.section`
  margin: 180px auto;
  width: 700px;
  border: 1px solid ${COLORS.light_gray};
  @media (max-width: 720px) {
    width: 70%;
    min-width: 350px;
    transition: all 0.3s;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  margin: 100px 0 80px;
  div {
    width: 500px;
    color: ${COLORS.black};
    font-size: 15px;
  }
  @media (max-width: 720px) {
    div {
      width: 80%;
      font-size: 13px;
      transition: all 0.3s;
    }
  }
`;

const Tit404 = styled.p`
  color: ${COLORS.black};
  font-size: 35px;
  @media (max-width: 720px) {
    font-size: 30px;
    transition: all 0.3s;
  }
  @media (max-width: 520px) {
    font-size: 25px;
    transition: all 0.2s;
  }
`;

const PrevBtn = styled.button`
  width: 150px;
  height: 48px;
  border-radius: 30px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
`;
