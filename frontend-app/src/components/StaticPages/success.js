import SuccessImage from "../../img/successImg.png"

function Success(){
    return(
        <>
            <div className="success-message">
                <h1>Успешна наплата!</h1>
                <img src={SuccessImage} alt="success img"/>
                <h4>Наплатата е извршена успешно.</h4>
                <h4>Проверете ја својата е-маил адреса за потврдата од наплата.</h4>
                <a href={"/profile"}>Поглени го својот профил</a>
            </div>
        </>
    )
}

export default Success;