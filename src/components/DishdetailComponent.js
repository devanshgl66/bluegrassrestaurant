import React,{Component} from 'react'
import {Card,CardBody,CardTitle,CardImg,CardText} from 'reactstrap';

function CommentDish({dish}){
    if(dish){
        const comments=dish.comments.map((comment)=>{
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })
        return(
            <div>
                <Card>
                    <CardBody>
                        <h4>Comments</h4>
                        <ul className='list-unstyled'>
                            {comments}
                        </ul>

                    </CardBody>
                </Card>
            </div>
        )
    }
}
function Dish(props){
    //dish is in props
    var dish=props.dish;
    if(dish){
        return(
            <div className='container'>
                <div className='row'>
                    <div className="col-12 col-md-5 m-1"> 
                        <Card>
                            <CardImg width='100%' src={dish.image} alt={dish.name}/>
                            <CardBody>                            
                                <CardTitle >{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1"> 
                        <CommentDish dish={dish} />
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(<div></div>)
    }
}
export default Dish;