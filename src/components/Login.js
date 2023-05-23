import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

const Login = () => {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    useEffect(()=> {
        const auth = localStorage.getItem('user');
        if(auth) {
            navigate("/")
        }
    }, [])

    const handleLogin = async() => {
        //   console.warn("email, password", email,password)
        let result = await fetch("http://localhost:5000/login",{
            method:'post',
            body: JSON.stringify({ email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.name)
        {
           localStorage.setItem("user",JSON.stringify(result));
           navigate("/")
        }else{
            alert("Please enter connect details")
        }
       
    }

    return(
        <div className='login'>
        <h1>Login</h1> 
        <input className='inputBox' type="text" placeholder='Enter Email'
        value={email} onChange={(e)=>setEmail(e.target.value)}
        />
        <input className='inputBox' type="text" placeholder='Enter Password'
        vaule={password} onChange={(e)=>setPassword(e.target.value)}
        />
        <button className='appButton' onClick={handleLogin} >Login</button>
        </div>
    )
}

export default Login