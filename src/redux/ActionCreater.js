//This file contains action used in project
//action are js object which contain data that need to be changed.

//Every action must contain 'type' and 'payload' key.
import * as ActionTypes from './ActionType'
import {BaseUrl} from '../shared/baseUrl'
import {fetch} from 'cross-fetch'
//addComments is a action.
export const addComments=(comment)=>({
    type:ActionTypes.ADD_COMMENT,
    payload:comment
})
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

//This is a redux thunk so it will return a function as action
//This action will call dish loading action and after 2 second will load add dishes
export const fetchDishes=()=>(dispatch)=>{
    dispatch(dishesLoading(true))
    // console.log('Url:'+BaseUrl)
    fetch(BaseUrl+'dishes')
    .then((response)=>{
        if(response.ok)
            return response
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then((response)=>{
        return response.json()
    })
    .then((response)=>{
        // alert(JSON.stringify(response))
        dispatch(addDishes(response))
    })
    .catch(error =>  { console.log('fetching dishes', error.message); });
}
export const fetchComments = (dishId) => (dispatch) => { 
    // alert(dishId)   
    fetch(BaseUrl+'dishes/'+dishId+'/comments')
    .then((response)=>{
        // alert(JSON.stringify(response))
        if(response.ok)
            return response
        else{
            var err=new Error('Error '+response.status+': '+response.statusText)
            err.response=response
            throw err
        }
    }, error=>{
        var errmess = new Error(error.message);
        throw errmess;
    }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComment(comments)))
    .catch(error =>  { console.log('fetch comments', error.message);  });
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
        comment: comment
    };
    newComment.date = new Date().toISOString();
    
    return fetch(BaseUrl + 'dishes/'+dishId+'/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          "content-type": "application/json"
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
    .then(response => dispatch(addComments(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
};
export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(BaseUrl + 'promotions')
    .then((response)=>{
        if(response.ok)
            return response
        else{
            var err=new Error('Error '+response.status+': '+response.statusText)
            err.response=response
            throw err
        }
    },
    error=>{
        var errmess = new Error(error.message);
        throw errmess;
    }
    )
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error =>  { console.log('fetch promos', error.message);  });
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
    .then((response)=>{
        if (response.ok)
            return response
        else{
            var err=new Error('Error '+response.status+':'+response.statusText)
            err.response=response.statusText
            throw err
        }
    },
    err=>{
        throw err
    })
    .then((response)=>response.json())
    .then((leader)=>{
        dispatch(addLeader(leader))
    })
    .catch(error =>  { console.log('post comments', error.message);  });
}

export const postFeedback=(values)=>(dispatch)=>{
    fetch(BaseUrl+'feedback',{
        method:'post',
        credentials:'include',
        body:JSON.stringify(values),
        headers:{
            'content-type':'application/json'
        }
    })
    .then((response)=>{
        if (response.ok)
            return response
        else{var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
    .then((response)=>response.json())
    .then((response)=>alert('Your feedback is send.'))
    .catch(error=>
        {
             console.log('post feedback', error.message); 
             alert('Your feedback could not be posted\nError: '+error.message);
         })
}
export const login=(username,password)=>(dispatch)=>{
    var values={username:username,password:password}
    fetch(BaseUrl+'users/login',{
        method:'POST',
        credentials:'include',
        body:JSON.stringify(values),
        headers:{
            'content-type':'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.message = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response =>  {
        if(response.sucess)
            dispatch(loginsuccess)
        else
            dispatch(loginfailed)
        alert(response.status)
    })
    .catch(error =>  { console.log('Login error', error.message); alert('Login Failed\nError: '+(error.message.statusText)); });
}
export const loginsuccess={
    type:ActionTypes.LOGIN,
    payload:{login:true}
}
export const loginfailed={
    type:ActionTypes.LOGIN,
    payload:{login:false}
}