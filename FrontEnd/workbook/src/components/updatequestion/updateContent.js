import axios from "axios";
import { useCallback, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { API, COLORS } from "../../constants/index";

export default function UpdateCont({workbookid}) {
    const navigate= useNavigate();
    const location = useLocation()
    const username = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    const question = location.state.question

    const [answer, setAnswer] = useState({
        question: "",
        answerA: "",
        answerB: "",
        answerC: "",
        answerD: "",
        answerE: "",
        correct: "",
        explanation: ""
    })

    const [error, setError] = useState("")

    const [selected, setSelected] = useState(false)

    const onChange = (e) => {
    const { name, value } = e.target;
    setAnswer({...answer, [name]: value})
    };

    const onClick = (e) => {
    const {value} = e.target
    setAnswer({...answer, correct: value})
    setSelected(!selected)
    }

    const onSubmit = async (e) => {
    e.preventDefault()
    const QuestionData = {
        question: answer.question,
        answer_a: answer.answerA,
        answer_b: answer.answerB,
        answer_c: answer.answerC,
        answer_d: answer.answerD,
        answer_e: answer.answerE,
        correct: answer.correct,
        explanation: answer.explanation
    }
    const res = await axios.put(`${API}/work/${username}/${workbookid}/${question.id}`, QuestionData, {
        headers: {
        'Content-Type': 'application/json',
        Authorization : `Bearer ${token}`
        },
    })
    if(res.data.message) setError(res.data.message)
    else navigate(-1);
    }

    return (
        <>
        <Right>
            <Myworkbook>
            <p>문제집 만들기</p>
            </Myworkbook>
            <MakeBox onSubmit={onSubmit} autoComplete="off">
            <Box>
            <LeftBox>
                <Input
                name="question"
                type="text"
                id="question"
                value={answer.question}
                onChange={onChange} 
                placeholder={question.question} 
                />
                <div>
                <InputNum
                    name="answerA"
                    type="text"
                    id="answerA"
                    placeholder={question.answer_a}
                    value={answer.answerA}
                    onClick={onClick}
                    onChange={onChange}
                    // className={!selected ? 'selected' : ""}
                />
                <InputNum
                    name="answerB"
                    type="text"
                    id="answerB"
                    placeholder={question.answer_b}
                    value={answer.answerB}
                    onClick={onClick}
                    onChange={onChange} 
                /> 
                <InputNum
                    name="answerC"
                    type="text"
                    id="answerC"
                    placeholder={question.answer_c}
                    value={answer.answerC}
                    onClick={onClick}
                    onChange={onChange} 
                /> 
                <InputNum
                    name="answerD"
                    type="text"
                    id="answerD"
                    placeholder={question.answer_d}
                    value={answer.answerD}
                    onClick={onClick}
                    onChange={onChange} 
                /> 
                <InputNum
                    name="answerE"
                    type="text"
                    id="answerE"
                    placeholder={question.answer_e}
                    value={answer.answerE}
                    onClick={onClick}
                    onChange={onChange} 
                /> 
                </div>
                <div>정답: {answer.correct}</div>
                
                {/* <Input
                name="correct"
                type="text"
                id="correct"
                value={answer.correct}
                onChange={onChange} 
                placeholder="보기를 선택하세요!"
                /> */}
            </LeftBox>
            <RightBox>
                <InputTxt 
                name="explanation"
                type="text"
                id="explanation"
                value={answer.explanation}
                onChange={onChange} 
                placeholder={question.explanation}
                />
            </RightBox>
            
            </Box>
            <span>{error}</span>
            
            <Btn>수정</Btn>
            </MakeBox>
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
    flex-direction: column;
    gap: 10px;
    margin: 50px 0px;
    span {
    margin: 0 15px;
    color: ${COLORS.error};
    }
    `;

    const Box = styled.div`
    display: flex;
    justify-content: space-around;
    `
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

    // const CheckBox = styled.div`
    //   width: 30px;
    //   height: 30px;
    //   border: 1px solid black;
    // `

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
    &.selected {
    background: ${COLORS.alpha_gray};
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