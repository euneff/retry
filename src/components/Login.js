import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    /*credential : 사용자가 입력한 아이디와 비밀번호를 저장하는 상태
     sectCredential : 함수를 사용하여 상태를 업데이트
     초기값은 폼이 비어있는 상태 */

     let navigate = useNavigate(); //navigate로 바꿈

    const handleSubmit = async (e) => { // 서버에 로그인 요청을 보내는 역할
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            navigate("/"); // navigate로 수정
            props.showAlert("Logged in successfully", "success")

        }
        else{
            props.showAlert("Invalid Credentials", "danger")

        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='mt-3'>
            <h2 style={{textAlign:'center'}}>Login  to continue to NoteZ</h2> {/* 가운데 정렬 */}
            <form  onSubmit={handleSubmit} style={{border:'1px solid #e1e3e5',borderRadius:'12px', width:'600px', backgrounColor:'#fff',padding: '20px', margin:'50px 350px' }}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                    type="email" 
                    className="form-control" 
                    value={credentials.email} 
                    onChange={onChange} 
                    id="email" 
                    name="email" 
                    aria-describedby="emailHelp"
                    placeholder="이메일 입력" /> 
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>    
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                    type="password" 
                    className="form-control" 
                    value={credentials.password} 
                    onChange={onChange} 
                    name="password" 
                    id="password"
                    placeholder="비밀번호 입력" />
                </div>

                <button type="submit" className="btn btn-primary" style={{backgroundColor:'#70B6EC',color:'#000000'}}>Submit</button>
            </form>
        </div>
    ) 
}

export default Login