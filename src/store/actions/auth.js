import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart =()=>{
return {
    type:actionTypes.AUTH_START
}
}

export const authSuccess =(tokenid,userid)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        tokenId:tokenid,
        userId:userid
    }
}

export const authFailed =(error)=>{
    return {
        type:actionTypes.AUTH_FAILED,
        error:error
    }
}

export const auth =(email,password,isSignUp)=>{
    return dispatch =>{
        dispatch(authStart());
        const authData ={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url="https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBpnCLtEkEKVzTU6GpWUrc-I2ORBZHEZwE";
        
        if(!isSignUp){
            url="https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBpnCLtEkEKVzTU6GpWUrc-I2ORBZHEZwE";
        }
        axios.post(url,authData)
        .then(res=>{
            dispatch(authSuccess(res.data.idToken,res.data.localId));
            localStorage.setItem('token',res.data.idToken);
            console.log(new Date().getTime);
            localStorage.setItem('expirationTime',new Date(new Date().getTime()+res.data.expiresIn*1000));
            localStorage.setItem('userId',res.data.localId);
          dispatch(checkAuthTimeout(res.data.expiresIn))
            console.log(res.data)
        })
        .catch(err => { 
            dispatch(authFailed(err.response.data.error.message))
            console.log(err)
        })
    }        
    }

    export const authLogout =()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('userId');
        return {
            type:actionTypes.AUTH_LOGOUT
        }
    }

    export const checkAuthTimeout =(expirationTime)=>{
        return dispatch =>{
       setTimeout(()=>{
           
                dispatch(authLogout())
            
       },expirationTime*1000)
    }
    }

    export const setAuthRedirect =(path)=>{
        return {
            type:actionTypes.SET_AUTH_REDIRECT_PATH,
            path:path
        }
    }

    export const checkAuthState =()=>{
      
        return dispatch=> {
            dispatch(authInitializedAfterReloading())
           const token = localStorage.getItem('token');
           if(!token){
               dispatch(authLogout())
           }
           else {
               const expirationTime =new Date(localStorage.getItem('expirationTime'));
               const userId= localStorage.getItem('userId')
               if(expirationTime >= new Date()){
                   dispatch(authSuccess(token,userId));
                   dispatch(checkAuthTimeout((expirationTime.getTime()-new Date().getTime())/1000));
               }
               else {
                   dispatch(authLogout())
               }
           }
        }
    }

    export const authInitializedAfterReloading=()=>{
        return {
            type:actionTypes.SET_AUTH_INITIALIZATION_AFTER_RELOAD
        }
        
    }
