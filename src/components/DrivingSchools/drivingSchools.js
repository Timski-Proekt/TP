import React from "react";
const DrivingSchools = (props) => {
    return (
        <table>
            <thead>
            <tr>
                <td>Name</td>
                <td>Email</td>
            </tr>
            </thead>
            <tbody>
            {props.drivingSchools.map((term)=>{
               return (
                   <tr>
                       <td>{term.name}</td>
                       <td>{term.email}</td>
                   </tr>

               );
            })}

            </tbody>
        </table>
    );
}
export default DrivingSchools;