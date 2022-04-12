import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { API, COLORS } from '../../constants'
import axios from 'axios';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';


export default function NoticeEditorPage() {

  const navigate = useNavigate();

  const location = useLocation()

  const notice = location.state.notice

  const [category, setCategory] = useState('category');
  const [isCategory, setIsCategory] = useState(false);
  const [color, setColor] = useState(`${COLORS.light_gray}`);

  const editorRef = useRef();
    
  const [userId, setUserId] = useState("");

  const getUser = async () => {
    const user = sessionStorage.getItem("user");

    const res = await axios.get(`${API}/user/${user}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setUserId(res.data.id);
  };

  useEffect(() => {
    getUser()
  }, [])
  

  const handleSelect = (e) => {
    if (e.target.value !== 'category') {
      setColor(`${COLORS.black}`);
      setCategory(e.target.value);
      setIsCategory(true);
    }
  };

  const [title, setTitle] = useState(notice !== undefined ? `${notice.title}` : "");
  const [isTitle, setIsTitle] = useState(false);

  const [htmlStr, setHtmlStr] = useState(notice !== undefined ? `${notice.contents}` : "")

  const onChange = (e) => {
    setTitle(e.target.value)
    if (e.target.value.length > 0) {
      setIsTitle(true);
    } else {
      setIsTitle(false);
    }
  }

  const onChangeEditor = () => {
    if(editorRef.current) {
      setHtmlStr(editorRef.current.getInstance().getHTML())
    }
  }

  useEffect(() => {
    if(editorRef.current) {
      editorRef.current.getInstance().setHTML(htmlStr);
      editorRef.current.getInstance().removeHook('addImageBlobHook');
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem("token");
    if (notice !== undefined) {
      const noticeData = {
        id: notice.id,
        title: title,
        contents: htmlStr,
      }
      await axios.put(`${API}/announcement/${userId}` , noticeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      navigate('/notice')
    } else {
      try {
        const noticeData = {
          title: title,
          contents: htmlStr,
        }
        await axios.post(`${API}/announcement/${userId}`, noticeData, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
        navigate(-1)
      } catch(err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <NoticeForm  onSubmit={onSubmit}>
        <NoticeTitle>공지사항 작성</NoticeTitle>
        <Line></Line>
        <InputBox>
          <label htmlFor="category" className="arrow">
            <Select
                defaultValue="category"
                name="category"
                onChange={handleSelect}
                color={color}
              >
                <option value="category" disabled hidden>분류 선택</option>
                <option value="서비스">서비스</option>
                <option value="이벤트">이벤트</option>
            </Select>
          </label>
          
          <label htmlFor="title"></label>
            <Input
              id="title"
              name="title"
              placeholder="제목을 입력해 주세요."
              value={title}
              onChange={onChange} 
            />
        </InputBox>
        <Editor 
          previewStyle="vertical"
          height="500px"
          useCommandShortcut={true}
          initialEditType="wysiwyg"
          ref={editorRef}
          onChange={onChangeEditor}
        />

          <BtnBox>
            {notice !== undefined ? <Btn type="submit">수정</Btn> : <Btn type="submit">등록</Btn>}
            <Link to='/notice'>
              <Btn>취소</Btn>
            </Link>
          </BtnBox>

      </NoticeForm>
    </>
  );
}

const NoticeForm = styled.form`
  width: 70%;
  margin: 50px auto;
`;

const NoticeTitle = styled.h2`
  font-size: 24px;
`

const Line = styled.div`
  border: 0.5px solid ${COLORS.white_gray};
  margin: 15px 0 25px;
`

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
`

const Select = styled.select`
  width: 100px;
  position: relative;
  height: 48px;
  padding: 0 15px;
  border: 1px solid ${COLORS.light_gray};
  color: ${(props) => props.color};
  font-size: 13px;
  appearance: none;
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  &:focus {
    border: 1px solid ${COLORS.blue};
    outline: none;
  }
  option {
    padding: 15px;
    color: ${COLORS.gray};
  }
`;

const Input = styled.input`
  width: 100%;
  margin-left: 15px;
  padding: 0 15px;
  height: 48px;
  color: ${COLORS.black};
  margin-bottom: 22px;
  border: 1px solid ${COLORS.light_gray};
  background: none;
  &::placeholder {
    font-size: 13px;
    color: ${COLORS.light_gray};
  }
  &:focus {
    outline: none;
    border: 1px solid ${COLORS.blue};
  }
`

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  gap: 20px;
`;

const Btn = styled.button`
  font-size: 14px;
  width: 100px;
  height: 40px;  
  margin: 10px 0 0;
  /* border-radius: 4px; */
  color: ${COLORS.light_gray};
  border: 1px solid ${COLORS.light_gray};
  &:hover{
    border: none;
    color: ${COLORS.white};
    background-color: ${COLORS.blue};
  }
  &:disabled {
    opacity: 0.5;
  }
`
