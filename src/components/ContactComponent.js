import React, { Component } from 'react';
import {Breadcrumb,BreadcrumbItem, Form, FormGroup, Label, Col, Input, Button, FormFeedback} from 'reactstrap'
import {Link} from 'react-router-dom'
class Contact extends Component {
    constructor(props){
        super(props)
        this.state={
            firstname:'',
            lastname:'',
            email:'',
            telnum:'',
            agree:false,
            contactType: 'Tel.',
            message:'',
            touched:{
                lastname:false,
                firstname:false,
                telnum:false,
            }
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        this.handleInputChange=this.handleInputChange.bind(this)
        this.handleBlur=this.handleBlur.bind(this)
    }
    handleSubmit(event){
        console.log(JSON.stringify(this.state))
        alert(JSON.stringify(this.state))
        event.preventDefault()
    }
    handleInputChange(event){
        var target=event.target
        var value=target.type==='checkbox'?target.checked:target.value
        var name=target.name
        console.log(name,value)
        this.setState({
            [name]:value
        })
    }
    handleBlur = (field)=>(evt)=>{
        this.setState({
            //setting all touched states as same and then changing passed field to true
            touched:{
                //same as firstname:this.state.touched.firstname,others as well
                //known as property spread notation
                ...this.state.touched,  
                
                [field]:true
            }
        })
    }
    validate(firstname,lastname,telnum){
        const err={
            firstname:'',
            lastname:'',
            telnum:''
        }
        if (this.state.touched.firstname && firstname.length<3)
            err.firstname='First name should be more than 3 characters';
        else if (this.state.touched.firstname && firstname.length>10)
            err.firstname='First name should be less than 10 characters';

            if (this.state.touched.lastname && lastname.length<3)
            err.lastname='last name should be more than 3 characters';
        else if (this.state.touched.lastname && lastname.length>10)
            err.lastname='Last name should be less than 10 characters';

        const regx=/^(\d{10})$/;    // ^ starts with it     (\d{10}) checks for 10 digits    $ should end with it also
        if (this.state.touched.telnum && !regx.test(telnum))
            err.telnum='It should be a valid phone number'
        return err
    }
    render(){
        const errors=this.validate(this.state.firstname,this.state.lastname,this.state.telnum)
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
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                   <div className="col-12">
                      <h3>Send us your Feedback</h3>
                   </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        value={this.state.firstname}
                                        onChange={this.handleInputChange} 
                                        onBlur={this.handleBlur('firstname')}
                                        valid={errors.firstname==='' && this.state.touched.firstname}
                                        invalid={errors.firstname!=='' && this.state.touched.firstname}
                                        />
                                        <FormFeedback>{errors.firstname}</FormFeedback>
                                </Col>                            
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        value={this.state.lastname}
                                        onChange={this.handleInputChange}                                     
                                        onBlur={this.handleBlur('lastname')}
                                        valid={errors.lastname==='' && this.state.touched.lastname}
                                        invalid={errors.lastname!==''&& this.state.touched.lastname}
                                        />
                                        <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                            <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Input type="tel" id="telnum" name="telnum"
                                        placeholder="Tel. number"
                                        value={this.state.telnum}
                                        onChange={this.handleInputChange} 
                                        onBlur={this.handleBlur('telnum')}
                                        valid={errors.telnum==='' && this.state.touched.telnum}
                                        invalid={errors.telnum!=='' && this.state.touched.telnum}
                                        />
                                        <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={this.state.agree}
                                                onChange={this.handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Input type="select" name="contactType"
                                            value={this.state.contactType}
                                            onChange={this.handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message"
                                        rows="12"
                                        value={this.state.message}
                                        onChange={this.handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
               </div>
            </div>
        );
    }
    
}

export default Contact;