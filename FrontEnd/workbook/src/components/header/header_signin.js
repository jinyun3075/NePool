import React from 'react';
import styled from 'styled-components';

export default function HeaderSignin() {
  return (
    <>
      <header>
        <div className='headerWrap'>
          <div className="searchBox">
            <button className="search">
              <img src="/img/search.svg" alt="돋보기" />
            </button>
          </div>
          <h1 className="logo"><a href="#"><img src="/img/logo.svg" alt="로고" /></a></h1>
          <div className="btnBox">
            <a href="#" className='loginBtn'>로그인</a>
            <a href="#" className='joinBtn'>회원가입</a>
          </div>
          {/* <div className="profileBox">
            <button className="notice">
              <img src="/img/notice.svg" alt="알림" />
            </button>
            <button className="profile">
              <img className="profileImg" src="/img/mango.jpg" alt="프로필 사진" />
            </button>
          </div> */}
        </div>
      </header>
    </>
  );
}

// const headerWrap = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin: 0 20px;
// `;

// .headerWrap {
//   display: flex;
//   justify-content: space-between;
//   margin: 0 20px;
//   .searchBox {
//     width: 220px;
//     .search {
//       width: 40px;
//       height: 40px;
//       border: 0.5px solid #b6b6b6;
//       border-radius: 6px;
//     }
//   }
//   .btnBox {
//     display: flex;
//     justify-content: space-between;
//     width: 220px;
//     .loginBtn,
//     .joinBtn {
//       width: 100px;
//       height: 45px;
//       border: 0.5px solid #b6b6b6;
//       border-radius: 6px;
//       text-align: center;
//       line-height: 45px;
//     }
//     .loginBtn {
//       color: white;
//       background-color: #2f80ed;
//     }
//   }
//  .profileBox {
//      display: flex;
//      justify-content:right;
//      width: 220px;
//      .profile {
         
//         .profileImg {
//             width: 40px;
//             height: 40px;
//             border-radius: 6px;
//         }
//      }
//  }
// }
