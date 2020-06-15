import React from 'react'
import {Card,CardBody,CardTitle,CardImg,CardText,Breadcrumb,BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Label, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LocalForm, Control, Errors } from 'react-redux-form';

const required=(val)=>val && val.length
const minLength=(len)=>(val)=>val && val.length>=len
const maxLength=(len)=>(val)=>!val || val.length<=len

const handleCmtForm=(values)=>{
    console.log(values)
    alert(JSON.stringify(values));
}
function CommentForm(){
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
                    <LocalForm onSubmit={(values)=>handleCmtForm(values)}>
                        <Row className='form-group'>
                            <Col>
                                <Label htmlFor='rating'>Rating</Label>
                                <Control.select model='.rating' id='rating' name='rating'
                                    className='form-control'
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label htmlFor="name" md={4}>Your Name:</Label>
                            <Col md={10}>
                                <Control.text model='.name' id='name' name='name'
                                    placeholder='Name'
                                    validators={{
                                        required,minLength:minLength(3),maxLength:maxLength(15)
                                    }}
                                    className='form-control'
                                />
                                <Errors
                                className='text-danger'
                                model='.name'
                                show='touched'
                                messages={{
                                    required:'Required',
                                    minLength:'Name should be 3 character long',
                                    maxLength:'Name should be upto 15 characters'
                                }}
                                />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Label htmlFor='comments' md={4}>Comments</Label>
                            <Col md={10}>
                                <Control.textarea model='.comments' rows='6' id='comments' name='comments'
                                placeholder='Comments' className='form-control' />
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
function RenderComment({cmts}){
    if(cmts){
        const comments=cmts.map((comment)=>{
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
                    <CommentForm/>
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
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
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
                        <RenderComment cmts={props.comments} />                        
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