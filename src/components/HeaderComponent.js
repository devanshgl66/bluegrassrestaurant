import React,{Component, Fragment, useState} from 'react'
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron, Modal, ModalBody, ModalHeader, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { LocalForm, Control, Errors} from 'react-redux-form';

const available=(x)=>(val)=>!x
const LoginForm=(props)=>{
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    return(
        <Modal isOpen={props.modal['login']} toggle={()=>props.toggleModal('login')}>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <LocalForm>
                            <FormGroup>
                                <Label htmlFor='username'>User Name:</Label>
                                <Input type='text' name='username' id='username' onChange={(e)=>setusername(e.target.value)} required/>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password'>Password:</Label>
                                <Input type='password' name='password' id='password' onChange={(e)=>setpassword(e.target.value)} required/>
                            </FormGroup>
                            {/* <FormGroup check>
                                
                                <Label check>
                                    <Input type="checkbox" name='remember'
                                    innerRef={(input)=> {this.remember=input}}/>
                                    Remember Me
                                </Label>
                                
                            </FormGroup> */}
                            <FormGroup>
                                <Button type='submit' color='primary' 
                                onClick={()=>props.handleLogin({username:username,password:password},props.login)}
                                >Submit</Button>
                            </FormGroup>
                        </LocalForm>
                    </ModalBody>
                </Modal>
    )
}
const RegisterForm=(props)=>{
    console.log(props.loginState)
    const [password, setpassword] = useState('')
    return(
        <Modal isOpen={props.modal['register']} toggle={()=>props.toggleModal('register')}>
            <ModalHeader>Register</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values)=>handleRegister({...values,password},props.register)}> 
                    <Row className='form-group'>
                        <Col md={10}>
                            <Label htmlFor='Username'>Username</Label>
                            <Control.text model='.username' id='username' name='username'
                                placeholder='Username' className='form-control'
                                validators={{available:available(props.loginState.available)}}
                                onChange={(e)=>{props.availableUName(e.target.value);console.log(e.target.value)}}
                                required
                            />
                            <Errors
                                className='text-danger'
                                model='.username'
                                show='touched'
                                messages={{
                                    available:props.loginState.loading?<i class="fa fa-spinner"/> :  'Username already taken'
                                }}/>
                        </Col>
                    </Row>
                    <Row className='form-group'>
                        <Col>
                                <Label htmlFor='firstname'>Firstname</Label>
                                <Control.text model='.firstname' id='firstname' name='firstname'
                                    placeholder='firstname' className='form-control'
                                    required/>
                                
                        </Col>
                    </Row>
                    <Row className='form-group'>
                        <Col>
                            <Label htmlFor='lastname'>LastName</Label>
                            <Control.text model='.lastname' id='lastname' name='lastname'
                                className='form-control' placeholder='Last Name'
                            />
                        </Col>
                    </Row>
                    <Row className='form-group'>
                        <Col>
                            <Label htmlFor='password'>Password</Label>
                            <Input type='password' name='password' id='password' onChange={(e)=>setpassword(e.target.value)} required/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button type="submit" color="primary">
                                Register
                            </Button>
                        </Col>
                    </Row>
                </LocalForm>
            </ModalBody>
        </Modal>
    )
}
const handleRegister=(values,register)=>{
    register(values)
}
const LoginButton=(props)=>{
    // console.log(props.logout.toString())
    
    // var cookie_login=cookie.load('login')
    if (props.login===false)
    // if(cookie_login===undefined || cookie_login==='false')
    {
        return(
            <Fragment>
                <NavItem>
                    <Button color='primary' onClick={()=>props.toggleModal('login')}>
                        <span className="fa fa-sign-in fa-lg"></span>Login
                    </Button>
                </NavItem>
                <NavItem>
                    <Button color='primary' onClick={()=>props.toggleModal('register')}>
                        <span className="fa fa-sign-up fa-lg"></span>Register
                    </Button>
                </NavItem>
            </Fragment>
        )
    }
    else{
        console.log(props.logout)
        return(
            <NavItem>
                <Button color='primary' onClick={()=>props.handleLogout(props.logout)}>
                    <span className="fa fa-sign-out fa-lg"></span>Logout
                </Button>
            </NavItem>
        )}
}

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.state = {
            modal:{
                nav: false,
                login:false,
                register:false
            }
        };
        this.toggleModal=this.toggleModal.bind(this)
        this.handleLogin=this.handleLogin.bind(this)
        this.handleLogout=this.handleLogout.bind(this)
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }
      toggleModal(val){
          var x=this.state.modal
          x[val]=!x[val]
          this.setState({
              modal:x
          })
      }
      handleLogin=(values,login)=>{
          console.log(values)
        login(values.username,values.password)
        this.toggleModal('login')
      }
      handleLogout=(logout)=>{
        console.log(logout)
        logout()
        // alert('Bye')
    }
    render() {
        // this.props.availableUName('admin')
        // alert(JSON.stringify(this.props.logout))
        // console.log(document.cookie)
        // console.log(this.props.logout)
        // console.log(this)
        return(
            <div>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/home">
                        <img src='assets/images/logo.jpeg' height="30" width="41" alt='Restaurant Blue Grass' /></NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/aboutus'><span className="fa fa-info fa-lg"></span> About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/menu'><span className="fa fa-list fa-lg"></span> Menu</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/contactus'><span className="fa fa-address-card fa-lg"></span> Contact Us</NavLink>
                            </NavItem>
                            </Nav>
                            <Nav className='ml-auto' navbar>
                                <LoginButton login={this.props.loginState.login} logout={this.props.logout} toggleModal={this.toggleModal} handleLogout={this.handleLogout}/>    
                            </Nav>
                        </Collapse>
                    </div>
                    <LoginForm modal={this.state.modal} toggleModal={this.toggleModal} login={this.props.login}  handleLogin={this.handleLogin}/>
                    <RegisterForm modal={this.state.modal} toggleModal={this.toggleModal} register={this.props.register} availableUName={this.props.availableUName} loginState={this.props.loginState} />
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Restaurant Blue Grass</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                
            </div>
        );
    }
}

export default Header;