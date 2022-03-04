import Main from './pages/Main';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import "./style/globals.css";
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element= {<Main />}/>
        <Route path="/mypage" element= {<Mypage />}/>
        <Route path="/login"element= {<Login />}/>
      </Routes>
    </>
    )
}

export default App;
