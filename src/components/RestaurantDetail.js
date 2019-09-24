import React from 'react'
import FoodieNavbar from './FoodieNavbar'
import RestaurantComments from './RestaurantComments'
import Map from './Map'
import UsersThatLikedRestaurant from './UsersThatLikedRestaurant'

export default class RestaurantDetail extends React.Component{

    state={
        restaurant: [],
        liked: false,
        commentText: '',
        comments: [],
        usersLiked: []
    }

    handleDeleteComment = (comment) => {
        fetch(`https://flatiron-foodie.herokuapp.com/deleteComment/${comment.id}`, {
            method:"DELETE"
        })
            .then(()=>this.fetchCommentFromBackend())
    }

    componentDidMount(){
        fetch(`https://flatiron-foodie.herokuapp.com/getRestaurantDetail/${localStorage.restaurant_id}`,{
            method:"POST",
            headers:{
            "Content-Type":"application/json",
            "Accepts":"application/json",
            "Authorization":localStorage.token
            },
            body:JSON.stringify(
            {user_id:localStorage.user_id}
            )
        })
        .then(response=>response.json())
        .then((data)=> {
            this.setState({
                liked: data.liked,
                restaurant: {...data}
            })
            this.fetchCommentFromBackend()
        })  

        this.handleUsersLikeList()
    }

    fetchCommentFromBackend = () => {
        fetch("https://flatiron-foodie.herokuapp.com/getComments",{
            method:"POST",
            headers:{
            "Content-Type":"application/json",
            "Accepts":"application/json",
            "Authorization":localStorage.token
            },
            body: JSON.stringify(
            {user_id:localStorage.user_id,
            restaurant_id:localStorage.restaurant_id
            })
        }).then(resp=>resp.json())
            .then((data) => {
                if(!data.error){
            this.setState({ 
                comments:data
            })}
        })
        .catch(console.log("error"))
    }


    handleUsersLikeList = () => {

        fetch(`https://flatiron-foodie.herokuapp.com/restaurants/${localStorage.restaurant_id}/users`,{
            method:'GET',
            headers:{
                "Accepts":"Application/json",
                'Content-Type':"application/json",
                "Authorization":localStorage.token
            }
        })
        .then(resp=>resp.json())
        .then((data)=>{
            if(!data.error){
            this.setState({
                usersLiked:data
            })
            }
        })
    }

    handleLike = () => {
        
        fetch(`https://flatiron-foodie.herokuapp.com/addlike`,{
            method:"POST",
            headers:{
            "Content-Type":"application/json",
            "Accepts":"application/json",
            "Authorization":localStorage.token
            },
            body:JSON.stringify(
            {user_id:localStorage.user_id,
            restaurant_id:localStorage.restaurant_id,
            restaurant_name:this.state.restaurant.name}
            )
        }).then(() => {
            this.handleUsersLikeList()
            this.setState({
                liked: !this.state.liked
            })
        })
    }


    handleCommentSubmit = () => {
        fetch('https://flatiron-foodie.herokuapp.com/addComments',{
            method:"POST",
            headers:{
            "Content-Type":"application/json",
            "Accepts":"application/json",
            "Authorization":localStorage.token
            },
            body:JSON.stringify(
            {user_id:localStorage.user_id,
            restaurant_id:localStorage.restaurant_id,
            context:this.state.commentText,
            restaurant_name:this.state.restaurant.name}
            )
        })
            .then(resp => (resp.json()))
            .then((data) => {
                if (this.state.comments.length > 0){
                    this.setState({
                        comments:[...this.state.comments, data]
                    })
                }else{
                    this.setState({
                        comments:[data]
                    }) 
                }
            })
            this.setState({
                commentText: ''
            })
    }

    handleCommentTypeChange = (e) => {
        this.setState({
            commentText: e.target.value
        })
    }

    render(){
        const {name, categories, rating, price, location, display_phone} = this.state.restaurant

        let displayCategories;
        let displayAddress;
        if (this.state.restaurant.length !== 0){
            displayCategories = categories.map(category => <span>~{category.title}~ </span>);
            displayAddress = location.display_address.join(", ");
        }

        return(
            <React.Fragment>
                <FoodieNavbar handleSearchRestaurant={this.props.handleSearchRestaurant} history={this.props.history}/>
                <div className="restaurant-detail">
                    <img alt={ this.state.restaurant.name } className="restaurant-detail-image" src={ this.state.restaurant.image_url } />
                    <div className="map-and-content">
                        <div className="restaurant-detail-content">
                            <h4>{ name }</h4>
                            <p>Address: { displayAddress }</p>
                            <p>Phone: { display_phone } </p>
                            <p>Rating: { rating}</p>
                            <p>{ price }</p>
                            <p>Categories: { displayCategories }</p>
                        </div>
                            <div><div class="like-content">  
                                <button onClick={this.handleLike} class="btn-secondary like-review">
                                    <i class="fa fa-heart" aria-hidden="true"></i> {this.state.liked? "Unlike" : "like"}
                                </button>
                            </div></div>
                        <div className="restaurant-map">
                            <Map coordinates={this.state.restaurant.coordinates}/>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <UsersThatLikedRestaurant history={this.props.history} usersLiked={this.state.usersLiked}/>
                    <RestaurantComments handleDeleteComment={this.handleDeleteComment} comments={this.state.comments}/>
                    <label>Add a Review: </label>
                    <br></br>
                    <div><textarea value={this.state.commentText} onChange={this.handleCommentTypeChange}></textarea></div>
                    <br></br>
                    <div> <input className="comment-submit" type="submit" onClick={this.handleCommentSubmit} /></div>

                </div>
            </React.Fragment>
        )
    }
}