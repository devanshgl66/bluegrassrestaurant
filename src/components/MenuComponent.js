import React, { useState } from 'react'
import {Card,CardTitle,CardImg,CardImgOverlay,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom'
import { Loading } from './Loading';
import {BaseUrl} from '../shared/baseUrl'
function RenderMenuItem({dish}){
    // alert(dish.image)
    return (
        <Card key={dish.id} >
            <Link to={`/menu/${dish.id}`}>
                <CardImg width="100%" src={BaseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>                            
                    <CardTitle >{dish.name}</CardTitle>                         
                </CardImgOverlay>
            </Link>
        </Card>
    )
}
function Menu(props){
    const [min,setmin]=useState(0)
    const [max,setmax]=useState(2)
    var counter=0;
    const dishes=props.dishes.dishes.map((dish)=>{
        if(counter<min && counter>max)
            return(<div></div>)
        counter++;
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
    else if(props.dishes.errMsg){
            // console.log(props.dishes.errMsg.toString())
        return(
            <h4>{props.dishes.errMsg.toString()}</h4>
            // <h4>Error</h4>
        )}
    else
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