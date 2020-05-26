import React from 'react'
import {Card,CardBody,CardTitle,CardImg,CardImgOverlay,CardText,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom'
function RenderMenuItem({dish,onClick}){
    return (
        <Card key={dish.id} >
            <Link to={`/menu/${dish.id}`}>
                <CardImg width='100%' src={dish.image} alt={dish.name}/>
                <CardImgOverlay>                            
                    <CardTitle >{dish.name}</CardTitle>                         
                </CardImgOverlay>
            </Link>
        </Card>
    )
}
function Menu(props){
    const dishes=props.dishes.map((dish)=>{
        return(
            //mt-5 =>top margin:5 reactstrap
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} />
            </div>
        )
    })
    return(
        <div className='container'>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link to='/home'>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Menu</BreadcrumbItem>
            </Breadcrumb>
            <div className='col-12'>
                <h3>Menu</h3>
                <hr/>
            </div>
            <div className='row'>
                {dishes}
            </div>
        </div>
    );
}
export default Menu;