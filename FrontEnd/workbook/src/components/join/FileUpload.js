import styled from 'styled-components';
import axios from "axios";
import { API, COLORS } from '../../constants'

export const FileUpload = ({image, getImage, getIsImage}) => {

  const upload = async (e) => {
    const uploadFiles = e.target.files[0];
    const formData = new FormData();
    formData.append('uploadFiles', uploadFiles);
    
    const res = await axios.post(`${API}/upload`, formData, {
      headers: {
        'Content-type' : 'multipart/form-data',
      },
    });

    const imgName = res.data[0].imageUrl;

    getImage(imgName);
    getIsImage(true);
  }

  return (
    <ImgLabel>
      <Img
        className={`${image ? 'upload': ''}`}
        src={image}
        alt="프로필 미리보기"
      />
      <ImgInput
        id="img"
        type="file"
        accept="image/*"
        onChange={upload}
      ></ImgInput>
    </ImgLabel>
  )
};

const ImgLabel = styled.label`
  display: block;
  position: relative;
  margin: 18px auto 30px;
  width: 180px;
  height: 180px;
  border: 0.5 solid ${COLORS.gray};
  border-radius: 10px;
  background: ${COLORS.white};
  overflow: hidden;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    bottom: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border-radius: 25px;
    background: url('/img/photo.svg') no-repeat center;
  }
`;

const Img = styled.img `
  display: none;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: url('${props => props.src}');
  object-fit: cover;
  &.upload {
    display: block
  }
`;

const ImgInput = styled.input`
  display: none;
`;
