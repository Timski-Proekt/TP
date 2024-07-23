import CarImg from"../../img/homePageCar.png"
function Home(){
    return(
     <div id="homeMainDiv">
         <div>
             <img src={CarImg} alt="main home page img" width="900px"/>
         </div>
         <div>
             <h1>Како до возачка дозвола?</h1>
             <h2>Избери термин и плати електронски</h2>
             <p>Стекни се со возачка дозвола од било која категорија со закажување на термин за своето наредно
                 полагање на теоретски испит, полигон или практичен испит.</p>
             <a href={"/appointment"}>Закажи термин</a>

         </div>
     </div>
    )
}
export default Home;