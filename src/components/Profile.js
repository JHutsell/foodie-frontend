import React from 'react';
import FoodieNavbar from './FoodieNavbar';
import {Button} from 'react-bootstrap';

class Profile extends React.Component {

    state = {
        user: [],
        friends: false,
        current_id: null
    }

    componentDidMount() {
        this.fetchUserFromBackend()
        this.fetchingFriendsList()
    }

    componentDidUpdate(){
        if (parseInt(this.state.current_id )!== parseInt(localStorage.clickedUser)){
            this.componentDidMount()
        }
    }

    fetchingFriendsList() {
        fetch(`https://flatiron-foodie.herokuapp.com/following/${localStorage.user_id}`,
        )
        .then(resp => resp.json())
        .then((data) => {
            if (data.length > 0){
                if(data.filter((friend) => parseInt(friend.id)===parseInt(localStorage.clickedUser)).length > 0 ){
                    this.setState({
                        friends: true
                    })
                }
            }
            else{
                this.setState({
                    friends: false
                })
            }
        })
    }

    fetchUserFromBackend = () => {
        fetch(`https://flatiron-foodie.herokuapp.com/users/${localStorage.user_id}/${localStorage.clickedUser}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': localStorage.token
                }
            }
        )
            .then(resp => resp.json())
            .then(data => {
                this.setState({   
                user: data,
                current_id: data.id
            })}
            )
    }

    handleClick = (id) => {
        localStorage.restaurant_id = id
        this.props.history.push("/show")
    }

    handleAddFriend = () => {
        this.setState({
            friends: true
        })

        fetch(`https://flatiron-foodie.herokuapp.com/users/${localStorage.user_id}/addFriend/${localStorage.clickedUser}`)
            .then(resp => resp.json)
    }

    handleDeleteFriend = () => {
        
        this.setState({
            friends: false
        })
        
        fetch(`https://flatiron-foodie.herokuapp.com/users/${localStorage.user_id}/deleteFriend/${localStorage.clickedUser}`, {
            method: "DELETE"
        })
            .then(resp => resp.json)
    }

    render() {
        console.log(this.state.user)
        let userRestaurants;
        if (this.state.user.restaurants) {
            userRestaurants = this.state.user.restaurants.map((restaurant) => <li onClick={ () => this.handleClick(restaurant.real_id) }> {restaurant.name} </li>)
        }

        let boolean = ((localStorage.clickedUser !== localStorage.user_id) && (this.state.friends===false))
        let addOrRemoveBoolean = (this.state.friends === true && (localStorage.clickedUser!==localStorage.user_id))

        return(
            <div className="profile-page">
                <FoodieNavbar handleSearchRestaurant={this.props.handleSearchRestaurant} history={this.props.history}/>
                <div className="profile-page-content">
                    <img className="profile-image" src={require('../image/foodie-profile-pic.jpg')} alt="profile-pic" />
                    <div className="profile-name">
                    <h1>{ this.state.user.user_name }</h1>
                    <h4>{ this.state.user.name }</h4>
                    </div>
                    <br></br>
                    <ul><h2 style={{color:"yellow", border:"solid white 2px", background:"red"}}>Liked Restaurants:</h2> <div className="liked-restaurants-list">{ userRestaurants }</div></ul>
                    <br></br>
                    {(boolean)?
                        <Button variant="success" onClick={this.handleAddFriend}>Follow</Button>
                        :
                        null
                    }
                    {addOrRemoveBoolean? <Button variant="danger" onClick={this.handleDeleteFriend}>Unfollow</Button>:null}
                    <br></br><br></br><br></br>
                </div>
            </div>
        )
    }
}

export default Profile