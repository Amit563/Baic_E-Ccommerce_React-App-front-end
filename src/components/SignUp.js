import React, {useEffect, useState} from 'react';
import "./SignUp.css";
import { useNavigate } from 'react-router-dom';

const Signup = () =>{
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();

      useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth)
        {
          navigate('/');
        }
      },[])

      const collectdata = async()=>{
        console.warn(name,email,password);
        let result =await fetch("https://e-commerce-back-end-3ec1.onrender.com/register",{
                   method:'post',
                   body:JSON.stringify({name,email,password}),
                   headers:{
                    'Content-Type':'application/json'
                   }
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user",JSON.stringify(result));
        navigate("/");
      }

    return(
        <div className='register'>
           <h1>Register</h1>
           <input className="inputBox" type="text" placeholder="Enter Name" 
           value={name} onChange={(e)=>setName(e.target.value)} 
           />
           <input className="inputBox" type="text" placeholder="Enter Email"
           value={email} onChange={(e)=>setEmail(e.target.value)} 
           />
           <input className="inputBox" type="text" placeholder="Enter Password" 
           value={password} onChange={(e)=>setPassword(e.target.value)} 
           />
           <button onClick={collectdata} className='appButton' type="button">Sign Up</button>
        </div>
    )
} 

export default Signup;