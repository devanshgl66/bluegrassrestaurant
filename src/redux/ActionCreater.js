//This file contains action used in project
//action are js object which contain data that need to be changed.

//Every action must contain 'type' and 'payload' key.
import * as ActionTypes from './ActionType'
import {BaseUrl} from '../shared/baseUrl'
import {fetch} from 'cross-fetch'
import cookie from 'react-cookies'

export const addDishes=(dishes)=>({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
})

export const dishesLoading=()=>({
    type:ActionTypes.DISHES_LOADING
})
export const dishesFailed=(errMsg)=>({
    type:ActionTypes.DISHES_FAILED,
    payload:errMsg
})
export const refreshDish=(dish)=>({
    type:ActionTypes.REFRESH_DISH,
    payload:dish
})

//This is a redux thunk so it will return a function as action
//This action will call dish loading action and after fetching will load dishes from server
export const fetchDishes=()=>(dispatch)=>{
    dispatch(dishesLoading(true))
    // console.log('Url:'+BaseUrl)
    fetch(BaseUrl+'dishes')
    .then(response=>{
        if(response.ok)
            return response.json()
        else
            throw new Error(response)
    })
    .then((response)=>{
        dispatch(addDishes(response))
    })
    .catch(error =>  { console.log('fetching dishes', error);dispatch(dishesFailed(error));alert("Some Error occured.Please try again later") });
}

