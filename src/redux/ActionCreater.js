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

//addComments is a action.
export const addComments=(comment)=>({
    type:ActionTypes.ADD_COMMENT,
    payload:comment
})
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
    .then(response => dispatch(refreshDish(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
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
            'content-type':'application/json'
        }
    })
    .then(response=>
        {
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
        })
    .then(response => response.json())
    .then(dish => dispatch(refreshDish(dish)))
    .catch(error =>  { console.log('Delete Comment', error.message);  });
}

export const commentEdit=(commentId,dishId,comment)=>(dispatch)=>{
    fetch(BaseUrl+'dishes/'+dishId+'/comments/'+commentId,{
        method:'put',
        credentials:'include',
        body:JSON.stringify(comment),
        headers:{
            'content-type':'application/json'
        }
    })
    .then(response=>
        {
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
        })
    .then(response => response.json())
    .then(dish => {
        alert('Comment Changed');
        dispatch(refreshDish(dish))
    })
    .catch(error =>  { console.log('Edit Comment Error', error.message);  });
}



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
        console.log(response)
        if (response.ok) {
          return response;
        } else {
            if(response.status===401)
                response.statusText='Invalid username or password'
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
        // console.log(response.success)
        alert(response.status)  
        cookie.remove('login',{path:'/'})
        cookie.save('login',true,{path:'/'})
        cookie.save('user',username,{path:'/'})
        if(response.success){
            // alert('sdg')
            dispatch(loginsuccess)
        }
        else
            dispatch(loginfailed)
    })
    .catch(error =>  { console.log('Login error', error.message); alert('Login Failed\nError: '+(error.message.statusText)); });
}
export const loginsuccess={
    type:ActionTypes.LOGIN
}
export const loginfailed={
    type:ActionTypes.LOGIN
}
export const logout=()=>(dispatch)=>{
    fetch(BaseUrl+'users/logout',{
        method:'post',
        credentials:'include',
        headers:{
            'content-type':'application/json'
        }
    })
    .then((response)=>{
        if(response.ok)
            return response
        else{
            alert(JSON.stringify(response))
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.message = response;
            throw error;
        }
    })
    .then(response=>response.json())
    .then((response)=>{
        cookie.remove('login',{path:'/'})
        cookie.save('login',false,{path:'/'})
        cookie.remove('user',{path:'/'})
        alert(response.status)
        dispatch(loginfailed)
    })
    .catch(error =>  { console.log('Logout error', error.message); alert('Logout Failed\nError: '+(error.message.statusText)); });
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
    .then((response)=>{
        if(response.ok)
            return response
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.message = response;
            throw error;
        }
    })
    .then(response=>response.json())
    .then(response=>{
        alert(response.status)
    })
    .catch(error =>  { console.log('Registration error', error.message); alert('Registration Failed\nError: '+(error.message.statusText)); });
}
export const availableUName=(username)=>(dispatch)=>{
    fetch(BaseUrl+'users/availableUName',{
        method:'post',
        body:JSON.stringify({username:username}),
        headers:{
            'content-type':'application/json'
        },
        credentials:'include'
    })
    .then(response=>{
        // console.log(response)
        if(response.ok)
            return response
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.message = response;
            throw error;
        }
    })
    .then(response=>response.json())
    .then(response=>{
        console.log(response)
        dispatch(usernameAvailable(response.available))
    } )
    .catch(error =>  { console.log('Registration error', error.message); alert('Registration Failed\nError: '+(error.message.statusText)); });
}
export const usernameAvailable=(ava)=>({
    type:ActionTypes.AVAILABLEUSERNAME,
    payload:ava
})