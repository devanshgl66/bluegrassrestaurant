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
    .then((response)=>{
        dispatch(addDishes(response))
    })
    .catch(error =>  { console.log('fetching dishes', error);dispatch(dishesFailed(error));alert("Error"+error) });
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
        comment: comment
    };
    newComment.date = new Date().toISOString();
    // alert(JSON.stringify(newComment))
    return fetch(BaseUrl + 'dishes/'+dishId+'/comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          "content-type": "application/json"
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
            'content-type':'application/json'
        }
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
        body:JSON.stringify(comment),
        headers:{
            'content-type':'application/json'
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
            'content-type':'application/json'
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
    
    var values={username:username,password:password}
    fetch(BaseUrl+'users/login',{
        method:'POST',
        credentials:'include',
        body:JSON.stringify(values),
        headers:{
            'content-type':'application/json'
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
    .then(response =>  {
        alert(response.status)  
        cookie.remove('login',{path:'/'})
        cookie.save('login',true,{path:'/',expires:new Date(Date.now()+24*60*60*1000)})
        cookie.save('user',username,{path:'/',expires:new Date(Date.now()+24*60*60*1000)})
        if(response.success)
            dispatch(loginsuccess)
        else
            dispatch(loginfailed)
    })
    .catch(error =>  { 
    console.log('Login error', error); alert('Login Failed\n'+error); });
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
    .then((response)=>{
        cookie.remove('login',{path:'/'})
        cookie.save('login',false,{path:'/',expires:new Date(Date.now()+24*60*60*1000)})
        cookie.remove('user',{path:'/'})
        alert(response.status)
        dispatch(loginfailed)
    })
    .catch(error =>  { console.log('Logout error', error); alert('Logout Failed\nError: '+(error)); });
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