import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API, COLORS } from "../../constants";

export default function SetProfile() {
  const token = sessionStorage.getItem("token");

  const location = useLocation();
  const userInfo = location.state.userInfo;

  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    password: "",
    name: userInfo.name,
    image: userInfo.image,
  });

  const [files, setFiles] = useState(`${user.image}`);

  const getUser = async () => {
    await axios.put(
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
    navigate(-1);
  };
  const UploadImg = async (e) => {
    const formData = new FormData();
    const uploadFiles = e.target.files[0];
    formData.append("uploadFiles", uploadFiles);

    const res = await axios.post(`${API}/upload`, formData, {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    setFiles(res.data[0].imageUrl);
  };
  const DeleteProfile = async (e) => {
    await axios.delete(`${API}/user/delete/${userInfo.id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const change = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!token) {
      navigate("/", { replace: true });
    }
  }, []);

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
              <img
                src={
                  files ? files : user.image ? user.image : "./img/basic.png"
                }
                alt="프로필 사진"
              />
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
            type="password"
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
  position: relative;
  padding: 0 0 30px;
  margin: 40px auto;
  width: 70%;
  min-width: 550px;
  border: 1.5px solid ${COLORS.light_gray};
  border-radius: 7px;
  h1 {
    margin: 9px 20px;
    font-size: 15px;
    font-weight: 500;
  }
  &::after {
    position: absolute;
    content: "";
    top: 35px;
    left: 0;
    width: 100%;
    border-bottom: 1.5px solid ${COLORS.light_gray};
  }
  @media (max-width: 570px) {
    min-width: 380px;
    transition: all 0.3s;
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
  margin: 40px auto;
  width: 150px;
  text-align: center;
`;

const ProfileImg = styled.div`
  width: 150px;
  height: 150px;
  border: 0.5px solid ${COLORS.light_gray};
  border-radius: 6px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 6px;
    object-fit: cover;
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
  margin: 0 auto;
  width: 400px;
  @media (max-width: 570px) {
    width: 350px;
    transition: all 0.3s;
  }
`;

const Label = styled.label`
  display: block;
  margin: 5px 0;
  color: ${COLORS.text_gray};
  font-size: 14px;
`;

const Input = styled.input`
  padding-left: 0;
  margin-bottom: 22px;
  width: 400px;
  height: 35px;
  border: none;
  border-bottom: 1px solid ${COLORS.light_gray};
  background: none;
  color: ${COLORS.black};
  font-size: 15px;
  &::placeholder {
    color: ${COLORS.light_gray};
    font-size: 13px;
  }
  &:focus {
    border-bottom: 1px solid ${COLORS.blue};
    outline: none;
  }
  @media (max-width: 570px) {
    width: 330px;
    transition: all 0.3s;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 400px;
  @media (max-width: 570px) {
    width: 330px;
    transition: all 0.3s;
  }
`;

const SaveBtn = styled.button`
  margin: 15px 0 0;
  width: 70px;
  height: 30px;
  border: 1px solid ${COLORS.blue};
  border-radius: 5px;
  background-color: ${COLORS.white};
  color: ${COLORS.blue};
  font-size: 13px;
  :hover {
    background-color: ${COLORS.blue};
    color: ${COLORS.white};
  }
`;

const DelBtn = styled.button`
  margin: 15px 0 0;
  width: 70px;
  height: 30px;
  border: 1px solid ${COLORS.error};
  border-radius: 5px;
  background-color: #fff;
  color: ${COLORS.error};
  font-size: 13px;
  :hover {
    background-color: ${COLORS.error};
    color: ${COLORS.white};
  }
`;

const InputImg = styled.input`
  display: none;
`;
