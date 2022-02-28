import React from 'react';
import {Link} from 'react-router-dom';


export default function header_signin() {
    return (
      <>
        <header>
          <a href="#">Nepool</a>
          <Link to="/login">로그인</Link>
          <Link to="/signin">회원가입</Link>
        </header>
      </>
    );
}
