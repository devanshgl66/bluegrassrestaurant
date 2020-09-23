import React, { Component, Fragment, useState } from 'react'
import {Card,CardTitle,CardImg,Button,Breadcrumb,CardBody, Modal, ModalHeader, ModalBody, BreadcrumbItem, Row,Col, Label} from 'reactstrap';
import {Link} from 'react-router-dom'
import { Loading } from './Loading';
import {BaseUrl} from '../shared/baseUrl'
import {Pagination} from '@material-ui/lab'
import { Control, LocalForm } from 'react-redux-form';
const FormElement=({type,name,label,dish})=>{
    return(
        <Row className='form-group'>
            <Col>
                <Label htmlFor={name}>{label}</Label>
                <Control.text type={type} model={`.${name}`} id={name} name={name}
                    placeholder={name} className='form-control' value={dish[name]}
                    onChange={(e)=>dish[name]=e.target.value}
                    required
                />
            </Col>
        </Row>
    )
}
class EditDish extends Component{
    // props.modal['editComment']
    // props.toggleModal('editComment')
    // props.handleDish --change inside also
    constructor(props){
        super(props);
        this.state={
            file:this.props.dish.image?(BaseUrl+this.props.dish.image):null,
            ...this.props.dish
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        if(event.target.name=='image')
            this.setState({
                'image':event.target.files[0]
            })
        else
            this.setState({
            [event.target.name]: event.target.value
            })
      }
    render(){
        // let [d,setD]=useState(this.props.dish.description)
        return(
            <Modal isOpen={this.props.modal} 
            toggle={()=>this.props.toggleModal()}
            >
                <ModalHeader>Edit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm
                    onSubmit={(values,e)=>{
                                if(!values.image && !this.state.image)
                                    alert('choose image please')
                                else{
                                    this.props.handleDish(values,this.state)
                                    this.props.toggleModal('editComment')
                                }
                                e.preventDefault();
                            }
                        }>
                        <Row className='form-group'>
                            <Col>                                
                                <Label htmlFor="image">Images:</Label>
                                <Control.file model='.image' id='image' name='image'
                                    onChange={(e)=>{this.handleChange(e);this.setState({file:URL.createObjectURL(e.target.files[0])})}} 
                                />
                                <img style={{height:"100px",width:'100px'}} src={this.state.file} alt='preview dish'/>
                            </Col>
                        </Row>
                        <FormElement name='name' label='Name:' dish={this.state}/>                            
                        <FormElement name='category' label='Category:' dish={this.state}/>                           
                        <FormElement name='price' type='number' label='Price: &#8377;' dish={this.state}/>     
                        <Row className='form-group'>
                            <Col>
                                Featured:&nbsp;
                                <Label htmlFor="featured">Yes</Label>&nbsp;
                                <Control type='radio' model='.featured' id='featured' name='featured'
                                    value={true}
                                    checked={this.state.featured==true}
                                    onChange={()=>this.setState({featured:true})}
                                />&nbsp;&nbsp;
                                <Label htmlFor="featured2">No</Label>&nbsp;
                                <Control type='radio' model='.featured' id='featured2' name='featured'
                                    value={false} 
                                    checked={this.state.featured==false}
                                    onChange={()=>this.setState({featured:false})}
                                />
                            </Col>
                        </Row>
                        <Row className='form-group'>
                            <Col>                                
                                <Label htmlFor="description">Description:</Label>
                                <Control.textarea model='.description' id='description' name='description' 
                                    required 
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    className='form-control' 
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button type="submit" color="primary">
                                    Add/Edit Comment
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        )
    }
}
function RenderMenuItem({dish,admin,deleteDish,editDish}){
    const handleEditDish=(values,dish)=>{
        let newDish={...dish,...values}
        delete newDish.file
        console.log(newDish)
        editDish(newDish)
        // alert('Dish edited')
    }
    const handleDeleteDish=(dish)=>{
        deleteDish(dish)
        // alert('Dish Delete')
    }
    const [modal,setModal]=useState(false)
    return (
        <Card key={dish.id} >
            <Link to={`/menu/${dish.id}`}>
                <CardImg style={{height:'450px',objectFit:'cover'}} width="100%" src={BaseUrl + dish.image} alt={dish.name} />
            </Link>
            <CardBody>
                <CardTitle>
                    <h2>
                        {dish.name}
                        {admin=='true'?
                            <Fragment>
                                <Button outline onClick={() => setModal(!modal)}>
                                    <i className="fa fa-pencil"/>
                                </Button>
                                <Button outline onClick={()=>handleDeleteDish(dish)}>
                                    <i className='fa fa-trash'/>
                                </Button>
                                <EditDish modal={modal} toggleModal={()=>setModal(!modal)} handleDish={handleEditDish} dish={dish}/>
                            </Fragment>
                        :
                            <Fragment/>
                        }
                        <div style={{float:"right"}}>Price: &#8377;{dish.price}</div>
                    </h2>
                </CardTitle>
            </CardBody>
            
        </Card>
    )
}

function Menu(props){
    // const dish
    const [page,setpage]=useState(1)
    // const page=1;
    const [modal,setModal]=useState(false)
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
                            onChange={(event,page)=>setpage(page)} size='large'
                            defaultPage={page}
                        />
                    </Col>
                </Row>
            )
        else
            return(null)
    }
    let dishes=[];
    dishes=props.dishes.dishes.map((dish)=>{
        dishNo++
            if(dishNo<(page-1)*dishPerPage || dishNo>=page*dishPerPage)
                return (null)
        return(
            //mt-5 =>top margin:5 reactstrap
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} admin={props.loginState.admin} deleteDish={props.deleteDish} editDish={props.editDish} />
            </div>
        )
    })
    // alert(dishes.length)
    const handleAddDish=(values,dish)=>{
        let newDish={...dish,...values}
        delete newDish.file
        console.log(newDish)
        props.addDish(newDish);
        // alert('Dish Added')
    }
    console.log(props.loginState.admin)
    if(props.dishes.isLoading)
        return(
            <Loading/>
        )
    else if(props.dishes.errMsg)
        return(
            <h4>{props.dishes.errMsg.toString()}</h4>
        )
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
                    <h3 style={{display:"inline"}}>Menu</h3> 
                    
                    {props.loginState.admin=='true'?
                        <Button style={{float:'right'}} outline onClick={()=>setModal(!modal)}>Add Dish</Button>
                    :
                        <Fragment/>
                    }
                    <hr/>
                </div>
                <div className='row'>
                    {dishes}
                </div>
                <Paginate/>
                <EditDish modal={modal} toggleModal={()=>setModal(!modal)} handleDish={handleAddDish} dish={{}}/>
            </div>
        );
}
export default Menu;