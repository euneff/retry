import './App.css'; //CSS파일을 가져와 스타일링
import React  from 'react'; // React 라이브러리 가져옴
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar'; //네비게이션바를 가져옴
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import NoteState from './components/context/notes/NoteState'; //상태 관리를 위해 컨텍스트를 제공함
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';

//각각의 컴포넌트를 가져와 다른 경로에 맞게 렌더링 함.

//알림(alert) 기능 구현
function App() {
  const [alert, setAlert] = useState(null); 
  // alert-상태변수, setAlert-그 상태를 변경하는 변수, 초기값은 null (처음에는 알람이 없는 상태)
  const showAlert = (message, type)=>{
    setAlert({
      msg: message, //표시할 메세지
      type: type //알림의 유형(성공,경고,오류 등)
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500); //1.5초 후에 alert상태를 다시 초기화.

}
  const clickMe = () => {
    alert("지으니");
  };



  return (
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Alert alert={alert}/>
      <div className="container">
      <Switch>
          <Route exact path="/">
            <Home showAlert={showAlert}  />
          </Route>
          <Route exact path="/about">
          </Route>
          <Route exact path="/login">
          <Login showAlert={showAlert}    />
          </Route>
          <Route exact path="/signup">
          <Signup showAlert={showAlert}  />
          </Route>
          </Switch>
          <div className='bt'>
          <button onClick = {clickMe}> 내가 누구게 </button>
          </div>
          </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
