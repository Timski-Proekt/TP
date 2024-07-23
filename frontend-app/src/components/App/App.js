import {Route, BrowserRouter, Routes} from "react-router-dom";
import {Component} from "react";
import Header from "../Header/header";
import appService from "../../repository/appRepository";
import Footer from "../Footer/footer";
import Home from "../StaticPages/home";
import Rules from "../StaticPages/rules";
import Appointment from "../Appointment/Appointment";
import Payment from "../Payment/Payment"
import Register from "../Authentication/register";
import Login from "../Authentication/login";

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
          userEmail:'',
        };
    }

    setUserEmail = (email) => {
        this.setState({userEmail: email})
    };

    render() {
        return (
            <BrowserRouter>
                <Header userEmail={this.state.userEmail}/>
                <main>
                    <Routes>
                        <Route path={"/"} element={<Login setUserEmail={this.setUserEmail}/>} />
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/home"} element={<Home/>}/>
                        <Route path={"/rules"} element={<Rules/>} />
                        <Route path={"/appointment"} element={<Appointment/>} />
                        <Route path={"/payment"} element={<Payment/>} />
                        <Route path={"/registration"} element={<Register/>}/>

                    </Routes>
                </main>
                <Footer/>
            </BrowserRouter>

        );
    }

    // onUserRegistration = ()=>
    // {
    //     appService.addUser(embg, name, lastName, email, password, birthDate, phone, drivingSchoolId )
    //         .then(() => {
    //
    //         })
    // }


    componentDidMount() {

    }
}

export default App;