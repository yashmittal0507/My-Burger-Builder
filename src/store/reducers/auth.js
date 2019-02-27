import * as actionTypes from '../actions/actionTypes';
import {
    updatedObject
} from '../../shared/utility';
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    isAuthInitializedAfterReloading:false
}

const authStart = (state, action) => {
    return updatedObject(state, {
        error: null,
        loading: true
    })
}

const authSuccess = (state, action) => {
    return updatedObject(state, {
        token: action.tokenId,
        userId: action.userId,
        error: 'undefined',
        loading: false
    })
}

const authFailed = (state, action) => {
    return updatedObject(state, {
        loading: false,
        error: action.error
    })
}

const authLogout = (state, action) => {
    return updatedObject(state, {
        token: null,
        userId: null,
        error: null
    })
}

const authRedirectPath = (state, action) => {
    return updatedObject(state, {
        authRedirectPath: action.path
    })
}

const isAuthInitializedAfterReloading =(state,action) =>{
    return updatedObject(state, {
        isAuthInitializedAfterReloading: true
    })
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action)


        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)

        case actionTypes.AUTH_FAILED:
            return authFailed(state, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return authRedirectPath(state, action)
        case actionTypes.SET_AUTH_INITIALIZATION_AFTER_RELOAD:
            return isAuthInitializedAfterReloading(state,action)
        default:
            return state
    }

}

export default reducer;