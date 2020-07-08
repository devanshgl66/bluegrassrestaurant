import React, { Component, Fragment } from 'react'
import {Card,CardBody,CardTitle,CardImg,CardText,Breadcrumb,BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col, Form} from 'reactstrap';
import { useState } from 'react';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom'
import { Loading } from './Loading';
import {BaseUrl} from '../shared/baseUrl'
// import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {FadeTransform ,Fade,Stagger} from 'react-animation-components'
import {Pagination} from '@material-ui/lab'
const required=(val)=>val && val.length
// const minLength=(len)=>(val)=>val && val.length>=len
// const maxLength=(len)=>(val)=>!val || val.length<=len

const handleCmtForm=(values,postComments,dishId)=>{
    // console.log(values)
    // console.log(postComments)
    postComments(dishId,values.rating,values.author,values.comments)
}
function CommentForm({postComment,dishId}){
    var [isCmtFormOpen,updateCmtFormOpen]=useState(false)
    const toggleCmtFormOpen=()=>{updateCmtFormOpen(!isCmtFormOpen);}
    return(
        <div>
            <Button outline onClick={toggleCmtFormOpen}>
                <span className='fa fa-pencil fa-lg'></span>Add Comments
            </Button>
            <Modal isOpen={isCmtFormOpen} toggle={toggleCmtFormOpen}
            >
                <ModalHeader>Submit Comments</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>{handleCmtForm(values,postComment,dishId);toggleCmtFormOpen()}}>
                        <Row className='form-group'>
                            <Col>
                                <Label htmlFor='rating'>Rating</Label>
                                <Control.select model='.rating' id='rating' name='rating'
                                    className='form- control'
                                    validators={{
                                        required
                                    }} >                                    
                                    <option>Rating</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Errors
                                    className='text-danger'
                                    model='.author'
                                    show='touched'
                                    messages={{
                                        required:'Required'                                    
                                    }}
                                    />
                            </Col>
                        </Row>
                        {/* <Row className='form-group'>
                            <Label htmlFor="name" md={4}>Your Name:</Label>
                            <Col md={10}>
                                <Control.text model='.author' id='name' name='name'
                                    placeholder='Name'
                                    validators={{
                                        required,minLength:minLength(3),maxLength:maxLength(15)
                                    }}
                                    className='form-control'
                                />
                                <Errors
                                className='text-danger'
                                model='.author'
                                show='touched'
                                messages={{
                                    required:'Required',
                                    minLength:'Name should be 3 character long',
                                    maxLength:'Name should be upto 15 characters'
                                }}
                                />
                            </Col>
                        </Row> */}
                        <Row className='form-group'>
                            <Label htmlFor='comments' md={4}>Comments</Label>
                            <Col md={10}>
                                <Control.textarea model='.comments' rows='6' id='comments' name='comments'
                                placeholder='Comments' className='form-control' 
                                validators={{
                                    required
                                }} />
                                <Errors
                                className='text-danger'
                                model='.comments'
                                show='touched'
                                messages={{
                                    required:'Required'                                    
                                }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button type="submit" color="primary">
                                    Send Comments
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>
    )
}
function RenderComment({cmts,postComments,dishId,username,commentDelete,commentEdit}){
    const [page,setpage]=useState(1)
    if(cmts){
        const cmtPerPage=5
        const totCmts=cmts.length
        const totpage=Math.ceil(totCmts/cmtPerPage)
        // console.log(cmts)
        // console.log(page*cmtPerPage)
        var cmtNo=-1
        const comments=cmts.map((comment)=>{
            cmtNo++
            if(cmtNo<(page-1)*cmtPerPage || cmtNo>=page*cmtPerPage)
                return (<Fragment/>)
            var Rating=[]
            for (var i=0;i<comment.rating;i++)
                Rating.push(<i className="fa fa-star" style={{'color':'yellow'}}/>)
            for (i=comment.rating;i<5;i++)
                Rating.push(<i className="fa fa-star"/>)
            const CmtsOptions=()=>{
                const [editCmts,seteditCmts]=useState(false)
                if(username && username===comment.author.username)
                    return(
                        <Fragment>
                            <Button outline onClick={()=>commentDelete(comment._id,dishId)}>
                                <i className='fa fa-trash'/>
                            </Button>
                            <Button outline onClick={()=>seteditCmts(!editCmts)}>
                                <i className='fa fa-pencil'/>
                            </Button>
                            <Modal isOpen={editCmts} toggle={()=>seteditCmts(!editCmts)}>
                                <ModalHeader>Edit Comment</ModalHeader>
                                <ModalBody>
                                    <LocalForm onSubmit={(values)=>commentEdit(comment._id,dishId,values)}>
                                        <Row className='form-group'>
                                            <Label htmlFor='comments' md={4}>Comments</Label>
                                            <Col md={10}>
                                                <Control.textarea model='.comment' rows='6' id='comment' name='comment'
                                                placeholder='Comments' className='form-control' 
                                                validators={{
                                                    required
                                                }} />
                                                <Errors
                                                className='text-danger'
                                                model='.comment'
                                                show='touched'
                                                messages={{
                                                    required:'Required'                                    
                                                }}
                                                />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button type="submit" color="primary">
                                                    Send Comments
                                                </Button>
                                            </Col>
                                        </Row>
                                    </LocalForm>
                                </ModalBody>
                            </Modal>
                        </Fragment>
                    )
                else
                    return (<Fragment></Fragment>)
            }
            return (                
                <Fade in>                    
                    <Row>
                        <Col md={9}>
                            <li key={comment.id}>
                                {Rating.map(rating=>rating)}                        
                                <p>{comment.comment}</p>
                                <p>-- {comment.author.firstname} {comment.author.lastname},
                                &nbsp;
                                {new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: '2-digit'
                                    }).format(new Date(comment.date))}
                                </p>
                            </li>
                        </Col>
                        <Col>
                            <CmtsOptions/>
                        </Col>
                    </Row>
                    
                </Fade>
            )
        })
        const Paginate=()=>{
            if (totpage>1)
                return(
                    <Row>
                        <Col>
                            <Pagination 
                                color='secondary' shape='rounded' count={totpage} 
                                showFirstButton showLastButton
                                onChange={(event,page)=>setpage(page)}/>
                        </Col>
                    </Row>
                )
            else
                    return(null)
        }
        return(
            <div>
                <Card>
                    <CardBody>
                        <h4>Comments</h4>
                        <ul className='list-unstyled'>
                            <Stagger in>
                                {comments}
                            </Stagger>    
                        </ul>
                    </CardBody>
                    <CommentForm postComment={postComments} dishId={dishId}/>
                    <Paginate/>
                </Card>
                
            </div>
        )
    }
}
class Dish extends Component{
    // constructor(props){
    //     super(props);
    //     var dishId=window.location.href.split('/');
    //     dishId=dishId[dishId.length-1]
    //     // console.log(dishId)
    //     props.fetchComments(dishId);
    // }
    
