import React from "react";
import logoImg from "../../img/logoImg.png"
import profileIconImg from "../../img/profileIconImg.png"
function Header(){
    return(
        <header>

            <nav className="navbar navbar-expand">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto" id="nav-list">
                        <li className="nav-item">
                            <img src={logoImg} alt="logo img" height="105.75px" width="109px"/>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Закажи полагање</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Правила за полагање</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">За нас</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><img src={profileIconImg} alt="profile img" height="45px" width="45px" /> </a>
                        </li>
                    </ul>
                </div>
            </nav>

        </header>

    )

}
export default Header;