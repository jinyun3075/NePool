import styled from "styled-components";
import { COLORS } from "../../constants/index";

export default function AddCont(props) {
    const workbookid = props.workbookid
    console.log(workbookid)
    return (
      <>
      <Right>
          <Myworkbook>
            <p>문제집 만들기</p>
          </Myworkbook>
          <MakeBox>
            <LeftBox>
              <Input placeholder="문제 입력 칸" />
              <div>
                <InputNum placeholder="보기 1" />
                <InputNum placeholder="보기 2" />
                <InputNum placeholder="보기 3" />
                <InputNum placeholder="보기 4" />
                <InputNum placeholder="보기 5" />       
              </div>
              <Input placeholder="정답 입력 칸(번호 입력)"/>
            </LeftBox>
            <RightBox>
              <InputTxt placeholder="설명 추가(선택)"/>
            </RightBox>
          </MakeBox>
          <Btn>수정</Btn>
        </Right>
      </>
    )
  }
  const Myworkbook = styled.div`
  border-bottom: 3px solid ${COLORS.light_gray};
  height: 6%;
  p {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 3rem;
    margin-left: 20px;
  }
`;

const Right = styled.article`
  position: relative;
  margin: 0 auto;
  border: 3px solid ${COLORS.light_gray};
  border-radius: 15px;
  flex-basis: 70%;
`;

//내부내용
  const MakeBox = styled.form`
  display: flex;
  justify-content: space-around;
  margin: 50px 0px;

`;
const Input = styled.input`
  width: 450px;
  height: 40px;
  color: ${COLORS.black};
  margin-bottom: 22px;
  border: none;
  border-bottom: 1px solid ${COLORS.light_gray};
  background: none;
  &::placeholder {
    color: #767676;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid ${COLORS.blue};
  }
`;
const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 525px;
  div{
      margin: 20px 0 40px;
  }
`
const RightBox = styled.div`
  /* display: flex; */
  
`
const InputNum = styled.input`
  display: block;
  width: 368px;
  height: 40px;
  color: ${COLORS.black};
  margin: 14px 0 12px;
  padding: 3px 16px;
  border: 2px solid ${COLORS.light_gray};
  border-radius: 5px;
  background: none;
  &::placeholder {
    color: #767676;
  }
  &:focus {
    outline: none;
    border: 1px solid ${COLORS.blue};
  }
`
const InputTxt = styled.textarea`
  display: block;
  width: 450px;
  height: 479px;
  color: ${COLORS.black};
  /* margin: 14px 0 12px; */
  padding: 10px 10px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 5px;
  background: none;
  resize: none;
  &::placeholder {
    color: #767676;
  }
  &:focus {
    outline: none;
    border: 1px solid ${COLORS.blue};
  }
`
const Btn = styled.button`
  width: 80px;
  height: 40px;
  color: white;
  background-color: ${COLORS.blue};
  border-radius: 6px;
  margin-left: 40px;
`