    render(){
        //dish is in props
        var dish=this.props.dish;
        // console.log(window.location)
        if(this.props.dishLoading)
            return(
                <Loading/>
            )
        else if(this.props.disherrMsg)
            return(
                <h4>{this.props.disherrMsg}</h4>
                // <div>Error</div>
            )
        else if(dish){
            // console.log(this.props.comment)
            // if(!this.props.comment)
            // console.log(this.props.dish.comments)
            return(
                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className='row'>
                        <div className="col-12 col-md-5 m-1"> 
                            <FadeTransform
                                in
                                transformProps={{
                                    exitTransform: 'scale(0.5) translateY(-50%)'
                                }}
                            >
                                <Card>
                                <CardImg top src={BaseUrl + dish.image} alt={dish.name} />
                                    <CardBody>                            
                                        <CardTitle >{dish.name}</CardTitle>
                                        <CardText>{dish.description}</CardText>
                                    </CardBody>
                                </Card>
                            </FadeTransform>
                        </div>
                        <div className="col-12 col-md-5 m-1"> 
                            <RenderComment cmts={this.props.dish.comments}
                                postComments={this.props.postComment}  
                                dishId={this.props.dish.id} 
                                username={this.props.username}
                                commentDelete={this.props.commentDelete}
                                commentEdit={this.props.commentEdit}
                            />                        
                        </div>
                    </div>
                    <h1>{this.props.dishLoading}</h1>
                </div>
            )
        }
        else{
            return(<h1>Error occured</h1>)
        }
    }
}
export default Dish;