import {Route, BrowserRouter, Routes} from "react-router-dom";
import {Component} from "react";
import Header from "../Header/header";
import DrivingSchools from "../DrivingSchools/drivingSchools";
import appService from "../../repository/appRepository";

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
                <Route path={"/drivingschools"} element={<DrivingSchools drivingSchools={this.state.drivingSchools}/>}/>
              </Routes>
          </main>
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