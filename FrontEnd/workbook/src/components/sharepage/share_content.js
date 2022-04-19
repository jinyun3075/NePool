import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShareDeleteModal from "./share_deletemodal";
import ShareModeModal from "./share_modemodal";
import ShareUpdateModal from "./share_updatemodal";
import styled, { css } from "styled-components";
import axios from "axios";
import { COLORS, API } from "../../constants/index";

export default function ShareContent(props) {
  const userid = props.userid;

  let [shareupdate, setShareupdate] = useState(Array(100).fill(false));
  let [sharedeletemodal, setSharedeletemodal] = useState(false);
  let [sharemodemodal, setSharemodemodal] = useState(false);
  let [shareworkbookid, setShareworkbookid] = useState("");
  let [shareusername, setShareusername] = useState("");

  const [sharedworkbook, setSharedworkbook] = useState([
    {
      workBook: {
        id: "",
        title: "",
        content: "",
        share: "",
        username: "",
        count: "",
        type: "",
        image: "",
        regDate: "",
        modDate: "",
      },
      user: {
        id: "",
        username: "",
        name: "",
        email: "",
        password: "",
        image: "",
      },
    },
  ]);

  const ReadShared = async () => {
    const token = sessionStorage.getItem("token");
    const res = await axios.get(`${API}/share/${userid}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setSharedworkbook(res.data.dtoList);
  };

  // 클릭한 문제집만 모달 보이기
  const shareupdateboolean = (e) => {
    if (shareupdate[e.target.value] === true) {
      const newarray = [...shareupdate];
      newarray[e.target.value] = false;
      setShareupdate(newarray);
    } else {
      const newarray = [...shareupdate];
      for (let i = 0; i < newarray.length; i++) {
        if (i === e.target.value) {
          newarray[i] = true;
        } else {
          newarray[i] = false;
        }
      }
      setShareupdate(newarray);
    }
  };

  const workbookId = (id) => {
    setShareworkbookid(id);
  };

  const username = (username) => {
    setShareusername(username);
  };

  useEffect(() => {
    ReadShared();
  }, []);

  return (
    <>
      <Article>
        <Myworkbook>
          <p>가져온 문제집</p>
        </Myworkbook>

        <Example>
          {sharedworkbook.map((workbookdata, i) => {
            return (
              <ExampleLi
                onClick={(e) => {
                  console.log(workbookdata.workBook);
                  setShareupdate(!shareupdate);
                  shareupdateboolean(e);
                  workbookId(workbookdata.workBook.id);
                  username(workbookdata.workBook.username);
                }}
                imageurl={workbookdata.workBook.image}
                value={i}
                key={workbookdata.workBook.id}
              >
                <Link
                  to={`/detail/${workbookdata.workBook.id}`}
                  state={{ username: workbookdata.workBook.username }}
                >
                  <ExampleP1>{workbookdata.workBook.title}</ExampleP1>
                  <ExampleP2>
                    마지막 수정 일시 :{" "}
                    {workbookdata.workBook.modDate.substring(0, 10)}
                  </ExampleP2>
                </Link>
                {shareupdate[i] === true ? (
                  <ShareUpdateModal
                    workbookId={workbookdata.id}
                    setSharedWorkbook={setSharedworkbook}
                    setSharedeletemodal={setSharedeletemodal}
                    sharedeletemodal={sharedeletemodal}
                    sharemodemodal={sharemodemodal}
                    setSharemodemodal={setSharemodemodal}
                  />
                ) : null}
              </ExampleLi>
            );
          })}

          {sharedeletemodal === true ? (
            <ShareDeleteModal
              workbookid={shareworkbookid}
              userid={userid}
              sharedeletemodal={sharedeletemodal}
              setSharedeletemodal={setSharedeletemodal}
            />
          ) : null}

          {sharemodemodal === true ? (
            <ShareModeModal
              shareusername={shareusername}
              shareworkbookid={shareworkbookid}
              sharemodemodal={sharemodemodal}
              setSharemodemodal={setSharemodemodal}
            />
          ) : null}
        </Example>
      </Article>
    </>
  );
}

const Article = styled.article`
  flex-basis: 70%;
  position: relative;
  margin: 0 auto;
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
    background-color: ${COLORS.light_gray};
    border-radius: 15px;
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

const ExampleP1 = styled.p`
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
  font-size: 0.3rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  z-index: 2;
`;
