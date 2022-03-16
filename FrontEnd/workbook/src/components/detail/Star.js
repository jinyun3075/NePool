import styled from 'styled-components';

export default function Star() {

  return (
    <>
      <StarBoard>
        <MyStar>
          <Tit>내 별점</Tit>
          <Num>0</Num>
          <StarList>
            <li><img src="/img/star_1.svg" alt="" /></li>
            <li><img src="/img/star_1.svg" alt="" /></li>
            <li><img src="/img/star_1.svg" alt="" /></li>
            <li><img src="/img/star_1.svg" alt="" /></li>
            <li><img src="/img/star_1.svg" alt="" /></li>
          </StarList>
        </MyStar>
        <MyStar>
          <Tit>평균 별점</Tit>
          <Num>4.5</Num>
          <StarList>
            <li><img src="/img/star_1.svg" alt="" /></li>
            <li><img src="/img/star_1.svg" alt="" /></li>
            <li><img src="/img/star_1.svg" alt="" /></li>
            <li><img src="/img/star_1.svg" alt="" /></li>
            <li><img src="/img/star_1.svg" alt="" /></li>
          </StarList>
        </MyStar>
      </StarBoard>
    </>
  )
}

const StarBoard = styled.section`
  width: 600px;
  /* height: 550px; */
  display: flex;
  margin: 50px auto;
`

const MyStar = styled.article`
  width: 300px;
  /* margin-right: 100px; */
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`

const Num = styled.span`
  font-size: 24px;
`

const StarList = styled.ul`
  display: flex;
`

const Tit = styled.span`
  font-size: 16px;
`