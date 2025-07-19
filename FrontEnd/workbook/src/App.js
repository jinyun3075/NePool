import Main from "./pages/Main";
import Login from "./pages/Login";
import Mypage from "./pages/Mypage";
import "./style/globals.css";
import { Route, Routes } from "react-router-dom";
import Join from "./pages/Join";
import Study from "./pages/Study";
import AllPost from "./pages/Allpost";
import AddPage from "./pages/Add";
import Detail from "./pages/Detail";
import Notice from "./pages/Notice";
import Share from "./pages/Share";
import Update from "./pages/Update";
import NotFound from "./pages/NotFound";
// import UpdateWork from "./pages/UpdateWork";
import Exam from "./pages/Exam";
import NoticeEditor from "./pages/NoticeEditor";
import NoticeDetail from "./pages/NoticeDetail";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/sharepage" element={<Share />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/studymode/:id" element={<Study />} />
        <Route path="/Exammode/:id" element={<Exam />} />
        <Route path="/allpost" element={<AllPost />} />
        <Route path="/add" element={<AddPage />} />
        {/* <Route path="/updatequestion" element={<UpdateWork />} /> */}
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/notice/:id" element={<NoticeDetail />} />
        <Route path="/notice/editor" element={<NoticeEditor />} />
        <Route path="/notice/editor/:id" element={<NoticeEditor />} />
        <Route path="/update" element={<Update />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
