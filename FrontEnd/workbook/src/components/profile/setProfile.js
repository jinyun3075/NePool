import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { API, COLORS } from "../../constants";

export default function SetProfile() {
  //유저정보 불러오기
  const location = useLocation();
  const userInfo = location.state.userInfo;
  // const password = userInfo.password;
  // console.log(userInfo.image);
  const [user, setUser] = useState({
    id: "",
    password: "",
    name: userInfo.name,
    image: userInfo.image,
  });
  // console.log(userInfo);

  const change = (e) => {
    // console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //프로필 변경 API(Put)
  const getUser = async () => {
    const token = sessionStorage.getItem("token");
    console.log(user.image);
    const res = await axios.put(
      `${API}/user/update/to`,
      {
        id: userInfo.id,
        password: user.password,
        name: user.name,
        image: files,
      },
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
  };
  const [files, setFiles] = useState("");

  //이미지 업로드 API
  const token = sessionStorage.getItem("token");
  const UploadImg = async (e) => {
    const formData = new FormData();
    const uploadFiles = e.target.files[0];
    console.log(uploadFiles);
    formData.append("uploadFiles", uploadFiles);

    const res = await axios.post(`${API}/upload`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    setFiles(res.data[0].imageUrl);
  };

  //프로필 삭제 API
  const DeleteProfile = async(e) => {
    const res = await axios.delete(`${API}/user/delete/${userInfo.id}`,{
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  }
  return (
    <ProfileBoard>
      <h1>프로필 설정</h1>
      <ProfileBox>
        <P>대표 프로필 이미지와 별명을 수정 하실 수 있습니다.</P>
        <InputForm
          onSubmit={function (e) {
            e.preventDefault();
          }}
        >
          <CurrentProfile>
            <ProfileImg>
              <img src={files ? files : (user.image ? user.image : './img/basic.png')} alt="프로필 사진" />
            </ProfileImg>
            <ImgBtn>
              <InputImg type="file" id="file" onChange={UploadImg} />
              <label htmlFor="file">
                <img src="/img/photo.svg" alt="이미지 변경 버튼" />
              </label>
            </ImgBtn>
          </CurrentProfile>
          <Label htmlFor="nickname">닉네임</Label>
          <Input
            id="nickname"
            name="name"
            value={user.name}
            placeholder="닉네임을 입력해 주세요"
            onChange={change}
          />
          <Label htmlFor="password">비밀번호 확인</Label>
          <Input
            id="password"
            name="password"
            value={user.password}
            placeholder="비밀번호를 입력해 주세요"
            onChange={change}
          />
          <BtnBox>
            <SaveBtn onClick={getUser}>저장</SaveBtn>
            <DelBtn onClick={DeleteProfile}>계정삭제</DelBtn>
          </BtnBox>
        </InputForm>
      </ProfileBox>
    </ProfileBoard>
  );
}

const ProfileBoard = styled.section`
  width: 70%;
  min-width: 600px;
  position: relative;
  border: 1.5px solid ${COLORS.light_gray};
  border-radius: 7px;
  margin: 40px auto;
  padding: 0 0 30px;
  h1 {
    font-size: 16px;
    font-weight: 500;
    margin: 9px 20px;
  }
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    top: 35px;
    left: 0;
    border-bottom: 1.5px solid ${COLORS.light_gray};
  }
`;
const P = styled.p`
  color: ${COLORS.light_gray};
  font-size: 13px;
  font-style: oblique;
`;
const ProfileBox = styled.article`
  padding: 15px 0 0;
  margin: 0 20px;
`;
const CurrentProfile = styled.div`
  text-align: center;
  margin: 40px auto;
  width: 150px;
`;
const ProfileImg = styled.div`
  border: 4px solid ${COLORS.alpha_blue};
  border-radius: 6px;
  width: 150px;
  img {
    /* position: absolute */
    /* width: 150px; */
    height: 150px;
    border-radius: 6px;
  }
`;
const ImgBtn = styled.div`
  position: absolute;
  margin: -25px 0 0 129px;
  label {
    cursor: pointer;
  }
`;

const InputForm = styled.form`
  width: 400px;
  margin: 0 auto;
`;
const Label = styled.label`
  display: block;
  font-size: 15px;
  color: ${COLORS.gray};
`;
const Input = styled.input`
  width: 400px;
  height: 35px;
  font-size: 15px;
  color: ${COLORS.black};
  margin-bottom: 22px;
  padding-left: 0;
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

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  margin: 0 auto;
`;
const SaveBtn = styled.button`
  width: 60px;
  height: 30px;
  font-size: 13px;
  margin: 15px 0 0;
  color: ${COLORS.blue};
  background-color: #fff;
  border: 1px solid ${COLORS.blue};
  border-radius: 5px;
`;
const DelBtn = styled.button`
  width: 60px;
  height: 30px;
  font-size: 13px;
  margin: 15px 0 0;
  color: ${COLORS.error};
  background-color: #fff;
  border: 1px solid ${COLORS.error};
  border-radius: 5px;
`;

const InputImg = styled.input`
  display: none;
`;