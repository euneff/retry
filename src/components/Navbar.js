import React  from 'react'
import { Link, useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom' // useHistory에서 useNavigate로 바꿈.

const Navbar = () => {
  let navigate = useNavigate(); // useHistory에서 useNavigate로 바꿈.
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/login"); //navigate로 바꿈
  }

    let location = useLocation();
  return (


<nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#C7E0FA' , fontWeight: 'bold'}}> {/* 배경색 바꿈, 폰트 굵기 추가 */}
  <div className="container-fluid"> 
    <Link className="navbar-brand" to="/" style={{color:'#000000'}}>NoteZ</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"? "active" :""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"? "active" :""}`} to="/about">About</Link>
        </li>
        <li className="nav-item" style={{justifyContent:'center', alignItems:'center'}}>
          <Link className={`nav-link ${location.pathname==="/about"? "active" :""}` } to="/Food">Food</Link> {/* 한번 넣어봄 */}
        </li> 
      </ul>
      {!localStorage.getItem('token')?
      <form className="d-flex">
      <Link to="/login" className="btn btn-primary mx-1" role="button" style={{backgroundColor:'#70B6EC',color:'#000000'}}>Login</Link> {/* 배경색,글씨색 바꿈 */}
      <Link to="/signup" className="btn btn-primary mx-1" role="button" style={{backgroundColor:'#70B6EC',color:'#000000'}}>Signup</Link> {/* 배경색,글씨색 바꿈 */}
      </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>     }
    </div>
  </div>
</nav>

  )
}

export default Navbar