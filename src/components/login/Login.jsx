import {useContext, useEffect, useState} from "react";
import "./login.scss";
import axios from "axios";
import {MyContext} from "../app/App";
import {useNavigate} from "react-router-dom";
import {useOnKeyPress} from "./useOnKeyPress";


const Login = () => {
    let value = useContext(MyContext);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState("");

    const navigate = useNavigate();

    const HandleLogin = () => {

        if (phone.trim().length > 0 && password.trim().length > 0) {
            let user = {
                username:phone,
                password
            };

            axios.post(`http://46.101.190.197/auth/v1/login/`, user).then((response) => {
                setLoading("Loading...")
                localStorage.setItem("token", response.data.token);
                window.location.pathname = '/';
                localStorage.setItem("lng", "uz")
            }).catch((error) => {
                if (error.response.status === 404) alert("Bu foydalanuvchi topilmadi");
            });

        } else alert("Formani to'ldiring")

    };

    const Clear = () => {
        setPhone("");
        setPassword("");
    };

    useOnKeyPress(HandleLogin, 'Enter');
    useOnKeyPress(Clear, 'Delete');

    return <div className="login-container">
        <div className="login-card">
            <div className="title">
                Adminga kirish
            </div>
            <div className="logo">
                <img onClick={() => {
                    navigate('/')
                }} src="../images/logo2.png" alt=""/>
            </div>
            <div className="inputs">
                <input name="login" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Username" type="text"/>
                <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Parol"
                       type="password"/>
            </div>
            <div onClick={HandleLogin} onKeyUp={() => console.log("enter")} className="login-btn">
                {loading ? <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div> : "Kirish"}
            </div>
        </div>
    </div>
};

export default Login