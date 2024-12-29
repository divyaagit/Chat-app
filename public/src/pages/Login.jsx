import React,{useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from '../utils/APIRoutes';
import axios from "axios";
                               
const Login=()=>{
    const navigate = useNavigate();
    const [values,setValues]=useState({
        username:'',
        password:'',
    });
    //handlers 
    const toastOptions= {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(()=>{
      if(localStorage.getItem('chat-app-user')){
        navigate('/');
      }
    },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
            const {password,username}=values;
            const {data}= await axios.post(loginRoute,{
                username,
                password,
            });
            if(data.status === false){
                toast.error(data.msg, toastOptions);
            }
            if(data.status === true){
                localStorage.setItem("chat-app-user",JSON.stringify(data.user));
                navigate('/');
            }
        }
    };

    const handleValidation =() =>{
        const {password,username}=values;
        if(password===""){
            toast.error("username and password must be given",
            toastOptions    
            );
            return false;
        } else if(username.length ===""){
            toast.error("username and password must be given",
            toastOptions    
            );
            return false;
        } 
        return true;
    };

    const handleChange = (event) => {
        setValues({...values,[event.target.name]:event.target.value});
    };
    


  return (
    <>
    <FormContainer>
        <form onSubmit={handleSubmit}>
            <div className='brand'>
                <img src={Logo} alt="Logo" />
                <h1>chatty</h1>
            </div>
            <input type="text" 
            placeholder='Username' 
            name='username'
            onChange={handleChange}
            min="3" 
            />
            <input type="password" 
            placeholder='Password' 
            name='password'
            onChange={handleChange} 
            />
            <button type='submit'>Login In</button>
            <span>
            Don't have an account? <Link to="/register">Register</Link>    </span>       
        </form>
    </FormContainer>
    <ToastContainer />  
    </>
  )
}

const FormContainer = styled.div`
        display: flex;
        justify-content: center;
        flex-direction: column;
        gap: 1rem;
        background-color:rgb(1, 65, 30);
        align-items: center;
        height: 100vh;
        width: 100vw;
        .brand {
        display: flex;
        align-items:center;
        gap: 1rem;
        justify-content: center;
        img{
        height: 5rem;
        }
        h1{
        color: #fff;
        text-transform: uppercase;
        }
        }
        form{
        display:flex;
        flex-direction: column;
        gap: 2rem;
        background-color:rgba(14, 11, 11, 0.46);
        padding: 3rem 5rem;
        border-radius: 2rem;
        input{
        background-color: white;
        border: 0.1rem solid rgb(29, 122, 12);
        border-radius: 0.4rem;
        color: black;
        width: 100%;
        font-size: 1.5rem;
        &:focus{
        border:
        0.2rem solid rgb(39, 193, 111);
        outline:none;

        }
        }
        button{
        background-color:rgb(2, 118, 14);
        color: white;
        border: none;
        font-weight: bold;
        text-transform: uppercase;
        padding: 1rem 2rem;
        border-radius: 0.4rem;
        cursor: pointer;
        transition:  0.5s ease-in-out;
        &:hover{
        background-color:rgb(49, 184, 25);
        }
        }
        span{
        color:white;
        text-transform: uppercase;
        a{
        color:rgb(41, 98, 229);
        text-decoration: none;
        font-weight: bold;
        }
        }

        }

        `;

export default Login