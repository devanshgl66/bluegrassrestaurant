import React,{Component} from 'react'
import {Card,CardBody,CardTitle,CardImg,CardImgOverlay,CardText} from 'reactstrap';
// import DishDetailComponent from './DishDetailComponent'
function RenderMenuItem({dish,onClick}){
    return (
        <Card key={dish.id} onClick={() => this.props.onClick(dish.id)}>
            <CardImg width='100%' src={dish.image} alt={dish.name}/>
            <CardImgOverlay>                            
                <CardTitle >{dish.name}</CardTitle>                         
            </CardImgOverlay>
        </Card>
    )
}
class Menu extends Component{
    renderDish(dish){
        if(dish){
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
    render(){
        const dishes=this.props.dishes.map((dish)=>{
            return(
                //mt-5 =>top margin:5 reactstrap
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem/>
                </div>
            )
        })
        return(
            <div className='container'>
                <div className='row'>
                    {dishes}
                </div>
            </div>
        );
    }
};
export default Menu;