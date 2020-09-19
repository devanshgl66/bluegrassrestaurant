import React, { useState } from 'react'
import {Card,CardTitle,CardImg,CardImgOverlay,Breadcrumb,BreadcrumbItem, Row,Col} from 'reactstrap';
import {Link} from 'react-router-dom'
import { Loading } from './Loading';
import {BaseUrl} from '../shared/baseUrl'
import {Pagination} from '@material-ui/lab'
function RenderMenuItem({dish}){
    // alert(dish.image)
    return (
        <Card key={dish.id} >
            <Link to={`/menu/${dish.id}`}>
                <CardImg style={{height:'500px',objectFit:'cover'}} width="100%" src={BaseUrl + dish.image} alt={dish.name} />
                <CardImgOverlay>                            
                    <CardTitle >{dish.name}</CardTitle>                         
                </CardImgOverlay>
            </Link>
        </Card>
    )
}

function Menu(props){
    const [page,setpage]=useState(1)
    const dishPerPage=4
    const totDish=props.dishes.dishes.length
    const totpage=Math.ceil(totDish/dishPerPage)
    var dishNo=-1
    const Paginate=()=>{
        if (totpage>1)
            return(
                <Row>
                    <Col>
                        <Pagination 
                            color='secondary' shape='rounded' count={totpage} 
                            showFirstButton showLastButton
                            onChange={(event,page)=>setpage(page)} size='large'/>
                    </Col>
                </Row>
            )
        else
            return(null)
    }
    const dishes=props.dishes.dishes.map((dish)=>{
        dishNo++
            if(dishNo<(page-1)*dishPerPage || dishNo>=page*dishPerPage)
                return (null)
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
                <Paginate/>
                
            </div>
        );
}
export default Menu;