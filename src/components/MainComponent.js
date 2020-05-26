import React, { Component } from 'react';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import {Route,Switch,Redirect} from 'react-router-dom'
import Home from './HomeComponent'
import Dish from './DishdetailComponent'
class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
    };
    console.log('MainComponent Constructor is called');
  }
  componentDidMount(){
    console.log('MainComponent componentDidMount is called')
  }
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }
  render() {
    console.log('MainComponent render is called')
    const HomePage=()=>{
      return(
        <Home
        dish={this.state.dishes.filter((dish)=>dish.featured)[0]}
        promotion={this.state.promotions.filter((promo)=>promo.featured)[0]}
        leader={this.state.leaders.filter((leader)=>leader.featured)[0]}
        />
      )
    }
    const DishWithId=({match})=>{
      return(
        <Dish dish={this.state.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]}
          comments={this.state.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
        />
      )
    }
    return (
      <div>
        <Header/>
        <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId}/>
              <Route exact path='/contactus' component={Contact}/>
              <Redirect to="/home" />
          </Switch>
        <Footer/>
      </div>
    );
  }
  componentDidUpdate(){
    console.log('MainComponent componentDidUpdate is called')
  }
}

export default Main;