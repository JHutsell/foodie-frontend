import React from 'react';
import {Button} from 'react-bootstrap';

export default class Register extends React.Component{
    
    state = {
        name: '',
        user_name: '',
        password: ''
    }


    handleInputChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://flatiron-foodie.herokuapp.com/users`,{
            method:"POST",
            headers:{
                'Content-Type':"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(response => response.json())
        .then((data)=>{
            if (!data.errors){
                localStorage.setItem('token', data.token) 
                localStorage.user_id = data.user_id
                this.props.history.push('/')
            }
        })
    }

    handleLoginClick = () => {
        this.props.history.push("/")
    }

    render(){
        return(
            <div className="register-page">
                <img src={require('../image/Foodie-logo.png')} alt="logo" />
                <div className="register-page-box">
                    <h2>Create an Account</h2>
                    <form onSubmit={ this.handleSubmit }>
                    <input className="name-input" onChange={ this.handleInputChange } value={ this.state.name } type="text" placeholder="Name" name="name"/>
                    <br></br><br></br>
                    <input className="username-input" onChange={ this.handleInputChange } value={ this.state.user_name } type="text" placeholder="User Name" name="user_name"/>
                    <br></br><br></br>
                    <input className="password-input" onChange={ this.handleInputChange } value={ this.state.password }  type="password" placeholder="Password" name="password"/>
                    <br></br><br></br>
                    <Button type="submit" value="submit" variant="primary">Submit</Button>
                    </form>
                    <br></br>
                    <h3>Already Have an Account?</h3>
                    <Button variant="warning" onClick={ this.handleLoginClick }>Login</Button>
                </div>
            </div>
        )
    }
}