import React from "react";
import styled from "styled-components";
import HeaderSignin from "../header/header";
import PostNav from "./postNav";

export default function MorePost() {
  return (
    <>
      <HeaderSignin />
      <PostNav />
      <ItemBox>
        <Items>
          <li>
            <a href="#">
              <TextBox>
                <ItemSrc size="27px">✨수능내신</ItemSrc>
                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                <ItemSrc size="15px">
                  수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지
                  않나요? 그렇죠? 풀어보세요 제발
                </ItemSrc>
              </TextBox>
            </a>
          </li>
          <li>
            <a href="#">
              <TextBox>
                <ItemSrc size="27px">✨수능내신</ItemSrc>
                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                <ItemSrc size="15px">
                  수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지
                  않나요? 그렇죠? 풀어보세요 제발
                </ItemSrc>
              </TextBox>
            </a>
          </li>
          <li>
            <a href="#">
              <TextBox>
                <ItemSrc size="27px">✨수능내신</ItemSrc>
                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                <ItemSrc size="15px">
                  수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지
                  않나요? 그렇죠? 풀어보세요 제발
                </ItemSrc>
              </TextBox>
            </a>
          </li>
          <li>
            <a href="#">
              <TextBox>
                <ItemSrc size="27px">✨수능내신</ItemSrc>
                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                <ItemSrc size="15px">
                  수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지
                  않나요? 그렇죠? 풀어보세요 제발
                </ItemSrc>
              </TextBox>
            </a>
          </li>
          <li>
            <a href="#">
              <TextBox>
                <ItemSrc size="27px">✨수능내신</ItemSrc>
                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                <ItemSrc size="15px">
                  수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지
                  않나요? 그렇죠? 풀어보세요 제발
                </ItemSrc>
              </TextBox>
            </a>
          </li>
          <li>
            <a href="#">
              <TextBox>
                <ItemSrc size="27px">✨수능내신</ItemSrc>
                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                <ItemSrc size="15px">
                  수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지
                  않나요? 그렇죠? 풀어보세요 제발
                </ItemSrc>
              </TextBox>
            </a>
          </li>
          <li>
            <a href="#">
              <TextBox>
                <ItemSrc size="27px">✨수능내신</ItemSrc>
                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                <ItemSrc size="15px">
                  수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지
                  않나요? 그렇죠? 풀어보세요 제발
                </ItemSrc>
              </TextBox>
            </a>
          </li>
          <li>
            <a href="#">
              <TextBox>
                <ItemSrc size="27px">✨수능내신</ItemSrc>
                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                <ItemSrc size="15px">
                  수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지
                  않나요? 그렇죠? 풀어보세요 제발
                </ItemSrc>
              </TextBox>
            </a>
          </li>
          <li>
            <a href="#">
              <TextBox>
                <ItemSrc size="27px">✨수능내신</ItemSrc>
                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                <ItemSrc size="15px">
                  수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지
                  않나요? 그렇죠? 풀어보세요 제발
                </ItemSrc>
              </TextBox>
            </a>
          </li>
          <li>
            <a href="#">
              <TextBox>
                <ItemSrc size="27px">✨수능내신</ItemSrc>
                <ItemSrc size="13px">만든이: 최성이</ItemSrc>
                <ItemSrc size="15px">
                  수능내신 문제집 이것만 풀면 당신은 1등급 당장 풀어보고싶지
                  않나요? 그렇죠? 풀어보세요 제발
                </ItemSrc>
              </TextBox>
            </a>
          </li>
        </Items>
      </ItemBox>
    </>
  );
}

//리스트
const ItemBox = styled.div`
  display: flex;
  justify-content: center;
`;
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
`;
const TextBox = styled.div`
  margin: 30px 30px 0 30px;
`;
const ItemSrc = styled.p`
  margin-bottom: 15px;
  font-size: ${(props) => props.size};
`;
