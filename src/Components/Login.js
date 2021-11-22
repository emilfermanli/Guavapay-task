import React from 'react'
import {ReactComponent as User} from "../assets/images/user.svg"
import { useNavigate } from "react-router-dom";

function Login() {

    let navigate = useNavigate();

    const handleSendUser = () => {
        navigate("/home/cards");
    }

    return (
        <div id="login">
           <User className="user-img" />
           <button onClick={() => handleSendUser()} className="login-btn">
               Login
            </button>
        </div>
    )
}

export default Login
