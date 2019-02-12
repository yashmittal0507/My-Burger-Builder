import * as actionTypes from './actionTypes';
import axios from '../../Axios-Order';

export const addIngredient =(name) =>{   // This is a action creator
    return {
        type:actionTypes.ADD_INGREDIENTS,
        ingredientName:name
    }
}
export const removeIngredient =(name) =>{ // This is a action creator
    return {
        type:actionTypes.REMOVE_INGREDIENTS,
        ingredientName:name
    }
}
export const setIngredients =(ingredients) =>{ // This is a action creator
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}
export const setIngredientsError =() =>{ // This is a action creator
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
        
    }
}

export const initIngredients =()=>{
    return dispatch =>{
          axios.get('/ingredients.json')
         .then(response=>{
             console.log(response.data)
            dispatch(setIngredients(response.data))
         })
         .catch(error=>{
            dispatch(setIngredientsError())
 })
    }
}
