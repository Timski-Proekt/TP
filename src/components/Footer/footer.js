import mvrVec from "../../img/mvrVec.png"
import locationVec from "../../img/locationVec.png"
import mailVec from "../../img/mailVec.png"
import phoneVec from "../../img/phoneVec.png"

function Footer(){
    return(
        <footer>
            <div  id="footerMainDiv">

                    <div>
                        <h3><span><img src={mvrVec} alt="vector"/></span>МВР</h3>
                        <p>Електронска закажување <br/> и плаќање за возачка<br/>дозвола</p>
                        <p><span>&copy;</span>MVR</p>
                    </div>
                    <div>
                        <h3>Информации за контакт</h3>
                        <ul className="contactList">
                            <li>
                                <span><img src={locationVec} alt="vector"/></span>
                                <p>Улица 1 Број 123, Скопје</p>
                            </li>
                            <li>
                                <span><img src={mailVec} alt="vector"/></span>
                                <p>mvr@gmail.com</p>
                            </li>
                            <li>
                                <span><img src={phoneVec} alt="vector"/></span>
                                <p>070 123 456</p>
                            </li>
                        </ul>

                    </div>
                    <div>
                        <ul className="otherServicesList">
                            <li><a href="#">Dr</a></li>
                            <li><a href="#">Be</a></li>
                            <li><a href="#">Ig</a></li>
                            <li><a href="#">Tw</a></li>
                        </ul>
                        <p>Искоритете ги останатите <br/> услуги на МВР</p>
                    </div>
                </div>
        </footer>
    )

}
export default Footer;