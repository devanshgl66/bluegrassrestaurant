import React, { Component } from 'react';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import {Route,Switch,Redirect,withRouter} from 'react-router-dom'
import Home from './HomeComponent'
import Dish from './DishdetailComponent'
import About from './AboutComponent'
import { connect } from 'react-redux';
import {addComments,fetchDishes} from '../redux/ActionCreater'  //addComments is an action
import {actions} from 'react-redux-form'
const mapDispatchToProps=(dispatch)=>({
  addComments:(dishId,comments,author,rating)=>dispatch(addComments(dishId,comments,author,rating)),
  fetchDishes:()=>{dispatch(fetchDishes())},
  resetFeedbackForm:()=>{dispatch(actions.reset('feedback'))}
})
const mapStateToProps=(state)=>{
  return {
    dishes:state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
class Main extends Component {
  //will called every time after this component is re rendered
  componentDidMount(){
    this.props.fetchDishes()
  }
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }
  render() {
    console.log(this.props.dishes)
    const HomePage=()=>{
      return(
        <Home
        dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
        isLoading={this.props.dishes.isLoading}
        errMsg={this.props.dishes.errMsg}
        promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}
        leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
        />
      )
    }
    const DishWithId=({match})=>{
      // alert(this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0])
      return(
        <Dish dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
          dishLoading={this.props.dishes.isLoading}
          disherrMsg={this.props.dishes.errMsg}
          comments={this.props.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
          addComments={this.props.addComments}
        />
      )
    }
    return (
      <div>
        <Header/>
        <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId}/>
              <Route exact path='/contactus' component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
              <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders}/>}/>
              <Redirect to="/home"/>
          </Switch>
        <Footer/>
      </div>
    );
  }
}
//sends states and dispatch as props to Main and its child
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));