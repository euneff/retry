import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    /*credential : 사용자가 입력한 아이디와 비밀번호를 저장하는 상태
     sectCredential : 함수를 사용하여 상태를 업데이트
     초기값은 폼이 비어있는 상태 */

    let history = useHistory();
    /* userHistory는 페이지 이동을 관리.
       로그인에 성공하면 history.push("/")를 사용하여 홈 페이지(/)로 리다이렉트*/

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
            history.push("/");
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
            <h2 style={{textAlign:'center'}}>Login  to continue to NoteZ</h2> 
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <div>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" /> 
                    <label for="email" className="form-text" id="email_label" aria-hidden="true">이메일 입력</label>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div> 
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary" style={{backgroundColor:'#CBC9F8',color:'#000000'}}>Submit</button>
            </form>
        </div>
    )
}

export default Login