import styled from 'styled-components';
import axios from "axios";
import { API, COLORS } from '../../constants'

export const FileUpload = ({image, getImage, isImage, getIsImage}) => {

  const upload = async (e) => {
    const uploadFiles = e.target.files[0]

    const formData = new FormData()
    
    formData.append('uploadFiles', uploadFiles);
    
    const res = await axios.post(`${API}/upload`, formData, {
      headers: {
        'Content-type' : 'multipart/form-data',
      },
    })

    const imgName = res.data[0].imageUrl;

    getImage(imgName)
    getIsImage(true)
  }

  return (
    <ImgLabel>
      <Img className={`${image ? 'upload': ''}`} src={image} alt="" />
      <ImgInput
        type="file"
        id="img"
        accept="image/*"
        onChange={upload}
      ></ImgInput>
    </ImgLabel>
  );
};

const ImgLabel = styled.label`
  margin: 18px auto 30px;
  position: relative;
  overflow: hidden;
  height: 204px;
  background: #f2f2f2;
  border: 0.5 solid #767676;
  display: block;
  border-radius: 10px;
  cursor: pointer;
  &::after {
    content: '';
    width: 36px;
    height: 36px;
    display: inline-block;
    background: url('/img/photo.svg') no-repeat center;
    border-radius: 25px;
    position: absolute;
    bottom: 12px;
    right: 12px;
  }
`;

const Img = styled.img `
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: url('${props => props.src}');
  object-fit: cover;
  display: none;
  &.upload {
    display: block
  }
`

const ImgInput = styled.input`
  display: none;
`