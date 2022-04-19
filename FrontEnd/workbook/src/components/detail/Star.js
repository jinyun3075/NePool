import styled from 'styled-components';
import { COLORS } from '../../constants';

export default function Star({count, averageStar, shareCount}) {
  return (
    <>
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
    </>
  )
}

const ViewBoard = styled.section`
  width: 800px;
  display: flex;
  gap: 30px;
  margin: 50px auto;
`

const Item = styled.article`
  width: 300px;
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 4%);
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 30px;
`

const Icon = styled.div`
  width: 24px;
  height: 24px;
  padding: 15px;
  border-radius: 30px;
  background: ${COLORS.alpha_blue} url(${props => props.src}) no-repeat center;
`

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
`

const Num = styled.span`
  font-size: 24px;
`

const Tit = styled.span`
  font-size: 13px;
  color: ${COLORS.light_gray};
`