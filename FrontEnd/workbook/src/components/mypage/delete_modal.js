import React from 'react';
import { COLORS } from '../../constants/index';
import styled from 'styled-components';

export default function DeleteModal(){
    return(
        <>
            <Modal>
                <div className="modal_div">
                    <img src="./img/x.svg" alt="x" />
                </div>
                <p className="text">예시 문제집을 삭제하시겠습니까?</p>
                <div className="button">
                    <p className="noBtn">아니오</p>
                    <p className="yesBtn">예</p>
                </div>
            </Modal>
        </>
    )
} 


const Modal = styled.div`
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    border-radius: 5px;
    width:30%;
    height:20%;
    border:1px solid ${COLORS.light_gray};
    padding:0 1em;
    background-color: #fff;

    .modal_div{
        display:flex;
        justify-content:end;
        border-bottom:none;
        margin-top:1em;
        margin-bottom:1em;
        img{
            width:14px;
            height:14px;
            cursor:pointer;
        }
    }

    .text{
        margin-top:1em;
        font-weight: 700;
        text-align:center;
        font-size:1rem;
        color: black;

    }

    .button{
        margin-top:1em;
        display:flex;
        justify-content:center;
        .noBtn{
            cursor:pointer;
            width:28%;  
            height:2.5em;
            text-align:center;
            font-size:1rem;
            border-radius:5px;
            line-height:2.5rem;
            margin-right:0.3em;
            color:${COLORS.gray};
            border:1px solid ${COLORS.light_gray};
        }
        .yesBtn{
            cursor:pointer;
            width:28%;
            height:2.5em;
            text-align:center;
            font-size:1rem;
            border-radius:5px;
            line-height:2.5rem;
            margin-left:0.3em;
            color:#fff;
            background-color:${COLORS.blue};
        }
    }

`;