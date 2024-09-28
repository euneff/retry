import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom' // useHistory에서 useNavigate로 바꿈.


const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:"", email: "", password: ""}) 
  let navigate = useNavigate(); // useHistory에서 useNavigate로 바꿈.

  const handleSubmit = async (e) => {
      e.preventDefault();
      const {name, email, password}=credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name, email, password})
      });
      const json = await response.json()
      console.log(json);
      if (json.success){
          // Save the auth token and redirect
          localStorage.setItem('token', json.authtoken); 
          navigate("/login"); // history.push에서 navigate로 바꿈.
          props.showAlert("Account created successfully", "success")


      }
      else{
        props.showAlert("Invalid Details", "danger")
      }
  }

  const onChange = (e)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  return (
<div className='mt-3'>
            <h2 style={{textAlign:'center'}}>Create an account to use NoteZ</h2>
          <form onSubmit={handleSubmit} style={{border:'1px solid #e1e3e5',borderRadius:'12px', width:'600px', backgroundColor:'#fff',padding: '20px', margin:'50px 350px' }}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} placeholder="이름 입력"/>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} placeholder="이메일 주소 "/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChange} placeholder="비밀번호"/>
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onChange} placeholder="비밀번호 확인"/>
      </div>
     
      <button type="submit" className="btn btn-primary" style={{backgroundColor:'#CBC9F8',color:'#000000'}}>Submit</button>
    </form>
    <div>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
    </div>
  )
}

export default Signup