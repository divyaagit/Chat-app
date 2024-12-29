import React,{useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import Loader from '../assets/loader.gif'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from '../utils/APIRoutes'
import axios from "axios"
import { Buffer } from 'buffer'

const SetAvatar = () => {
    const api= "https://api.multiavatar.com/2335236";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const toastOptions= {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }
    useEffect(() => {
        const checkUser = async () => {
          if (!localStorage.getItem('chat-app-user')) {
            navigate('/login');
          }
        };
        checkUser();
      }, [navigate]);
    const setProfilePicture = async () =>{
        if(selectedAvatar ===undefined){
            toast.error("Please select an avatar", toastOptions);
        }else{
            const user=await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data}= await axios.post(`${setAvatarRoute}/${user._id}`,{
                image: avatars[selectedAvatar],
            });
            if(data.isSet){
                user.isAvatarImageSet=true;
                user.avatarImage=data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate('/');
            }
            else{
                toast.error("Failed to set profile picture, please try again", toastOptions);
            }
        }
    };
    useEffect(() => {
        let isMounted = true; // Track component mount status
    
        const fetchAvatars = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                );
                const buffer = Buffer.from(image.data);
                data.push(buffer.toString('base64'));
            }
    
            // Set data only if the component is mounted
            if (isMounted) {
                setAvatars(data);
                setIsLoading(false);
            }
        };
    
        fetchAvatars();
    
        // Cleanup function
        return () => {
            isMounted = false; // Prevent state updates if unmounted
        };
    }, []);
    
  return (
    <>
    {
        isLoading? <Container>
            <img src={Loader} alt='Loader' className="loader" />
        </Container> :(
    <Container>
        <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
        </div>
        <div className="avatars">
            {avatars.map((avatar,index)=>{
                    return(
                        <div 
                        key={index} 
                        className={`avatar ${selectedAvatar===index? "selected":""
                        }`}
                        >
                            <img 
                            onClick={()=>setSelectedAvatar(index)} 
                            src={`data:image/svg+xml;base64,${avatar}`} 
                            alt="avatar" 
                            />
                        </div>
                    )

                })

            }
        </div>
        <button className="submit-btn" onClick={setProfilePicture}>Set as Profile Picture</button>

    </Container>
    )
}
    <ToastContainer/>
    </>
  )
}

const Container=styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color:rgb(198, 221, 207);
height: 100vh;
width: 100vw;
.loader{
 max-inline-size: 100%;
}
 .title-container{
 h1{
 color: black;
 }
 }
.avatars{
display: flex;
gap: 2rem;
.avatar{
border: 0.4rem solid transparent;
padding: 0.4rem;
border-radius: 5rem;
justify-content: center;
align-items: center;
transition: 0.5s ease-in-out;
img{
height: 6rem;
}
}
.selected{
border: 0.4rem solid rgb(10, 142, 63);
}
} 
.submit-btn{
background-color:rgb(36, 101, 26);
        color: white;
        border: none;
        font-weight: bold;
        text-transform: uppercase;
        padding: 1rem 2rem;
        border-radius: 0.4rem;
        cursor: pointer;
        transition:  0.5s ease-in-out;
        &:hover{
        background-color: rgb(43, 176, 56);
        }
}
`;

export default SetAvatar