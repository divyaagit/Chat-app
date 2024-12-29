import React,{useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from '../utils/APIRoutes'
import axios from "axios"
                               
const Register=()=>{
    const navigate = useNavigate();
    const [values,setValues]=useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:'' ,
    });
    //handlers 
    const toastOptions= {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    useEffect(()=>{
          if(localStorage.getItem('chat-app-user')){
            navigate('/');
          }
        },[])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
            const {password,confirmPassword,username,email}=values;
            //API call to register user here
            const {data}= await axios.post(registerRoute,{
                username,
                email,
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
        const {password,confirmPassword,username,email}=values;
        if(password!==confirmPassword){
            toast.error("Password and Confirm Password must be the same",
            toastOptions    
            );
            return false;
        } else if(username.length <3){
            toast.error("Username should be at least 3 characters long",
            toastOptions    
            );
            return false;
        } else if(password.length < 8){
            toast.error("Password should be at least 8 characters long",
            toastOptions    
            );
            return false;
        } else if(email===''){
            toast.error("Please enter a valid email",
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
            />
            <input type="email" 
            placeholder='Email' 
            name='email'
            onChange={handleChange} 
            />
            <input type="password" 
            placeholder='Password' 
            name='password'
            onChange={handleChange} 
            />
            <input 
            type="password" 
            placeholder='Confirm Password'  
            name='confirmPassword'
            onChange={handleChange} 
            />
            <button type='submit'>Create User</button>
            <span>
            Already have an account? <Link to="/login">Login</Link>    </span>       
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

export default Register