//addComments is a action.
export const addComments=(comment)=>({
    type:ActionTypes.ADD_COMMENT,
    payload:comment
})
export const fetchComments = (dishId) => (dispatch) => { 
    // alert(dishId)   
    fetch(BaseUrl+'dishes/'+dishId+'/comments')
    .then(response=>response.json())
    .then((response)=>{
        // alert(JSON.stringify(response))
        // response=response.json()
        if(response.success===false){
            var err=new Error(response.status)
            throw err
        }
        else
            return response
    },error=>{
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(comments => {
        dispatch(addComment(comments))
    })
    .catch(error =>  { console.log('fetch comments',  error);alert('Error'+error)  });
};
export const addComment = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment,
        // token:cookie.load('token')
    };
    newComment.date = new Date().toISOString();
    // alert(JSON.stringify(newComment))
    return fetch(BaseUrl + 'dishes/'+dishId+'/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          "content-type": "application/json",
          "authorization":`Bearer ${cookie.load('token')}`
        },
        credentials: "include"
    })
    .then(response=>response.json())
    .then((response)=>{
        // alert(JSON.stringify(response))
        // response=response.json()
        if(response.success===false){
            var err=new Error(response.status)
            throw err
        }
        else
            return response
    },error=>{
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => dispatch(refreshDish(response)))
    .catch(error =>  { console.log('Post comments', error); alert('Your comment could not be posted\nError: '+error); });
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});
export const commentDelete=(commentId,dishId)=>(dispatch)=>{
    fetch(BaseUrl+'dishes/'+dishId+'/comments/'+commentId,{
        method:'delete',
        credentials:'include',
        headers:{
            'content-type':'application/json',
            "authorization":`Bearer ${cookie.load('token')}`
        },
        // body:JSON.stringify({token:cookie.load('token')})
    })
    .then(response=>response.json())
    .then((response)=>{
        // response=response.json()
        // alert(JSON.stringify(response))
        // console.log(response)
        if(response.success===false){
            var err=new Error(response.status)
            throw err
        }
        else
            return response
    },error=>{
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(dish => {dispatch(refreshDish(dish));alert('Comment Deleted')})
    .catch(error =>  { console.log('Delete Comment',  error);alert(error)  });
}

export const commentEdit=(commentId,dishId,comment)=>(dispatch)=>{
    fetch(BaseUrl+'dishes/'+dishId+'/comments/'+commentId,{
        method:'put',
        credentials:'include',
        body:JSON.stringify({comment:comment.comments,rating:comment.rating
            // ,token:cookie.load('token')
        }),
        headers:{
            'content-type':'application/json',
            "authorization":`Bearer ${cookie.load('token')}`
        },
    
    })
    .then(response=>response.json())
    .then((response)=>{
        // alert(JSON.stringify(response))
        // response=response.json()
        if(response.success===false){
            var err=new Error(response.status)
            throw err
        }
        else
            return response
    },error=>{
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(dish => {
        alert('Comment Changed');
        dispatch(refreshDish(dish))
    })
    .catch(error =>  { console.log('Edit Comment Error', error);alert(error)  });
}



export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(BaseUrl + 'promotions')
    .then(response=>response.json())
    .then((response)=>{
        // alert(JSON.stringify(response))
        // response=response.json()
        if(response.success===false){
            var err=new Error(response.status)
            throw err
        }
        else
            return response
    },error=>{
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(promos => dispatch(addPromos(promos)))
    .catch(error =>  { console.log('fetch promos', error);alert(error)  });
}

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const addLeader=(leaders)=>({
    type:ActionTypes.ADD_LEADERS,
    payload:leaders
})

export const leaderLoading=()=>({
    type:ActionTypes.LEADER_LOADING
})
export const leaderFailed=(err)=>({
    type:ActionTypes.LEADER_FAILED,
    payload:err
})

export const fetchleader=()=>(dispatch)=>{
    dispatch(leaderLoading())

    fetch(BaseUrl+'leaders')
    .then(response=>response.json())
    .then((response)=>{
        // alert(JSON.stringify(response))
        // response=response.json()
        if(response.success===false){
            var err=new Error(response.status)
            throw err
        }
        else
            return response
    },error=>{
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then((leader)=>{
        dispatch(addLeader(leader))
    })
    .catch(error =>  { console.log('post comments', error);alert('Error'+error)  });
}

export const postFeedback=(values)=>(dispatch)=>{
    fetch(BaseUrl+'feedback',{
        method:'post',
        credentials:'include',
        body:JSON.stringify(values),
        headers:{
            'content-type':'application/json',
            "authorization":`Bearer ${cookie.load('token')}`
        }
    })
    .then(response=>response.json())
    .then((response)=>{
        // alert(JSON.stringify(response))
        // response=response.json()
        if(response.success===false){
            var err=new Error(response.status)
            throw err
        }
        else
            return response
    },error=>{
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then((response)=>alert('Your feedback is send.'))
    .catch(error=>
        {
             console.log('post feedback', error); 
             alert('Your feedback could not be posted\n '+error);
         })
}
export const login=(username,password)=>(dispatch)=>{
    var payload={
        loading:true
    }
    dispatch(Auth(payload));
    var values={username:username,password:password}
    fetch(BaseUrl+'users/login',{
        method:'POST',
        credentials:'include',
        body:JSON.stringify(values),
        headers:{
            'content-type':'application/json',
            "authorization":`Bearer ${cookie.load('token')}`
        }
    })
    .then(response => response.json())
    .then(response=>{
        if(response.err){
            throw new Error(response.err);
        }
        console.log(response)
        cookie.save('token',response.token,{secure:true});
        cookie.save('user',username,{secure:true});
        cookie.save('admin',response.admin,{secure:true});
        // Dispatch the success action
        // dispatch(fetchFavorites());
        payload={
            loading:false,
            errmsg:null
        }
        alert('Login Success')
        dispatch(Auth(payload));
    })
    .catch(error => {
        payload={
            loading:false,
            errmsg:error.message
        }
        console.log(error)
        alert(error.message)
        dispatch(Auth(payload))
    })
}
export const Auth=(payload)=>({
    type:ActionTypes.LOGIN,
    payload:payload
})
export const logout=()=>(dispatch)=>{
    fetch(BaseUrl+'users/logout',{
        method:'post',
        credentials:'include',
        headers:{
            'content-type':'application/json',
            "authorization":`Bearer ${cookie.load('token')}`
        },
        // body:JSON.stringify({token:cookie.load('token')})
    })
    .then(response=>response.json())
    .then((response)=>{
        if(response.err)
            throw new Error(response.err)
        cookie.remove('token',{path:'/',secure:true})
        cookie.remove('user',{path:'/',secure:true})
        cookie.remove('admin',{path:'/',secure:true})
        alert("Logout success.")
        dispatch(Auth())
    })
    .catch(error=>{console.log('Logout error', error); alert('Logout Failed\nError: '+(error)); });
}
export const register=(user)=>(dispatch)=>{
    fetch(BaseUrl+'users/signup',{
        method:'post',
        credentials:'include',
        body:JSON.stringify(user),
        headers:{
            'content-type':'application/json'
        }
    })
    .then(response=>response.json())
    .then((response)=>{
        // alert(JSON.stringify(response))
        // response=response.json()
        // console.log(response)
        if(response.success===false){
            if (response.err)
                var err=new Error(response.err.message)
            else 
                var err=new Error(response.status)
            throw err
        }
        else
            return response
    },error=>{
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response=>{
        alert(response.status)
    })
    .catch(error =>  { console.log('Registration error', error.message); alert('Registration Failed\nError: '+(error.message)); });
}
export const availableUName=(username)=>(dispatch)=>{
    // dispatch(usernameAvailable({loading:true,available:false}))
    return fetch(BaseUrl+'users/availableUName',{
        method:'post',
        body:JSON.stringify({username:username}),
        headers:{
            'content-type':'application/json'
        },
        credentials:'include'
    })
    .then(response=>response.json())
    .then((response)=>{
        // alert(JSON.stringify(response))
        // response=response.json()
        if(response.success===false){
            var err=new Error(response.status)
            throw err
        }
        else
            return response
    },error=>{
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response=>{
        // console.log(response)
        // dispatch(usernameAvailable({loading:false,available:response.available}))
        return response
    })
    .catch(error =>  { console.log('Registration error', error)});
}
export const usernameAvailable=(ava)=>({
    type:ActionTypes.AVAILABLEUSERNAME,
    payload:ava
})
export const forgetPassword=(email)=>dispatch=>{
    return userAndOTP(email,'users/forgetPassword/genOTP')
}
export const changePassword=(value)=>dispatch=>{
    return userAndOTP(value,'users/forgetPassword/changePassword')
}
export const resendOTP=(email)=>dispatch=>{
    return userAndOTP(email,'users/verify/resendOTP')
}
export const verifyUser=(value)=>dispatch=>{
    return userAndOTP(value,'users/verify/verify')
}
const userAndOTP=(value,Url)=>{
    return fetch(BaseUrl+Url,{
        method:'post',
        body:JSON.stringify(value),
        headers:{
            'content-type':'application/json'
        },
        credentials:'include'
    })
    .then(response=>response.json())
    .then((response)=>{
        return response;
    })
    
    .catch(error =>error);
}

export const postFavorite = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + cookie.load('token');

    return fetch(BaseUrl + 'favorite', {
        method: "POST",
        body: JSON.stringify({"dishId": dishId}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "include"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Added', favorites); dispatch(addFavorites(favorites)); })
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (dishId) => (dispatch) => {

    const bearer = 'Bearer ' + cookie.load('token');

    return fetch(BaseUrl + 'favorite/'+dishId, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        },
        body:JSON.stringify({dishId:dishId}),
        credentials: "include"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Deleted', favorites); dispatch(addFavorites(favorites)); })
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + cookie.load('token');

    return fetch(BaseUrl + 'favorite', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        else 
            throw new Error(response)
    })
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(error => dispatch(favoritesFailed(error)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});

export const addNewDishes=(dish)=>dispatch=>{
    dish["image"]=dish.image[0]
    let fd=new FormData();
    for(var it in dish)
        fd.append(it,dish[it])
    const bearer = 'Bearer ' + cookie.load('token');
    return fetch(BaseUrl + 'dishes', {
        method: "POST",
        body: fd,
        headers: {
          'Authorization': bearer
        },
        credentials: "include"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(dishes => { console.log('New Dish Added', dishes.length);alert("Dish Added."); dispatch(addDishes(dishes)); })
    .catch(error => alert('Some Error occured.Please try again'));
}

export const deleteNewDishes=(dish)=>dispatch=>{
    const bearer = 'Bearer ' + cookie.load('token');
    return fetch(BaseUrl + 'dishes/'+dish._id, {
        method: "DELETE",
        body: JSON.stringify(dish),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "include"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(dishes => { console.log('Dish Deleted', dishes.length);alert("Dish Deleted."); dispatch(addDishes(dishes)); })
    .catch(error => alert('Some Error occured.Please try again'));
}

export const EditDishes=(dish)=>dispatch=>{
    let fd,header={};
    if(typeof(dish.image)!='string'){
        dish["image"]=dish.image[0]
        console.log(dish.comments)
        dish.comments=JSON.stringify(dish.comments)
        fd=new FormData();
        for(var it in dish)
            fd.append(it,dish[it])
    }
    else{
        fd=JSON.stringify(dish);
        header={
            'Content-Type':"application/json"
        }
    }
    console.log(fd)
    const bearer = 'Bearer ' + cookie.load('token');
    return fetch(BaseUrl + 'dishes/'+dish._id, {
        method: "PUT",
        body: fd,
        headers: {
          'Authorization': bearer,
          ...header
        },
        credentials: "include"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(dishes => { console.log('Dish Edited', dishes.length);alert("Dish Edited."); dispatch(addDishes(dishes)); })
    .catch(error => alert('Some Error occured.Please try again'));
}
