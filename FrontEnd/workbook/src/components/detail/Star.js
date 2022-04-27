<<<<<<< HEAD
import styled from 'styled-components';
import { COLORS } from '../../constants';

export default function Star({count, averageStar, shareCount}) {
  return (
    <ViewBoard>
      <Item>
        <Icon src={'/img/person.svg'}></Icon>
        <TextBox>
          <Num>{count}</Num>
          <Tit>조회수</Tit>
        </TextBox>
      </Item>
      <Item>
        <Icon src={'/img/star.svg'}></Icon>
        <TextBox>
          <Num>{averageStar}</Num>
          <Tit>평균 별점</Tit>
        </TextBox>
      </Item>
      <Item>
        <Icon src={'/img/share.svg'}></Icon>
        <TextBox>
          <Num>{shareCount}</Num>
          <Tit>공유된 횟수</Tit>
        </TextBox>
      </Item>
    </ViewBoard>
  )
}

const ViewBoard = styled.section`
  display: flex;
  gap: 30px;
  margin: 50px auto;
  width: 800px;
`;

const Item = styled.article`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 30px;
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 4%);
`;

const Icon = styled.div`
  padding: 15px;
  width: 24px;
  height: 24px;
  border-radius: 30px;
  background: ${COLORS.alpha_blue} url(${props => props.src}) no-repeat center;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Num = styled.span`
  font-size: 24px;
`;

const Tit = styled.span`
  color: ${COLORS.light_gray};
  font-size: 13px;
`;
=======
import styled from 'styled-components';
import { COLORS } from '../../constants';

export default function Star({count, averageStar, shareCount}) {
  return (
    <ViewBoard>
      <Item>
        <Icon src={'/img/person.svg'}></Icon>
        <TextBox>
          {count && <Num>{parseInt(count/2)}</Num>}
          <Tit>조회수</Tit>
        </TextBox>
      </Item>
      <Item>
        <Icon src={'/img/star.svg'}></Icon>
        <TextBox>
          <Num>{averageStar}</Num>
          <Tit>평균 별점</Tit>
        </TextBox>
      </Item>
      <Item>
        <Icon src={'/img/share.svg'}></Icon>
        <TextBox>
          <Num>{shareCount}</Num>
          <Tit>공유된 횟수</Tit>
        </TextBox>
      </Item>
    </ViewBoard>
  )
}

const ViewBoard = styled.section`
  display: flex;
  gap: 30px;
  margin: 50px auto 80px;
  width: 800px;
  @media (max-width: 900px) { 
    width: 500px;
  
  }
  @media (max-width: 520px) {
    width: 90%;
    gap: 0;
  }
`;

const Item = styled.article`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 30px;
  width: 300px;
  border-radius: 3px;
  @media (max-width: 900px) { 
    /* width: 500px; */
    flex-direction: column;
    align-items: center;
    transition: all 0.3s;
  }

  /* @media (max-width: 860px) { 
    width: 200px;
  } */
  `;

const Icon = styled.div`
  padding: 15px;
  width: 24px;
  height: 24px;
  /* border-radius: 30px; */
  border: 0.5px solid ${COLORS.blue};
  box-shadow: 3px 3px 1px 1px rgb(153 178 246 / 35%);
  background: url(${props => props.src}) no-repeat center;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Num = styled.span`
  font-size: 24px;
`;

const Tit = styled.span`
  color: ${COLORS.light_gray};
  font-size: 13px;
`;
>>>>>>> 06f68097701e569c9cf3517a15b981fdce0f81e4
