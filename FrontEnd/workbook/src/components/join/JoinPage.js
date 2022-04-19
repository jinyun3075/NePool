import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { API, COLORS } from '../../constants'
import { useNavigate } from 'react-router-dom';
import { FileUpload } from './FileUpload';

export default function JoinPage() {

  const token = localStorage.getItem("token")

  const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({ mode: 'onBlur' })

  const [nicknameError, setNicknameError] = useState("");
  const [idError, setIdError] = useState("");

  const password = useRef();
  password.current = watch("password")

  const [image, setImage] = useState("/img/basic.png")
  const [isImage, setIsImage] = useState(false)

  const getImage = (src) => {
    setImage(src)
  }

  const getIsImage = (img) => {
    setIsImage(img)
  }

  const onSubmit = async (data) => {
    const userData = {
      username: data.id,
      email: data.email,
      password: data.password,
      name: data.nickname,
      image: image,
    }
    const res = await axios.post(`${API}/user`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if(res.data.message) setIdError(res.data.message)
    else navigate('/login')
  }

  return (
    <>
      <main>
        <h1 className="blind">로그인 또는 회원가입</h1>
        <LoginBox>
          <Logo src="/img/logo.svg" alt="logo" />
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FileUpload image={image} getImage={getImage} isImage={isImage} getIsImage={getIsImage} />
            <label htmlFor="id">
              <Input
                id="id"
                name="id"
                placeholder="아이디"
                {...register("id", {
                  required: true,
                  minLength: 2,
                  maxLength: 15,
                  pattern: /^[a-zA-Z0-9]*$/
                })}
              />
            </label>
            {errors.id && (errors.id.type === 'minLength' || errors.id.type === 'maxLength' || errors.id.type === 'pattern') && (<Err>2-15자의 영문, 숫자만 가능합니다.</Err>)}
            
            <label htmlFor="password">
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호"
                ref={password}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 16,
                  pattern: /^[-!@#a-z0-9]+$/gi,
                })}
              />
            </label>
            {errors.password && (errors.password.type === 'minLength' || errors.password.type === 'maxLength' || errors.password.type === 'pattern') && (<Err>6-16자의 영문, 숫자, @,#,! 만 가능합니다.</Err>)}
            <label htmlFor="passwordCheck">
              <Input
                type="password"
                id="passwordCheck"
                name="passwordCheck"
                placeholder="비밀번호 재확인"
                {...register("passwordCheck", {
                  required: true,
                  validate: value => value === password.current
                })}
              />
            </label>
            {errors.passwordCheck && errors.passwordCheck.type === "validate" && (<Err>비밀번호가 일치하지 않습니다.</Err>)}
            <label htmlFor="nickname">
              <Input
                id="nickname"
                name="nickname"
                placeholder="닉네임"
                {...register("nickname", {
                  required: true
                })}
              />
            </label>
            {nicknameError && (<Err>{nicknameError}</Err>)}
            <label htmlFor="email">
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="이메일"
                {...register("email", {
                  required: true,
                  pattern: /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                })}
              />
            </label>
            {errors.email && (errors.email.type === 'pattern') && (<Err>이메일 형식에 맞지 않습니다.</Err>)}
            {idError && (<Err>{idError}</Err>)}
            <Btn type="submit" disabled={!isValid}>가입하기</Btn>
          </Form>
        </LoginBox>
      </main>
    </>
  )
}

const LoginBox = styled.article`
  margin: 70px auto 10px;
  max-width: 450px;
  width: 100%;
  /* border: 1px solid ${COLORS.light_gray}; */
  border-radius: 10px;
  padding: 40px 20px;
`

const Logo = styled.img`
  display: block;
  margin: 18px auto 50px;
  width: 250px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  span {
    font-size: 14px;
  }
`

const Input = styled.input`
  width: 368px;
  height: 40px;
  color: ${COLORS.black};
  margin: 14px 0 12px;
  padding: 3px 16px;
  border: 1px solid ${COLORS.light_gray};
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

const Err = styled.span`
  /* display: none; */
  color: ${COLORS.error};
`

const Btn = styled.button`
  font-size: 14px;
  width: 400px;
  height: 50px;
  font-size: 16px;
  margin-top: 35px;
  color: #fff;
  background-color: ${COLORS.blue};
  border: none;
  border-radius: 5px;
  &:disabled {
    opacity: 0.5;
  }
`
