import React from 'react'
import {Card,CardTitle,CardImg,CardImgOverlay,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom'
import { Loading } from './Loading';
function RenderMenuItem({dish}){
    return (
        <Card key={dish.id} >
            <Link to={`/bluegrassrestaurant/menu/${dish.id}`}>
                <CardImg width='100%' src={dish.image} alt={dish.name}/>
                <CardImgOverlay>                            
                    <CardTitle >{dish.name}</CardTitle>                         
                </CardImgOverlay>
            </Link>
        </Card>
    )
}
function Menu(props){
    const dishes=props.dishes.dishes.map((dish)=>{
        return(
            //mt-5 =>top margin:5 reactstrap
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} />
            </div>
        )
    })
    if(props.dishes.isLoading)
        return(
            <Loading/>
        // <h1>{props.isLoading}</h1>
        )
    else if(props.dishes.errMsg)
        return(
            <h4>{props.dishes.errMsg}</h4>
        )
    else
        return(
            <div className='container'>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/bluegrassrestaurant/home'>Home</Link>
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