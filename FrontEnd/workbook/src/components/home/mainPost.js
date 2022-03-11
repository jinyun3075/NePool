import React from "react";
import styled from "styled-components";

export default function MainPost() {
    return (
        <>
            <Category>
                <CategoryItem><button>전체</button></CategoryItem>
                <CategoryItem><button>수능내신</button></CategoryItem>
                <CategoryItem><button>어학자격증</button></CategoryItem>
                <CategoryItem><button>국가기술자격증</button></CategoryItem>
                <CategoryItem><button>국가전문자격증</button></CategoryItem>
                <CategoryItem><button>기타자격증</button></CategoryItem>
            </Category>
            <ItemBox>
                <Items>
                    <li>
                        <a href="#">
                            <TextBox>
                                <ItemSrc size="27px">✨수능내신</ItemSrc>
                                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                                <ItemSrc size="15px">수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지 않나요? 그렇죠? 풀어보세요 제발</ItemSrc>
                            </TextBox>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <TextBox>
                                <ItemSrc size="27px">✨수능내신</ItemSrc>
                                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                                <ItemSrc size="15px">수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지 않나요? 그렇죠? 풀어보세요 제발</ItemSrc>
                            </TextBox>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <TextBox>
                                <ItemSrc size="27px">✨수능내신</ItemSrc>
                                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                                <ItemSrc size="15px">수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지 않나요? 그렇죠? 풀어보세요 제발</ItemSrc>
                            </TextBox>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <TextBox>
                                <ItemSrc size="27px">✨수능내신</ItemSrc>
                                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                                <ItemSrc size="15px">수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지 않나요? 그렇죠? 풀어보세요 제발</ItemSrc>
                            </TextBox>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <TextBox>
                                <ItemSrc size="27px">✨수능내신</ItemSrc>
                                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                                <ItemSrc size="15px">수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지 않나요? 그렇죠? 풀어보세요 제발</ItemSrc>
                            </TextBox>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <TextBox>
                                <ItemSrc size="27px">✨수능내신</ItemSrc>
                                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                                <ItemSrc size="15px">수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지 않나요? 그렇죠? 풀어보세요 제발</ItemSrc>
                            </TextBox>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <TextBox>
                                <ItemSrc size="27px">✨수능내신</ItemSrc>
                                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                                <ItemSrc size="15px">수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지 않나요? 그렇죠? 풀어보세요 제발</ItemSrc>
                            </TextBox>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <TextBox>
                                <ItemSrc size="27px">✨수능내신</ItemSrc>
                                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                                <ItemSrc size="15px">수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지 않나요? 그렇죠? 풀어보세요 제발</ItemSrc>
                            </TextBox>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <TextBox>
                                <ItemSrc size="27px">✨수능내신</ItemSrc>
                                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                                <ItemSrc size="15px">수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지 않나요? 그렇죠? 풀어보세요 제발</ItemSrc>
                            </TextBox>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <TextBox>
                                <ItemSrc size="27px">✨수능내신</ItemSrc>
                                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                                <ItemSrc size="15px">수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지 않나요? 그렇죠? 풀어보세요 제발</ItemSrc>
                            </TextBox>
                        </a>
                    </li>
                </Items>
            </ItemBox>
            <MoreBtn href="#">더보기</MoreBtn>
        </>
    )
}

//네브바
const Category = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    border-bottom: 1px solid #b6b6b6;
`
const CategoryItem = styled.li`
    margin: 0 40px;
    button {
        font-size: 20px;
    }
`
//리스트
const ItemBox = styled.div`
    display: flex;
    justify-content: center;
`
const Items = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 1680px;
    li {
        width: 280px;
        height: 320px;
        border-bottom: 1px solid #b6b6b6;
        border-left: 1px solid #b6b6b6;
        border-right: 1px solid #b6b6b6;
        a {
            display: inline-block;
            width: 280px;
            height: 320px;
        }
    }
`
const TextBox = styled.div`
      margin: 30px 30px 0 30px;
`
const ItemSrc = styled.p`
    margin-bottom: 15px;
    font-size: ${props => props.size};
`

const MoreBtn = styled.a`
    display: block;
    width: 230px;
    height: 45px;
    margin: 82px auto 67px;
    border: 0.5px solid #b6b6b6;
    text-align: center;
    font-size: 15px;
    line-height: 45px;
`