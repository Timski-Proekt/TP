import {Route, BrowserRouter, Routes} from "react-router-dom";
import {Component} from "react";
import Header from "../Header/header";
import DrivingSchools from "../DrivingSchools/drivingSchools";
import appService from "../../repository/appRepository";
import Footer from "../Footer/footer";
import Home from "../StaticPages/home";
import Rules from "../StaticPages/rules";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      drivingSchools: []
    }

  }

  render() {
    return (
        <BrowserRouter>
          <Header/>
          <main>
              <Routes>
                <Route  path={"/"} element={<Home/>} />
                <Route  path={"/pravila"} element={<Rules/>} />
                <Route path={"/drivingschools"} element={<DrivingSchools drivingSchools={this.state.drivingSchools}/>}/>
              </Routes>
          </main>
            <Footer/>
        </BrowserRouter>

    );
  }

  loadSchools = () => {
      appService.fetchSchools().then((data) =>{
          this.setState({
              drivingSchools: data.data
          })
      });
  }
  componentDidMount() {
    this.loadSchools();
  }
}

export default App;