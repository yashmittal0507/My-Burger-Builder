import * as actionTypes from '../actions/actionTypes';
import {
    updatedObject
} from '../utility';
const initialState = {
    ingredients: null,
    error: false,
    totalPrice: 4,
}
const INGREDIENTS_PRICE = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 1,
    meat: 2
}

const addIngredient = (state, action) => {
    const updateIngredient = {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    }
    const updatedIngredients = updatedObject(state.ingredients, updateIngredient)
    const updatesStateProperties = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
    }
    return updatedObject(state, updatesStateProperties)
}

const removeIngredient = (state, action) => {
    const updateIng = {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    }
    const updatedIngs = updatedObject(state.ingredients, updateIng)
    const updatesStatePropes = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
    }
    return updatedObject(state, updatesStatePropes)
}

const setIngredients = (state, action) => {
    const updateIngOrder = {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        totalPrice: 4,
        error: false
    }
    return updatedObject(state, updateIngOrder)
}

const fetchIngredientsFailed = (state, action) => {
    return updatedObject(state, {
        error: true
    })
}
const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_INGREDIENTS:
            return addIngredient(state, action)

        case actionTypes.REMOVE_INGREDIENTS:
            return removeIngredient(state, action)

        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action)



        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action)

        default:
            return state




    }

}

export default reducer;