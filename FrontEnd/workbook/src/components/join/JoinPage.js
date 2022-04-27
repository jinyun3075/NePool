import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FileUpload } from './FileUpload';
import styled, { css } from 'styled-components';
import axios from "axios";
import { API, COLORS } from '../../constants'

export default function JoinPage() {
  const password = useRef();
  
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ 
    mode: 'onChange',
  });
  
  const [error, setError] = useState("");
  const [image, setImage] = useState("/img/basic.png");
  const [isImage, setIsImage] = useState(false);
  
  password.current = watch("password");

  const getImage = (src) => {
    setImage(src);
  };

  const getIsImage = (img) => {
    setIsImage(img);
  };

  const onSubmit = async (data) => {
    const userData = {
      username: data.id,
      email: data.email,
      password: data.password,
      name: data.nickname,
      image: image,
    };
    const res = await axios.post(`${API}/user`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(res.data.message) setError(res.data.message);
    else navigate('/login');
  };

  return (
    <main>
      <h1 className="blind">로그인 또는 회원가입</h1>
      <LoginBox>
        <Link to="/">
          <Logo src="/img/logo.svg" alt="logo" />
        </Link>
        <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <FileUpload
            image={image}
            getImage={getImage}
            isImage={isImage}
            getIsImage={getIsImage}
          />
          <Label htmlFor="id">
            <Input
              id="id"
              name="id"
              type="text"
              placeholder="아이디"
              {...register("id", {
                required: true,
                minLength: 2,
                maxLength: 15,
                pattern: /^[a-zA-Z0-9]*$/
              })}
            />
          </Label>
          {errors.id && (errors.id.type === 'minLength' || errors.id.type === 'maxLength' || errors.id.type === 'pattern') && (<Err>2-15자의 영문, 숫자만 가능합니다.</Err>)}
          <Label htmlFor="password">
            <Input
              id="password"
              name="password"
              type="password"
              ref={password}
              placeholder="비밀번호"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 16,
                pattern: /^[-!@#a-z0-9]+$/gi,
              })}
            />
          </Label>
          {errors.password && (errors.password.type === 'minLength' || errors.password.type === 'maxLength' || errors.password.type === 'pattern') && (<Err>6-16자의 영문, 숫자, @,#,! 만 가능합니다.</Err>)}
          <Label htmlFor="passwordCheck">
            <Input
              id="passwordCheck"
              name="passwordCheck"
              type="password"
              placeholder="비밀번호 재확인"
              {...register("passwordCheck", {
                required: true,
                validate: value => value === password.current
              })}
            />
          </Label>
          {errors.passwordCheck && errors.passwordCheck.type === "validate" && (<Err>비밀번호가 일치하지 않습니다.</Err>)}
          <Label htmlFor="nickname">
            <Input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="닉네임"
              {...register("nickname", {
                required: true
              })}
            />
          </Label>
          <Label htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일"
              {...register("email", {
                required: true,
                pattern: /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
              })}
            />
          </Label>
          {errors.email && (errors.email.type === 'pattern') && (<Err>이메일 형식에 맞지 않습니다.</Err>)}
          {error && (<Err error={error}>{error}</Err>)}
          <Btn type="submit" disabled={!isValid}>가입하기</Btn>
        </Form>
      </LoginBox>
    </main>
  )
}

const LoginBox = styled.article`
  padding: 40px 20px;
  margin: 50px auto 10px;

  max-width: 450px;
  border-radius: 10px;
`;

const Logo = styled.img`
  display: block;
  margin: 10px auto 30px;
  width: 250px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  span {
    font-size: 14px;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  padding: 3px 5px;
  margin: 12px;
  width: 390px;
  height: 40px;
  border: none;
  border-bottom: 1px solid ${COLORS.light_gray};
  /* border-radius: 5px; */
  background: none;
  color: ${COLORS.black};
  &::placeholder {
    color: ${COLORS.gray};
  }
  &:focus {
    border-bottom: 1px solid ${COLORS.blue};
    outline: none;
  }
  @media (max-width: 580px) {
    width: 320px;
    transition: all 0.3s;
  }
`;

const Err = styled.span`
  margin: 0 0 10px;
  width: 400px;
  color: ${COLORS.error};
  ${props => props.error &&
    css`
      margin: 0;
      width: inherit;
  `}
  @media (max-width: 560px) {
    width: 320px;
    transition: all 0.3s;
  }
`;

const Btn = styled.button`
  margin-top: 25px;
  width: 400px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 16px;
  &:disabled {
    opacity: 0.5;
  }
  @media (max-width: 560px) {
    width: 320px;
    transition: all 0.3s;
  }
`;
