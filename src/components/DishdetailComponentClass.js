import React,{Component} from 'react'
import {Card,CardBody,CardTitle,CardImg,CardText} from 'reactstrap';

class Dish extends Component{
    constructor(props){
        super(props);
        this.state={
        }
        console.log('DishDetailComponent Constructor is called');
    }
    componentDidMount(){
        console.log('DishDetailComponent componentDidMount is called')
      }
    componentDidUpdate(){
        console.log('DishDetailComponent componentDidUpdate is called')
    }
    commentDish(dish){
        if(dish){
            const comments=dish.comments.map((comment)=>{
                alert(comment.rating)
                return (
                    <li key={comment.id}>
                        <p>{comment.rating}</p>
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
    render(){
        console.log('DishDetailComponent render is called')
        //dish is in props
        var dish=this.props.dish;
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
                            {this.commentDish(dish)}
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(<div></div>)
        }
    }
}
export default Dish;