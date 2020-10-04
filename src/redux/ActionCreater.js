//This file contains action used in project
//action are js object which contain data that need to be changed.

//Every action must contain 'type' and 'payload' key.
import * as ActionTypes from './ActionType'
import {BaseUrl} from '../shared/baseUrl'
// import fetch from 'cross-fetch'
import cookie from 'react-cookies'
const sendError=(err)=>{
    var errmsg='';
    if((typeof(err)=='string'))
        errmsg= err
    else if(err.err!=undefined)
        errmsg= err.err
    else if(err.message!=undefined)
        errmsg= err.message
    else
        errmsg= 'Some error occured.Try Again later.'
    return errmsg;
}
const printError=(err)=>{
    var errmsg=sendError(err);
    console.error('error'+errmsg);
    alert(errmsg)
}
const handleResponse=(response)=>{
    return new Promise((resolve,reject)=>{
        if(response.ok)
            response.json()
            .then((res)=>resolve(res))
        else
            response.json()
            .then((res)=>reject(res))
    })
}
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
    .then(response=>handleResponse(response))
    .then(response=>{
        dispatch(addDishes(response))
    },error=> dispatch(dishesFailed(sendError(error))))
    .catch(error =>  {
        console.log('fetching dishes',sendError(error));
    })
}

//addComments is a action.
export const addComments=(comment)=>({
    type:ActionTypes.ADD_COMMENT,
    payload:comment
})
export const fetchComments = (dishId) => (dispatch) => { 
    // alert(dishId)   
    fetch(BaseUrl+'dishes/'+dishId+'/comments')
    .then(response=>handleResponse(response))
    .then(comments => {
        dispatch(addComment(comments))
    },err=> printError(err))
    .catch(error =>  { console.error('fetch comments'+  printError(error));printError(error)});
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
    .then(response=>handleResponse(response))
    .then(response=>{
        dispatch(refreshDish(response))
    },err=> printError(err))
    .catch(error =>  { printError(error) });
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
    })
    .then(response=>handleResponse(response))
    .then(dish => {
        dispatch(refreshDish(dish))
        alert('Comment Deleted')
    },err=> printError(err))
    .catch(error =>  { printError(error)  });
}

export const commentEdit=(commentId,dishId,comment)=>(dispatch)=>{
    fetch(BaseUrl+'dishes/'+dishId+'/comments/'+commentId,{
        method:'put',
        credentials:'include',
        body:JSON.stringify({comment:comment.comments,rating:comment.rating
        }),
        headers:{
            'content-type':'application/json',
            "authorization":`Bearer ${cookie.load('token')}`
        },
    
    })
    .then(response=>handleResponse(response))
    .then(dish => {
        alert('Comment Changed');
        dispatch(refreshDish(dish))
    },err=> printError(err))
    .catch(error =>  {(printError(error))  });
}



export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(BaseUrl + 'promotions')
    .then(response=>handleResponse(response))
    .then(promos => dispatch(addPromos(promos)),err=> console.error(sendError(err)))
    .catch(error =>  { console.log('fetch promos', sendError(error)); });
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
    .then(response=>handleResponse(response))
    .then((leader)=>{
        dispatch(addLeader(leader))
    },err=> console.log('post comments'+ sendError(err)))
    .catch(error =>  { console.log('post comments'+ sendError(error));  });
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
    .then(response=>handleResponse(response))
    .then((response)=>alert('Your feedback is recorded.'),err=> printError(err))
    .catch(error=>
        {
             console.log('post feedback'+ sendError(error)); 
             alert('Your feedback could not be posted\n '+sendError(error));
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
    .then(response=>handleResponse(response))
    .then(response=>{
        cookie.save('token',response.token,{secure:true});
        cookie.save('user',username,{secure:true});
        cookie.save('admin',response.admin,{secure:true});
        payload={
            loading:false,
            errmsg:null
        }
        alert(response.status)
        dispatch(Auth(payload));
        dispatch(fetchFavorites())
    },err=> {throw new Error(err)})
    .catch(error => {
        payload={
            loading:false,
            errmsg:sendError(error)
        }
        console.log(error)
        (printError(error))
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
        }
    })
    .then(response=>handleResponse(response))
    .then((response)=>{
        cookie.remove('token',{path:'/',secure:true})
        cookie.remove('user',{path:'/',secure:true})
        cookie.remove('admin',{path:'/',secure:true})
        alert(response.status)
        dispatch(Auth())
    },err=>{throw new Error(err)})
    .catch(error=>{console.log('Logout error', error); alert('Logout Failed\nError: '+sendError(error)); });
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
    .then(response=>handleResponse(response))
    .then(response=>{
        alert(response.status)
    },err=> printError(err))
    .catch(error =>  { console.log('Registration error');console.log(error); alert('Registration Failed\nError: '+sendError(error)); });
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
    .then(response=>handleResponse(response))
    .then((response)=>{
        return response
    },error=>{
        var errmess = new Error(error);
        throw errmess;
    })
    .catch(error =>  { console.log('Username error', error)});
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
    .then(response=>handleResponse(response))
    .then((response)=>{
        return response;
    },err=>printError(err))
    .catch(error =>console.error(error));
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
    .then(response=>handleResponse(response))
    .then(favorites => { console.log('Favorite Added', favorites); dispatch(addFavorites(favorites)); }
    ,err=>{throw new Error(err)}
    )
    .catch(error => dispatch(favoritesFailed(sendError(error))));
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
    .then(response=>handleResponse(response))
    .then(favorites => { console.log('Favorite Deleted', favorites); dispatch(addFavorites(favorites)); }
        ,err=>{throw (err)})
    .catch(error => dispatch(favoritesFailed(sendError(error))));
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + cookie.load('token');

    return fetch(BaseUrl + 'favorite', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response=>handleResponse(response))
    .then(favorites => dispatch(addFavorites(favorites)),err=>{throw err})
    .catch(error => dispatch(favoritesFailed(sendError(error))));
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
    // dish["image"]=dish.image[0]
    console.log(dish)
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
    .then(response=>handleResponse(response))
    .then(dishes => { console.log('New Dish Added', dishes.length);alert("Dish Added."); dispatch(addDishes(dishes)); })
    .catch(error => (printError(error)));
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
    .then(response=>handleResponse(response))
    .then(dishes => { console.log('Dish Deleted', dishes.length);alert("Dish Deleted."); dispatch(addDishes(dishes)); }
        ,err=>{throw err})
    .catch(error => (printError(error)));
}

export const EditDishes=(dish)=>dispatch=>{
    console.log(dish)
    let fd,header={};
    if(typeof(dish.image)!='string'){
        // dish["image"]=dish.image[0]
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
    .then(response=>handleResponse(response))
    .then(dishes => { console.log('Dish Edited', dishes.length);alert("Dish Edited."); dispatch(addDishes(dishes)); }
        ,err=>{throw err})
    .catch(error => (printError(error)));
}
