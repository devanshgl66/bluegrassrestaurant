import React,{Component} from 'react'
import {Card,CardBody,CardTitle,CardImg,CardImgOverlay,CardText} from 'reactstrap';
class Menu extends Component{

    constructor(props){
        //props are the input given to this components
        super(props);
        //saves the state for this components
        this.state={
            selectedDish:null
        };
    }
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
                    <Card onClick={()=>{this.setState({ selectedDish: dish});}}>
                        <CardImg width='100%' src={dish.image} alt={dish.name}/>
                        <CardImgOverlay>                            
                            <CardTitle >{dish.name}</CardTitle>                         
                        </CardImgOverlay>
                    </Card>
                </div>
                
            )
        })

        return(
            <div className='container'>
                <div className='row'>
                    {dishes}
                </div>
                <div className='row'>
                    {this.renderDish(this.state.selectedDish)}
                </div>
            </div>
        );
    }
};
export default Menu;