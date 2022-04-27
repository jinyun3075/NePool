import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CreateModal from "./CreateModal";
import ModeModal from "./ModeModal";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import styled, { css } from "styled-components";
import axios from "axios";
import { COLORS, API } from "../../constants/index";

export default function WorkbookContent() {
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("user");

  // 문제집 data
  const [Workbook, setWorkbook] = useState([
    {
      id: "",
      title: "",
      content: "",
      share: "",
      username: "",
      image: "",
      count: "",
      type: "",
      regDate: "",
      modDate: "",
    },
  ]);

  const [update, setUpdate] = useState(Array(100).fill(false));
  const [create, setCreate] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [modeModal, setModeModal] = useState(false);
  const [workbookId, setWorkbookId] = useState("");
  const [workbookUsername, setWorkbookUsername] = useState("");

  const [loading, setLoading] = useState(false);

  // 문제집 리스트 API (Get)
  const ReadWorkbook = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/workbook/${username}?page=1&size=500`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkbook(res.data.dtoList);
    } catch(err) {

    }
    // console.log(res.data.dtoList);
  };

  // 문제집 공유 API
  const shareWorkbook = async (data) => {
    await axios.put(
      `${API}/workbook/share/${username}/${data}`,
      {},
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(res)
  };

  const workbookDataId = (id) => {
    setWorkbookId(id);
  };

  const workbookDataUsername = (username) => {
    setWorkbookUsername(username);
  };

  // 클릭한 문제집만 모달 보이기
  const updateBoolean = (e) => {
    if (update[e.target.value] === true) {
      const newarray = [...update];
      newarray[e.target.value] = false;
      setUpdate(newarray);
    } else {
      const newarray = [...update];
      for (let i = 0; i < newarray.length; i++) {
        if (i === e.target.value) {
          newarray[i] = true;
        } else {
          newarray[i] = false;
        }
      }
      setUpdate(newarray);
    }
  };

  useEffect(() => {
    ReadWorkbook();
    return () => { setLoading(false) }
  }, [Workbook]);

  return (
    <>
      <Article>
        {create === true ? (
          <CreateModal create={create} setCreate={setCreate} />
        ) : null}

        <Myworkbook>
          <p>나의 문제집</p>
        </Myworkbook>

        <Example>
          {Workbook.sort((a, b) => {
            if (a.regDate > b.regDate) {
              return 1;
            } else if (a.regDate < b.regDate) {
              return -1;
            } else {
              return 0;
            }
          }).map((workbookdata, i) => {
            return (
              <ExampleLi
                onClick={(e) => {
                  workbookDataUsername(workbookdata.username);
                  workbookDataId(workbookdata.id);
                  updateBoolean(e);
                }}
                imageurl={workbookdata.image}
                data-workbookid={workbookdata.id}
                value={i}
                key={workbookdata.id}
              >
                <Link
                  to={`/detail/${workbookdata.id}`}
                  state={{ username: workbookdata.username }}
                >
                  <ExampleP1>{workbookdata.title}</ExampleP1>
                  <ExampleP2>
                    마지막 수정 일시 : {workbookdata.modDate.substring(0, 10)}
                  </ExampleP2>
                </Link>
                {workbookdata.share === false ? (
                  <WhiteShare
                    onClick={(e) => {
                      workbookDataId(workbookdata.id);
                      shareWorkbook(workbookdata.id);
                    }}
                  />
                ) : (
                  <BlueShare
                    onClick={(e) => {
                      workbookDataId(workbookdata.id);
                      shareWorkbook(workbookdata.id);
                    }}
                  />
                )}

                {update[i] === true ? (
                  <UpdateModal
                    imageurl={workbookdata.image}
                    workbookdata={workbookdata}
                    setDeletemodal={setDeleteModal}
                    deletemodal={deleteModal}
                    modemodal={modeModal}
                    setModemodal={setModeModal}
                  />
                ) : null}
              </ExampleLi>
            );
          })}

          {deleteModal === true ? (
            <DeleteModal
              workbookid={workbookId}
              deletemodal={deleteModal}
              setDeletemodal={setDeleteModal}
            />
          ) : null}

          {modeModal === true ? (
            <ModeModal
              workbookid={workbookId}
              username={workbookUsername}
              modemodal={modeModal}
              setModemodal={setModeModal}
            />
          ) : null}
        </Example>

        <BtnBox>
          <CreateBtn
            onClick={() => {
              setCreate(true);
            }}
            src="/img/plus.svg"
          ></CreateBtn>
          {Workbook.length < 4 && <span>문제집 추가하기</span>}
        </BtnBox>
      </Article>
    </>
  );
}

const Article = styled.article`
  position: relative;
  flex-basis: 70%;
  margin: 0 auto;
  margin-right: 4%;
  min-height: 700px;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 15px;
  min-width: 450px;
  @media (max-width: 420px) { 
    border: none;
    margin: 15px auto;
    min-width: 400px;
  }
`;

const Myworkbook = styled.div`
  height: 50px;
  border-bottom: 1px solid ${COLORS.light_gray};
  p {
    margin-left: 20px;
    font-size: 15px;
    /* font-weight: 700; */
    line-height: 50px;
  }
  @media (max-width: 420px) { 
    border: none;
    p {
      display: none;
    } 
  }
`;

const Example = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, 230px);
  column-gap: 25px;
  grid-row-gap: wrap;
  padding: 1em 3em;
  max-height: 87%;
  overflow-x: auto;
  overflow-y: scroll;
  @media (max-width: 420px) { 
    max-height: 95%;
    margin: 0 0 15px;
    justify-content: center;
    transition: all 0.2s;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 15px;
    background-color: ${COLORS.light_gray};
  }
  &::-webkit-scrollbar-track {
    background-color: white;
  }
`;

const ExampleLi = styled.li`
  position: relative;
  margin: 20px 0;
  height: 20rem;
  cursor: pointer;
  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid ${COLORS.light_gray};
    border-radius: 6px;
    background: url(/img/basic.png) no-repeat center center/cover;
    z-index: -10;
    opacity: 0.6;
    ${(props) =>
      props.imageurl &&
      css`
        background: url(${(props) => props.imageurl}) no-repeat center
          center/cover;
      `}
  }
`;


const WhiteShare = styled.span`
  position: absolute;
  content: "";
  top: 15px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: url(/img/whiteshare.svg) no-repeat center center/cover;
  /* box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 4%); */
  cursor: pointer;
  z-index: 3;
`;

const BlueShare = styled.span`
  position: absolute;
  content: "";
  top: 15px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: url(/img/blueshare.svg) no-repeat center center/cover;
  /* box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset, 0 2px 3px 0 rgb(34 36 38 / 4%); */
  cursor: pointer;
  z-index: 3;
`;

const ExampleP1 = styled.p`
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  padding: 0 0.5em;
  margin-top: 60px;
  font-size: 1.6rem;
  text-align: center;
  z-index: 2;
  cursor: pointer;
`;

const ExampleP2 = styled.p`
  margin-bottom: 0;
  color: ${COLORS.gray};
  font-size: 0.5rem;
  font-weight: 500;
  text-align: center;
  z-index: 2;
  cursor: pointer;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: absolute;
  right: 30px;
  bottom: 30px;
  @media (max-width: 420px) { 
    right: 160px;
    bottom: -70px;
  }
  span {
    color: ${COLORS.light_gray};
    font-size: 13px;
    &::after {
      content: '';
      position: absolute;
      top: -18px;
      left: -5px;
      background: url('/img/showPlus.svg') no-repeat center;
      width: 40px;
      height: 40px;
    }
    @media (max-width: 420px) { 
      &::after {
        background: none;
      }
    }
  }
`

const CreateBtn = styled.img`
  width: 50px;
  height: 50px;
  /* color: #fff;
  font-size: 30px;
  border-radius: 50%;
  background-color: ${COLORS.blue}; */
  z-index: 100;
  cursor: pointer;
  @media (max-width: 420px) { 
    width: 80px;
    height: 80px;
    transition: all 0.3s;
  }
`;
