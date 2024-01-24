import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import {useEffect} from "react";
const Login=()=>{
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate('/')
        }
    });
    const handleLogin= async()=>{
        let result=await fetch("http://localhost:5000/login",{
            method:'post',
            body: JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        
        result= await result.json();
        console.warn(result);
        if (result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/');
        }
        else{
            alert("please enter correct details");
        }
    }
    return(<div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="enter email" className="inputBox" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        <input type="password" placeholder="enter password" className="inputBox" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        <button  onClick={handleLogin} className="appbutton" type="button">Login</button>
    </div>)
}
export default Login;