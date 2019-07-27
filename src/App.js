import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class TableEmployee extends React.PureComponent {
  render() {
    const { id, employee_name, employee_salary, employee_age, profile_image } = this.props;
    return (
      <tr>
        <td className="text-center"><Link to={"/employee/"+id} className="btn btn-primary">{id}</Link></td>
        <td className="text-center">{employee_name}</td>
        <td className="text-center">{employee_salary}</td>
        <td className="text-center">{employee_age}</td>
        <td className="text-center">{profile_image}</td>
      </tr>
    );
  }
}

function App() {
  return(
    <Router>
      <div>
        <Route exact path="/" component={EmployeeList} />
        <Route path="/employee/:id" component={EmployeePerId} />
      </div>
    </Router>
  );
}

class EmployeePerId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchEmployees: {
        id: '',
        employee_name: '',
        employee_salary: '',
        employee_age: '',
        profile_image: ''
      }
    }
  }

  fetchEmployee() {
    console.log(this.props.match.params.id);
    axios
      .get("	http://dummy.restapiexample.com/api/v1/employee/"+this.props.match.params.id)
      .then(response =>
        this.setState({
          fetchEmployees: response.data
        }) 
      )
      .catch( (error) => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.fetchEmployee();
  }

  

  render(){
    console.log(this.props);
    const { fetchEmployees } = this.state;
    console.log(fetchEmployees);
  return (
    <div className="container">
      <h1 className="text-center">Challenge List of Employees</h1>
      <br/>
      <h3 className="text-center">View Details Employees</h3>

      <div className="container text-center">
        <div className="row">
          <div className="col-12 offset-3">
            <div className="card w-50">
              <img src="http://pcm.um.edu.my/wp-content/uploads/2017/11/empty-avatar-700x480.png" className="card-img-top"/>
              <div className="card-body">
                <h5 className="card-title">{fetchEmployees.employee_name}</h5>
                <p className="card-text">id: {fetchEmployees.id}</p>
                <p className="card-text">Salary: {fetchEmployees.employee_salary}</p>
                <p className="card-text">Age: {fetchEmployees.employee_age}</p>
                <a href="/" className="btn btn-primary">Return List</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  }
}


class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchEmployees: []
    }
  }

  fetchEmployee() {
    axios
      .get("http://dummy.restapiexample.com/api/v1/employees")
      .then(response =>
        response.data.map(employee => ({
          id: `${employee.id}`,
          employee_name: `${employee.employee_name}`,
          employee_salary: `${employee.employee_salary}`,
          employee_age: `${employee.employee_age}`,
          profile_image: `${employee.profile_image}`
        }))
      )
      .then(fetchEmployees => {
        this.setState({
          fetchEmployees
        });
      })
      .catch( (error) => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.fetchEmployee();
  }

  render() {
    const { fetchEmployees } = this.state;
    return (
      <div className="container employeelist">
          <h1 className="text-center">Challenge List of Employees</h1>
          <br/>
          <h3>View List Employees</h3>

          <table className="table">
          <caption>List of Employees</caption>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">employee_name</th>
              <th className="text-center">employee_salary</th>
              <th className="text-center">employee_age</th>
              <th className="text-center">profile_image</th>
            </tr>
          </thead>
          <tbody>
            {
              fetchEmployees.map((employee) => {
                return (
                    <TableEmployee 
                      key={employee.id} 
                      id={employee.id} 
                      employee_name={employee.employee_name} 
                      employee_salary={employee.employee_salary}  
                      employee_age={employee.employee_age} 
                      profile_image={employee.profile_image} 
                    />
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
