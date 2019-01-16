import React, { Component } from 'react';
import {Button} from 'react-bootstrap'
import '../index.css';
import BootstrapTable from 'react-bootstrap-table-next';
import facade from '../facade/Facade'
import NavBar from '../NavBar'


export default class Useredit extends Component {
    constructor() {
      super();
      var labels = ["Email", "Roles"]
      this.state = { isLoading: true, labels }
    }
  
    async componentDidMount() {
      this.updateUsers();
  
    }
  
    updateUsers =  async () =>{
      const users = await facade.getUsers()
      const roles = await facade.getRoles()
      this.setState({ isLoading: false, users, roles })
    }
  
  
    adminHandle = async (obj) =>{
  
     await facade.editUser(obj.email)
  
     this.updateUsers();
    }
  
    makeAdminButton = (obj) =>{
      var isAdmin = false;
      for (let index = 0; index < obj.roles.length; index++) {
       if(obj.roles[index].roleName === "admin"){
         isAdmin = true
       }
      }
      if(!isAdmin){
      return(
        <Button bsStyle="danger" onClick={() => this.adminHandle(obj)}>Make Admin</Button>
      );
      }
      return(
      <Button bsStyle="danger" onClick={() => this.adminHandle(obj)}>Remove Admin</Button>
      );
  
    }
  
    dataConverter = (members) => {
      const users = members.map((obj) => {
        var roles = ""
        if(obj.roles.length > 1){
          for (let index = 0; index < obj.roles.length; index++) {
            if (index === obj.roles.length-1){
              roles += obj.roles[index].roleName
            }else{
            roles += obj.roles[index].roleName + ", "
          }}
        }else{
           roles = obj.roles[0].roleName
         }
        const member = {
          Email: obj.email,
          Roles: roles,
          button: this.makeAdminButton(obj)
  
        }
        return member;
      });
      return users;
    }
  
    columns = (labels) => {
      const columns = labels.map((label) => {
        const newCol = {
          dataField: label,
          text: label,
        }
        return newCol;
      });
      const newLabel = {
        dataField: "button",
        text: "button"
      }
      columns.push(newLabel)
      return columns;
    }
  
    render() {
      var roleNavBar = localStorage.getItem("role")
      
      if (this.state.isLoading) {
       
      return (
        <div>
          <NavBar role={roleNavBar} />
          <h1> we are still isLoading</h1>
          </div>
        );
      }

     
      return (
        <div>
          <h1> Users in a table </h1>
          <BootstrapTable
            striped
            hover
            bootstrap4
            keyField="Email"
            data={this.dataConverter(this.state.users)}
            columns={this.columns(this.state.labels)}
          />

    
        </div>
        );
    }
  }