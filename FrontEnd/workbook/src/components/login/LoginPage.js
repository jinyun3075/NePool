<<<<<<< HEAD
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import styled from 'styled-components';
import axios from 'axios';
import { API, COLORS } from '../../constants'

export default function LoginPage() {
  const navigate = useNavigate();

  const [loginErr, setLoginErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const userData = {
      username: data.id,
      password: data.password
    };
    try {
      const res = await axios.post(`${API}/user/login`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      window.sessionStorage.setItem('token', res.data.token);
      window.sessionStorage.setItem('user', res.data.username);
      navigate("/");
    } catch (err) {
      setLoginErr("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <main className="container">
      <h1 className="blind">로그인 또는 회원가입</h1>
      <LoginBox>
        <img src="/img/logo.svg" alt="logo" />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="id"></label>
            <Input
              id="id"
              name="id"
              type="text"
              placeholder="아이디"
              {...register("id", {
                required: true,
                minLength: 2,
                maxLength: 15,
                pattern: /^[a-zA-Z0-9]*$/,
              })}
            />
          <label htmlFor="password"></label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 16,
                pattern: /^[-!@#a-z0-9]+$/gi,
              })}
            />
            {errors.id && (errors.id.type === 'minLength' || errors.id.type === 'maxLength' || errors.id.type === 'pattern') && (<Err>아이디는 2-15자의 영문, 숫자로 입력해주세요.</Err>)}
            {errors.password && (errors.password.type === 'minLength' || errors.password.type === 'maxLength' || errors.password.type === 'pattern') && (<Err>비밀번호는 6-16자의 영문, 숫자, @,#,! 로 입력해주세요.</Err>)}
            {loginErr.length > 1 && (<Err>{loginErr}</Err>)}
            <Btn
              className="loginBtn"
              disabled={!isValid}
              type="submit"
            >로그인</Btn>
        </Form>
        {/* <OrLine>또는</OrLine>
        <SocialLogin>
          <SocialBtn color="#f2c94c" name="/img/kakao.svg">카카오톡 계정으로 로그인</SocialBtn>
          <SocialBtn color="#00BF18" name="/img/naver.svg">네이버 계정으로 로그인</SocialBtn>
        </SocialLogin> */}
        <Signup>
          <Link to='/join'>
            <li>회원가입</li>
          </Link>
          {/* <li>아이디/비밀번호 찾기</li> */}
        </Signup>
      </LoginBox>
    </main>
  )
}

const LoginBox = styled.article`
  padding: 40px 20px;
  margin: 110px auto 10px;
  width: 100%;
  max-width: 450px;
  img {
    display: block;
    margin: 18px auto 60px;
    width: 250px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  span {
    font-size: 13px;
  }
`;

const Input = styled.input`
  margin-bottom: 30px;
  width: 400px;
  height: 40px;
  border: none;
  border-bottom: 1px solid ${COLORS.light_gray};
  color: ${COLORS.black};
  &::placeholder {
    color: ${COLORS.gray};
  }
  &:focus {
    border-bottom: 1px solid ${COLORS.blue};
    outline: none;
  }
`;

const Err = styled.span`
  margin: 0 0 10px;
  width: 400px;
  color: ${COLORS.error};
`;

const Btn = styled.button`
  margin: 15px 0 0;
  width: 400px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 16px;
`;

// const OrLine = styled.span`
//   display: block;
//   position: relative;
//   margin: 0 auto 20px;
//   width: 400px;
//   color: ${COLORS.gray};
//   font-size: 13px;
//   text-align: center;
//   &::before, &::after {
//     position: absolute;
//     content: "";
//     top: 50%;
//     left: 0;
//     width: 178px;
//     border-top: 1px solid ${COLORS.light_gray};
//   }
//   &::after {
//     left: 220px;
//   }
// `;

// const SocialLogin = styled.section`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 24px;
//   margin-top: 32px;
// `;

// const SocialBtn = styled.button`
//   position: relative;
//   width: 400px;
//   height: 50px;
//   border: 1px solid ${props => props.color};
//   border-radius: 5px;
//   background: none;
//   color: ${COLORS.gray};
//   font-size: 14px;
//   &::before {
//     content: "";
//     position: absolute;
//     top: 12px;
//     left: 17px;
//     width: 24px;
//     height: 24px;
//     background: url(${props => props.name});
//     background-size: 24px;
//   }
// `;

const Signup = styled.ul`
  display: flex;
  justify-content: center;
  gap: 15px;
  position: relative;
  margin-top: 35px;
  li {
    color: ${COLORS.gray};
    font-size: 13px;
  }
  /* &::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 187px;
    height: 12px;
    border-left: 1px solid ${COLORS.light_gray};
  } */
`;
=======
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import styled from 'styled-components';
import axios from 'axios';
import { API, COLORS } from '../../constants'

export default function LoginPage() {
  const navigate = useNavigate();

  const [loginErr, setLoginErr] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    const userData = {
      username: data.id,
      password: data.password
    };
    try {
      const res = await axios.post(`${API}/user/login`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      window.sessionStorage.setItem('token', res.data.token);
      window.sessionStorage.setItem('user', res.data.username);
      navigate("/");
    } catch (err) {
      setLoginErr("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <main className="container">
      <h1 className="blind">로그인 또는 회원가입</h1>
      <LoginBox>
        <Link to="/">
          <img src="/img/logo.svg" alt="logo" />
        </Link>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="id"></label>
            <Input
              id="id"
              name="id"
              type="text"
              placeholder="아이디"
              {...register("id", {
                required: true,
                minLength: 2,
                maxLength: 15,
                pattern: /^[a-zA-Z0-9]*$/,
              })}
            />
          <label htmlFor="password"></label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 16,
                pattern: /^[-!@#a-z0-9]+$/gi,
              })}
            />
            {errors.id && (errors.id.type === 'minLength' || errors.id.type === 'maxLength' || errors.id.type === 'pattern') && (<Err>아이디는 2-15자의 영문, 숫자로 입력해주세요.</Err>)}
            {errors.password && (errors.password.type === 'minLength' || errors.password.type === 'maxLength' || errors.password.type === 'pattern') && (<Err>비밀번호는 6-16자의 영문, 숫자, @,#,! 로 입력해주세요.</Err>)}
            {loginErr.length > 1 && (<Err>{loginErr}</Err>)}
            <Btn
              className="loginBtn"
              disabled={!isValid}
              type="submit"
            >로그인</Btn>
        </Form>
        {/* <OrLine>또는</OrLine>
        <SocialLogin>
          <SocialBtn color="#f2c94c" name="/img/kakao.svg">카카오톡 계정으로 로그인</SocialBtn>
          <SocialBtn color="#00BF18" name="/img/naver.svg">네이버 계정으로 로그인</SocialBtn>
        </SocialLogin> */}
        <Signup>
          <Link to='/join'>
            <li>회원가입</li>
          </Link>
          {/* <li>아이디/비밀번호 찾기</li> */}
        </Signup>
      </LoginBox>
    </main>
  )
}

const LoginBox = styled.article`
  padding: 40px 20px;
  margin: 110px auto 10px;
  max-width: 450px;
  img {
    display: block;
    margin: 18px auto 60px;
    width: 250px;
  }
  @media (max-width: 580px) {
    min-width: 320px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
  span {
    font-size: 13px;
  }
`;

const Input = styled.input`
  margin-bottom: 30px;
  width: 400px;
  height: 40px;
  border: none;
  border-bottom: 1px solid ${COLORS.light_gray};
  color: ${COLORS.black};
  &::placeholder {
    color: ${COLORS.gray};
  }
  &:focus {
    border-bottom: 1px solid ${COLORS.blue};
    outline: none;
  }
  @media (max-width: 560px) {
    width: 320px;
    transition: all 0.3s;
  }
`;

const Err = styled.span`
  margin: 0 0 10px;
  width: 400px;
  color: ${COLORS.error};
  @media (max-width: 560px) {
    width: 320px;
    transition: all 0.3s;
  }
`;

const Btn = styled.button`
  margin: 15px 0 0;
  width: 400px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: 16px;
  @media (max-width: 560px) {
    width: 320px;
    transition: all 0.3s;
  }
`;

// const OrLine = styled.span`
//   display: block;
//   position: relative;
//   margin: 0 auto 20px;
//   width: 400px;
//   color: ${COLORS.gray};
//   font-size: 13px;
//   text-align: center;
//   &::before, &::after {
//     position: absolute;
//     content: "";
//     top: 50%;
//     left: 0;
//     width: 178px;
//     border-top: 1px solid ${COLORS.light_gray};
//   }
//   &::after {
//     left: 220px;
//   }
// `;

// const SocialLogin = styled.section`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 24px;
//   margin-top: 32px;
// `;

// const SocialBtn = styled.button`
//   position: relative;
//   width: 400px;
//   height: 50px;
//   border: 1px solid ${props => props.color};
//   border-radius: 5px;
//   background: none;
//   color: ${COLORS.gray};
//   font-size: 14px;
//   &::before {
//     content: "";
//     position: absolute;
//     top: 12px;
//     left: 17px;
//     width: 24px;
//     height: 24px;
//     background: url(${props => props.name});
//     background-size: 24px;
//   }
// `;

const Signup = styled.ul`
  display: flex;
  justify-content: center;
  gap: 15px;
  position: relative;
  margin-top: 35px;
  li {
    color: ${COLORS.gray};
    font-size: 13px;
  }
  
  /* &::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 187px;
    height: 12px;
    border-left: 1px solid ${COLORS.light_gray};
  } */
`;
>>>>>>> 06f68097701e569c9cf3517a15b981fdce0f81e4
