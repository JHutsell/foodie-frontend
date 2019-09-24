import React from  'react'

export default class UsersThatLikedRestaurant extends React.Component{

    render () {
        let arr
        let display
        if (this.props.usersLiked){
        arr = this.props.usersLiked.map((user)=>{
            {user.user_name.length <= 7 
            ?
            display = user.user_name
            :
            display = user.user_name.slice(0, 5) + "..."
            }
            return <span><button 
            className="restaurant-user-button"
            onClick={()=>{
            localStorage.clickedUser=user.id 
            this.props.history.push("/profile")
            }}>{display}</button></span>
        }
        )}
        return(
            <div style={{textDecoration:"underline"}}>Users who liked this restaurant:{arr}</div>
        )
    }
}
//7