import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { API, COLORS } from '../../constants'

export default function NoticeEditorPage() {
  const token = sessionStorage.getItem("token");
  const user = sessionStorage.getItem("user");
  
  const editorRef = useRef();

  const navigate = useNavigate();

  const location = useLocation();
  const notice = location.state.notice;

  // const [category, setCategory] = useState('category');
  // const [isCategory, setIsCategory] = useState(false);
  // const [color, setColor] = useState(`${COLORS.light_gray}`);
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState(notice !== undefined ? `${notice.title}` : "");
  const [isTitle, setIsTitle] = useState(false);
  const [htmlStr, setHtmlStr] = useState(notice !== undefined ? `${notice.contents}` : "");
  
  const [loading, setLoading] = useState(false);
  
  const getUser = async () => {
    setLoading(true);
    const res = await axios.get(`${API}/user/${user}`, {
      headers: {
        "Content-type": "application/json",
      },
    });
    setUserId(res.data.id);
  };

  // const handleSelect = (e) => {
  //   if (e.target.value !== 'category') {
  //     setColor(`${COLORS.black}`);
  //     setCategory(e.target.value);
  //     setIsCategory(true);
  //   }
  // };

  const onChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value.length > 0) {
      setIsTitle(true);
    } else {
      setIsTitle(false);
    }
  };

  const onChangeEditor = () => {
    if(editorRef.current) {
      setHtmlStr(editorRef.current.getInstance().getHTML());
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (notice !== undefined) {
      const noticeData = {
        id: notice.id,
        title: title,
        contents: htmlStr,
      };
      await axios.put(`${API}/announcement/${userId}` , noticeData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/notice');
    } else {
        const noticeData = {
          title: title,
          contents: htmlStr,
        };
        await axios.post(`${API}/announcement/${userId}`, noticeData, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(-1);
    }
  };

  useEffect(() => {
    if(!token) {
      navigate("/",  { replace: true })
    }
    getUser();
    if(editorRef.current) {
      editorRef.current.getInstance().setHTML(htmlStr);
      editorRef.current.getInstance().removeHook('addImageBlobHook');
    }
    return () => {setLoading(true)};
  }, []);

  return (
    <NoticeForm  onSubmit={onSubmit}>
      <NoticeTitle>공지사항 작성</NoticeTitle>
      <Line></Line>
      <InputBox>
        {/* <label htmlFor="category" className="arrow">
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
        </label> */}
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
        {notice !== undefined ? <Btn type="submit">수정</Btn> : <Btn type="submit" disabled={!isTitle}>등록</Btn>}
        <Link to='/notice'>
          <Btn>취소</Btn>
        </Link>
      </BtnBox>
    </NoticeForm>
  )
}

const NoticeForm = styled.form`
  margin: 50px auto;
  width: 70%;
  min-width: 350px;
  padding: 0 15px;
`;

const NoticeTitle = styled.h2`
  font-size: 24px;
`;

const Line = styled.div`
  margin: 15px 0 25px;
  border: 0.5px solid ${COLORS.white_gray};
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

// const Select = styled.select`
//   position: relative;
//   padding: 0 15px;
//   width: 100px;
//   height: 48px;
//   border: 1px solid ${COLORS.light_gray};
//   color: ${(props) => props.color};
//   font-size: 13px;
//   appearance: none;
//   -o-appearance: none;
//   -webkit-appearance: none;
//   -moz-appearance: none;
//   cursor: pointer;
//   &:focus {
//     border: 1px solid ${COLORS.blue};
//     outline: none;
//   }
//   option {
//     padding: 15px;
//     color: ${COLORS.gray};
//   }
// `;

const Input = styled.input`
  padding: 0 15px;
  margin-bottom: 22px;
  width: 100%;
  height: 48px;
  border: 1px solid ${COLORS.light_gray};
  color: ${COLORS.black};
  &::placeholder {
    color: ${COLORS.light_gray};
    font-size: 13px;
  }
  &:focus {
    border: 1px solid ${COLORS.blue};
    outline: none;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 30px;
`;

const Btn = styled.button`
  margin: 10px 0 0;
  width: 100px;
  height: 40px;  
  border: 1px solid ${COLORS.light_gray};
  color: ${COLORS.light_gray};
  font-size: 14px;
  &:hover{
    border: none;
    background: ${COLORS.blue};
    color: ${COLORS.white};
  }
  &:disabled {
    opacity: 0.5;
  }
`;
