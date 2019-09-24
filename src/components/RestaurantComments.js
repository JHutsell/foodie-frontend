import React from 'react'
import {Button} from 'react-bootstrap';

export default class RestaurantComments extends React.Component{
    
    handleDeleteButton = (comment) => {
        this.props.handleDeleteComment(comment)
    }
    
    render(){
        let allComments
        if(this.props.comments.length > 0){
            allComments = this.props.comments.map((comment)=>{
                return <div><p> <span> {comment.user.name}: </span> {comment.context}
                
                {parseInt(comment.user.id) === parseInt(localStorage.user_id) ?
                    <Button variant="danger" style={{"margin-left":"7px"}} onClick={()=> this.handleDeleteButton(comment) }>Delete Comment</Button> :
                    null
                }
                </p>
                </div>
            })
        }
        return(
            <div className="restaurant-comments" >
                <div style={{textDecoration:"underline"}}>Comments for this Restaurant:</div>
                {allComments}
            </div>
        )
    }
}