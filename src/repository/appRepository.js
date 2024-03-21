import axios from "../custom-axios/axios";

const appService ={
    fetchSchools: () =>{
        return axios.get("/drivingschools");
    }
}
export default appService;