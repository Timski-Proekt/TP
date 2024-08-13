import React from "react";
import logoImg from "../../img/logoImg.png";
import profileIconImg from "../../img/profileIconImg.png";
import logoutImg from "../../img/logout.png"
import useLogout from "../Authentication/logout";

function Header(){
    const token = localStorage.getItem('token');
    const logout = useLogout();

    return(
        <header>
            <nav className="navbar navbar-expand">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto" id="nav-list">
                        <li className="nav-item">
                            <a href="http://localhost:3000/home">
                                <img src={logoImg} alt="logo img" height="105.75px" width="109px" />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/appointment">Закажи полагање</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/rules">Правила за полагање</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/profile">
                                <img src={profileIconImg}
                                     alt="profile img"
                                     height="45px"
                                     width="45px"/>
                            </a>
                            {token && (
                                <a className="nav-link logout-button" onClick={logout}>
                                    <img
                                        src={logoutImg}
                                        alt="profile logout"
                                        height="35px"
                                        width="35px"
                                        className="cursor: pointer;"
                                    />
                                </a>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
