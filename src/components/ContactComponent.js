import React, { Component } from 'react';
import {Breadcrumb,BreadcrumbItem,  Label, Col,  Button, Row} from 'reactstrap'
import {Form,Control,Errors} from 'react-redux-form'
import {Link} from 'react-router-dom'

const required = (val) => val && val.length;
const maxLength=(len)=>(val)=>(val) && (val.length<=len);
const minLength=(len)=>(val)=>(val) && (val.length>=len);
const isNumber=(val)=>/^(\d{10})$/.test(val)
const validEmail=(val)=> /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
class Contact extends Component {
    constructor(props){
        super(props)
        this.handleSubmit=this.handleSubmit.bind(this)
        console.log(props)
    }
    handleSubmit(values,postfeedback){
        console.log(JSON.stringify(values))
        // alert(JSON.stringify(values))
        // console.log(postfeedback)
        postfeedback(values)
        this.props.resetFeedbackForm()
    }

    render(){
        return(
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Contact Us</h3>
                        <hr/>
                    </div>  
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Location Information</h3>
                    </div>
                    <div className="col-6 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            old jhajjar road,charkhi dadri
                            <br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:bluegrass@food.net">bluegrass@food.net</a>
                            </address>
                    </div>
                    <div className="col-6 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                        <iframe title='address' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3503.1917987371367!2d76.27921121476535!3d28.594022382433053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1592407176803!5m2!1sen!2sin" width="600" height="450" frameBorder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" href='a' className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                       <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model='feedback' onSubmit={(values)=>this.handleSubmit(values,this.props.postfeedback)}>
                            <Row className='form-group'>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" name="firstname"
                                        placeholder="First Name" className='form-control'
                                        validators={{
                                            required,
                                            maxLength:maxLength(10),minLength:minLength(4)}}
                                        validateOn='blur'
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.firstname'
                                        show='touched'
                                        messages={{
                                            required:'Required',
                                            minLength:'First name should be 3 character long',
                                            maxLength:'First name should be upto 10 characters'
                                        }}
                                    />
                                </Col>                            
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name" className='form-control'                                        
                                    />                        
                                </Col>                        
                            </Row>
                            <Row className='form-group'>
                            <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" id="telnum" name="telnum"
                                        placeholder="Tel. number" className='form-control'
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15), isNumber
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".telnum"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            isNumber: 'Must be a valid number'
                                        }}
                                     />    
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" id="email" name="email"
                                        placeholder="Email" className='form-control'
                                        validators={{
                                            required, validEmail
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".email"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            validEmail: 'Invalid Email Address'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{size: 6, offset: 2}}>
                                    <div className='form-check'>
                                        <Label check>
                                            <Control.checkbox model=".agree"
                                                name="agree" className='form-check-input'
                                                />
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select model=".contactType" name="contactType"
                                    className='form-control'
                                    >
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".feedback" id="message" name="feedback"
                                        rows="12" className='form-control'/>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
               </div>
            </div>
        );
    }
    
}

export default Contact;