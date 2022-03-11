import Main from './pages/Main';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import "./style/globals.css";
import {Route, Routes} from 'react-router-dom';
import Join from './pages/Join';
import Study from './pages/Study';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/studymode" element={<Study />} />
      </Routes>
    </>
    )
}

export default App;
