import React from "react";
import logoImg from "../../img/logoImg.png";
import profileIconImg from "../../img/profileIconImg.png";
import logout from "../Authentication/logout.js";
import useLogout from "../Authentication/logout.js";

function Header(){


    const logout = useLogout();

    return(
        <header>
            <nav className="navbar navbar-expand">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto" id="nav-list">
                        <li className="nav-item">
                            <img src={logoImg} alt="logo img" height="105.75px" width="109px"
                                 href="http://localhost:3000"/>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/appointment">Закажи полагање</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://localhost:3000/pravila">Правила за полагање</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">За нас</a>
                        </li>
                        <li className="nav-item">
                            {localStorage.getItem('token') ? <button onClick={logout}>Одјави се</button> :<div></div>}

                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <img src={profileIconImg} alt="profile img" height="45px" width="45px"/>
                            </a>
                        </li>

                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;
