import Main from './pages/Main';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import "./style/globals.css";
import {Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Route path="/main">
        <Main />
      </Route>
        <Login /> 
        <Mypage />

    </>
    )
}

export default App;
