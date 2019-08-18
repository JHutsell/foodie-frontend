import React from 'react';
import { Navbar, Nav, Button, Form, FormControl, NavDropdown } from 'react-bootstrap';

class FoodieNavbar extends React.Component {

    state={
        searchTerm:''
    }

    handleSearchInput=(e)=>{
        this.setState({
            searchTerm:e.target.value
        })
    }

    handleSearchSubmit=()=>{
        this.props.handleSearchRestaurant(this.state.searchTerm)
    }

    handleFriendlistClick=()=>{
        this.props.history.push("/friendlist")
    }
    render() {
        return(
            <div className="navbar-container">
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Foodie</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link onClick={this.handleFriendlistClick} href="#home">Friendlist</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            </Nav>
                            <Form  inline>
                            <FormControl type="text" onChange={this.handleSearchInput} value={this.state.searchTerm}  placeholder="Search" className="mr-sm-2" />
                            <Button onClick={this.handleSearchSubmit} variant="outline-success">Search</Button>
                            </Form>
                    </Navbar.Collapse>
                </Navbar>
            </div>


        )
    }
}

export default FoodieNavbar