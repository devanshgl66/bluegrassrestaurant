import React, { Component } from 'react';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import Header from './HeaderComponent'
import Footer from './FooterComponent'
import {Route,Switch,Redirect,withRouter} from 'react-router-dom'
import Home from './HomeComponent'
import Dish from './DishdetailComponent'
import About from './AboutComponent'
import Favorites from './FavoriteComponent';
import { connect } from 'react-redux';
import { addComments, fetchDishes, fetchComments, fetchPromos, postComment,fetchleader, postFeedback, login, logout, register, availableUName, commentDelete, commentEdit, forgetPassword, changePassword, resendOTP, verifyUser, fetchFavorites, postFavorite, deleteFavorite, addNewDishes, deleteNewDishes, EditDishes, fetchfeedback } from '../redux/ActionCreater';//addComments is an action
import {actions} from 'react-redux-form'
import{TransitionGroup,CSSTransition} from 'react-transition-group'
import {LoadingModal} from './LoadingModal'
import BookingMainPage from './TableBooking/BookingMainPage';
const mapDispatchToProps=(dispatch)=>({
  addComment: (dishId, rating, author, comment) => dispatch(addComments(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: (dishId) => dispatch(fetchComments(dishId)),
  fetchPromos: () => dispatch(fetchPromos()),
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment,dishId)),
  fetchLeaders:()=>dispatch(fetchleader()),
  postfeedback:(values)=>dispatch(postFeedback(values)),
  fetchfeedback:()=>dispatch(fetchfeedback()),
  login:(username,password)=>dispatch(login(username,password)),
  logout:()=>dispatch(logout()),
  register:(user)=>dispatch(register(user)),
  availableUName:(username)=>dispatch(availableUName(username)),
  commentDelete:(commentId,dishId)=>dispatch(commentDelete(commentId,dishId)),
  commentEdit:(commentId,dishId,comment)=>dispatch(commentEdit(commentId,dishId,comment)),
  forgetPassword:(value)=>dispatch(forgetPassword(value)),
  changePassword:(value)=>dispatch(changePassword(value)),
  resendOTP:(value)=>dispatch(resendOTP(value)),
  verifyUser:(value)=>dispatch(verifyUser(value)),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
  addNewDish:(dish)=>dispatch(addNewDishes(dish)),
  deleteDish:(dish)=>dispatch(deleteNewDishes(dish)),
  editDish:(dish)=>dispatch(EditDishes(dish))
})
const mapStateToProps=(state)=>{
  return {
    dishes:state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    loginState:state.loginState,
    favorites:state.favorites
  }
}
class Main extends Component {
  //will called every time after this component is re rendered
  componentDidMount(){
    this.props.fetchDishes();
    // this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders()
    this.props.fetchFavorites();
  }
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }
  
  render() {
    // console.log(this.props.availableUName('admin'))
    // console.log(this.props.login)
    const HomePage=()=>{
      return(
        <Home
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
        leaderLoading={this.props.leaders.isLoading}
        leaderMsg={this.props.leaders.errMsg}
        />
      )
    }

    const DishWithId=({match})=>{
      console.log(this.props.favorites.favorites?this.props.favorites.favorites.some((dish) => dish._id === match.params.dishId):false)
      // alert(this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0])
      return(
        <Dish dish={this.props.dishes.dishes.filter((dish) => dish.id === match.params.dishId)[0]}
        dishLoading={this.props.dishes.isLoading}
        disherrMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        addComment={this.props.addComment}
        postComment={this.props.postComment}
        fetchComments={this.props.fetchComments}
        username={this.props.loginState.username}
        commentDelete={this.props.commentDelete}
        commentEdit={this.props.commentEdit}   
        postFavorite={this.props.postFavorite}   
        favorites={this.props.favorites}  
        deleteFavorite={this.props.deleteFavorite}
        />
      )
    }
    const PrivateRoute = ({ component: Component, ...rest }) => {
      // if(!this.props.loginState.login)
      //   alert('Login first')
      return(
        <Route {...rest} render={(props) => (
        this.props.loginState.login
          ? <Component {...props} />
          : <Redirect to={{
              pathname: '/home',
              state: { from: props.location }
            }} />
      )} />
      )
    }
    // console.log(this.props.logout.toString())
    // console.log(this.props.favorites)
    return (
      <div>
        <Header login={this.props.login} loginState={this.props.loginState} 
          logout={this.props.logout} register={this.props.register} 
          availableUName={this.props.availableUName}
          forgetPassword={this.props.forgetPassword}
          changePassword={this.props.changePassword}
          resendOTP={this.props.resendOTP}
          verifyUser={this.props.verifyUser}
          />
          <main>
            <TransitionGroup>
              <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
                <Switch location={this.props.location}>s
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} loginState={this.props.loginState} addDish={this.props.addNewDish} deleteDish={this.props.deleteDish} editDish={this.props.editDish}/>} />
                    <Route path='/menu/:dishId' component={DishWithId}/>
                    <Route exact path='/contactus' component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm} admin={this.props.loginState.admin} postfeedback={this.props.postfeedback} fetchfeedback={this.props.fetchfeedback}/>}/>
                    <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders}/>}/>
                    <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} />
                    {/* <Route exact path="/favorites" component={() => <Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite} />} /> */}
                    <Route exact path='/booking' component={()=><BookingMainPage/>}/>
                    <Redirect to="/home"/>
                  
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </main>
        <Footer/>
      </div>
    );
  }
}
//sends states and dispatch as props to Main and its child
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

