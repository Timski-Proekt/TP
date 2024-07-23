import React, {useState} from "react";
import {MDBContainer, MDBInput} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegistrationForm() {

    const [embg, setEmbg] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');
    const [drivingSchoolId, setDrivingSchoolId] = useState('');
    const [role, setRole] = useState('ROLE_USER');
    const [error, setError] = useState('');
    const history =useNavigate();


    const handleSignup = async () =>{
        try {
            if (!embg || !name || !lastName || !email || !password || !confirmPassword || !birthDate || !phone || !drivingSchoolId) {
                setError('Пополни ги сите полиња.')
                return;
            }
            if (password !== confirmPassword) {
                throw new Error("Лозинките не се исти.")
            }

            const response = await axios.post('http://localhost:8081/api/auth/register', {
                embg,
                name,
                lastName,
                email,
                password,
                birthDate,
                phone,
                drivingSchoolId,
                role
            });

            console.log(response.data);
            history('/');

        }catch (error){
            console.error('Signup failed:', error.response? error.response.data : error.message);
            setError(error.response? error.response.data : error.message);

        }

    };


    return (
        <div id="registrationPage">
            <div className="container1Reg">
                <h1>Форма за регистрирање</h1>
                <p>Добредојдовте на нашиот портал за регистрација на корисници за добивање возачка дозвола!</p>
                <p> За да започнете, креирајте сметка за корисникот со пополнување на формуларот за регистрација подолу.</p>
                <p>По регистрацијата, корисникот ќе добие пристап до персонализирани упатства за закажување на сите чекори од полагањето за возачка дозвола,
                    а овозможено ќе му биде електронско плаќање и следење на целиот процес на полагање.</p>

            </div>
            <div className="container2Reg">
                <MDBContainer id="registrationForm">
                    <h5>Внеси ги личните податоци на корисникот</h5>
                    {error && <p className="text-danger">{error}</p>}
                    <div id="fullname">
                        <div>
                            <label>Име</label>
                            <MDBInput className="inputField" wrapperClass='mb-3' id='name' name="name" value={name}
                                      type='text'
                                      onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div>
                            <label>Презиме</label>
                            <MDBInput className="inputField" wrapperClass='mb-3' id='lastName' value={lastName}
                                      type='text'
                                      onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <label>Матичен број</label>
                        <MDBInput className="inputField" wrapperClass='mb-3' id='embg' value={embg} type='text'
                                  onChange={(e) => setEmbg(e.target.value)}/>
                    </div>
                    <div>
                        <label>Електронска пошта</label>
                        <MDBInput className="inputField" wrapperClass='mb-3' id='email'
                                  value={email} type='text' onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label>Лозинка</label>
                        <MDBInput className="inputField" wrapperClass='mb-3' id='password'
                                  value={password} type='password' onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label>Потврди лозинка</label>
                        <MDBInput className="inputField" wrapperClass='mb-3' id='confirmPassword'
                                  value={confirmPassword} type='password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label>Дата на раѓање</label>
                        <MDBInput className="inputField" wrapperClass='mb-3' id='birthDate'
                                  value={birthDate} type='text' onChange={(e) => setBirthDate(e.target.value)}/>
                    </div>
                    <div>
                        <label>Телефонски број</label>
                        <MDBInput className="inputField" wrapperClass='mb-3' id='phone'
                                  value={phone} type='tel' onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div>
                        <label>Автошкола</label>
                        <MDBInput className="inputField" wrapperClass='mb-3' id='drivingSchoolId'
                                  value={drivingSchoolId} type='text' onChange={(e) => setDrivingSchoolId(e.target.value)}/>
                    </div>





                    {/*<label className="form-label mb-1">Role:</label>*/}
                    {/*<select className="inputField form-select mb-4" value={role}*/}
                    {/*        onChange={(e) => setRole(e.target.value)}>*/}
                    {/*    <option value="ROLE_USER">User</option>*/}
                    {/*    <option value="ROLE_ADMIN">Admin</option>*/}
                    {/*</select>*/}
                    <button
                            style={{height: '40px', width: '100%'}}
                            onClick={handleSignup}>Регистрирај се
                    </button>


                </MDBContainer>
            </div>
        </div>


    );
}

export default RegistrationForm;
