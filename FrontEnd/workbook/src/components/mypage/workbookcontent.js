import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateModal from "./create_modal";
import ModeModal from "./mode_modal";
import DeleteModal from "./delete_modal";
import UpdateModal from "./update_modal";
import styled, { css } from "styled-components";
import axios from "axios";
import { COLORS, API } from "../../constants/index";

export default function WorkbookContent() {
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("user");

  // 문제집 data
  const [workbook, setWorkbook] = useState([
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

  let [update, setUpdate] = useState(Array(100).fill(false));
  let [create, setCreate] = useState(false);
  let [deletemodal, setDeletemodal] = useState(false);
  let [modemodal, setModemodal] = useState(false);
  let [workbookid, setWorkbookid] = useState("");
  let [workbookUserName, setworkbookUserName] = useState("");

  // 문제집 리스트 API (Get)
  const ReadWorkbook = async () => {
    const res = await axios.get(`${API}/workbook/${username}?page=1&size=500`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setWorkbook(res.data.dtoList);
    // console.log(res.data.dtoList);
  };

  // 문제집 공유 API
  const ShareWorkbook = async (dataa) => {
    await axios.put(
      `${API}/workbook/share/${username}/${dataa}`,
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

  const workbookdataid = (id) => {
    setWorkbookid(id);
  };

  const workbookdatausername = (username) => {
    setworkbookUserName(username);
  };

  // 클릭한 문제집만 모달 보이기
  const updateboolean = (e) => {
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
  }, [workbook]);

  return (
    <>
      <Article>
        {create === true ? (
          <CreateModal create={create} setCreate={setCreate} />
        ) : null}

        <Myworkbook>
          <p>나의 문제집</p>
        </Myworkbook>

        {/* onClick ={() => { setUpdate(!update) } } */}

        <Example>
          {workbook
            .sort((a, b) => {
              if (a.regDate > b.regDate) {
                return 1;
              } else if (a.regDate < b.regDate) {
                return -1;
              } else {
                return 0;
              }
            })
            .map((workbookdata, i) => {
              return (
                <ExampleLi
                  onClick={(e) => {
                    workbookdatausername(workbookdata.username);
                    workbookdataid(workbookdata.id);
                    updateboolean(e);
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
                      data-index={i}
                      onClick={(e) => {
                        workbookdataid(workbookdata.id);
                        ShareWorkbook(workbookdata.id);
                      }}
                    />
                  ) : (
                    <BlueShare
                      data-index={i}
                      onClick={(e) => {
                        workbookdataid(workbookdata.id);
                        ShareWorkbook(workbookdata.id);
                      }}
                    />
                  )}

                  {update[i] === true ? (
                    <UpdateModal
                      imageurl={workbookdata.image}
                      workbookdata={workbookdata}
                      setDeletemodal={setDeletemodal}
                      deletemodal={deletemodal}
                      modemodal={modemodal}
                      setModemodal={setModemodal}
                    />
                  ) : null}
                </ExampleLi>
              );
            })}

          {deletemodal === true ? (
            <DeleteModal
              workbookid={workbookid}
              deletemodal={deletemodal}
              setDeletemodal={setDeletemodal}
            />
          ) : null}

          {modemodal === true ? (
            <ModeModal
              workbookid={workbookid}
              username={workbookUserName}
              modemodal={modemodal}
              setModemodal={setModemodal}
            />
          ) : null}
        </Example>

        <CreateBtn
          onClick={() => {
            setCreate((create = true));
          }}
          src="/img/plus.svg"
        ></CreateBtn>
      </Article>
    </>
  );
}

const Article = styled.article`
  position: relative;
  flex-basis: 70%;
  margin: 0 auto;
  margin-right: 4%;
  border: 3px solid ${COLORS.light_gray};
  border-radius: 15px;
`;

const Myworkbook = styled.div`
  height: 7%;
  border-bottom: 3px solid ${COLORS.light_gray};
  p {
    margin-left: 20px;
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 3rem;
  }
`;

const Example = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 25px;
  padding: 1em 3em;
  max-height: 85%;
  overflow-x: auto;
  overflow-y: scroll;
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
  margin-top: 20px;
  margin-bottom: 20px;
  height: 20rem;
  cursor: pointer;
  &:after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    background: url(/img/basic.png) no-repeat center center/cover;
    z-index: -1;
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
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: url(/img/whiteshare.svg) no-repeat center center/cover;
  cursor: pointer;
  z-index: 3;
`;

const BlueShare = styled.span`
  position: absolute;
  content: "";
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: url(/img/blueshare.svg) no-repeat center center/cover;
  cursor: pointer;
  z-index: 3;
`;

const ExampleP1 = styled.p`
  /* word-break: break-all; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  padding: 0 0.5em;
  margin-top: 25%;
  font-size: 1.6rem;
  font-weight: 550;
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

const CreateBtn = styled.img`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  /* color: #fff;
  font-size: 30px;
  border-radius: 50%;
  background-color: ${COLORS.blue}; */
  z-index: 2;
  cursor: pointer;
`;
