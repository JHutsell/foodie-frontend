import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

class FoodieNavbar extends React.Component {

    state={
        searchTerm: ''
    }

    handleSearchInput = (e) => {
        this.setState({
            searchTerm:e.target.value
        })
    }

    handleSearchSubmit = (e) => {
        e.preventDefault()
        this.props.history.push("/home")
        if (this.state.searchTerm !== "") this.props.handleSearchRestaurant(this.state.searchTerm)
    }

    handleLogout = () => {
        localStorage.clear()
        this.props.history.push("/")
    }

    handleProfileClick = () => {
        localStorage.clickedUser = localStorage.user_id
        this.props.history.push("/profile")
    }

    handleHomeClick = () => {
        this.props.handleSearchRestaurant()
        this.props.history.push("/home")
    }
    
    render() {
        return(
            <div className="navbar-container">
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Nav.Link onClick={ this.handleHomeClick} >Foodie</Nav.Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link  onClick={ this.handleProfileClick}>My Profile</Nav.Link>
                            <Nav.Link  href="#friendlist">Followed Users</Nav.Link>
                            <Button variant="danger" onClick={ this.handleLogout }>Logout</Button>
                            </Nav>
                            <Form onSubmit={this.handleSearchSubmit}  inline>
                            <FormControl type="text" onChange={this.handleSearchInput} value={this.state.searchTerm}  placeholder="Search" className="mr-sm-2" />
                            <Button type="submit" value="submit" variant="secondary">Search</Button>
                            </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default FoodieNavbar