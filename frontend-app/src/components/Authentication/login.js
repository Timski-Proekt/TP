import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MDBContainer, MDBInput, MDBBtn} from "mdb-react-ui-kit";
import LoginImg from "../../img/img.png"


function LoginForm({setUserEmail}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const [error, setError] = useState('');
    const history = useNavigate();

    const handleLogin = async () =>{
        try {
            if(!email || !password){
                setError('Внеси е-маил и лозинка!')
                return;
            }
            const response = await axios.post('http://localhost:8081/api/auth/login',{email,password});
            console.log('Login successful:', response.data);
            setUserEmail(email);
            history('/home')

        }catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setError('Погрешен е-маил или лозинка.')
        }
    };

    return (
        <div id="loginPage">

            <div className="container1Log">
                <div className="titleLog">
                    <h1>Форма за најава</h1>
                </div>

                <MDBContainer id="loginForm">
                    <h5>Внеси ги своите податоци за најава!</h5>
                    <div>
                        <label>Електронска пошта</label>
                        <MDBInput className="inputField" wrapperClass='mb-4' id="email" value={email} type="email"
                              onChange={(e) => setEmail((e.target.value))}/>
                    </div>
                    <div>
                        <label>Лозинка</label>
                        <MDBInput className="inputField" wrapperClass='mb-4' id="password" value={password} type="password"
                              onChange={(e) => setPassword((e.target.value))}/>
                    </div>
                    <div>
                    <p><a className="forgottenPassLink" href="#">Ја заборави лозинката?</a></p>
                    </div>
                    <button onClick={handleLogin}>Најави се</button>
                    <p>Немаш профил? <a href="/registration">Креирај тука</a></p>
                </MDBContainer>
            </div>
            <div className="container2Log">
                    <img src={LoginImg} alt="login page" width="550px"/>
            </div>
        </div>
    );


}

export default LoginForm;