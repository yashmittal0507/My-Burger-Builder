import * as actionTypes from './actionTypes';
import axios from '../../Axios-Order';


export const  purchaseBurgerSuccess =(id,orderData)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}
export const  purchaseBurgerFailed =(error)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_FAILED,
       error:error
    }
}
export const purchaseBurgerStart =()=>{
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
   
}

export const burgerPurchased =() =>{
    return {
        type:actionTypes.PURCHASE_BURGER_REDIRECT_AFTER_SUCCESS
    }
}

export const purchaseBurger =(orderData) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart())
        axios.post( '/orders.json', orderData )
        .then( response => {
            console.log(response.data);
            
           dispatch(purchaseBurgerSuccess(response.data,orderData))
         
        } )
        .catch( error => {
            dispatch(purchaseBurgerFailed(error))
        } );
    }
}
// Here are the action creators for fetching orders

export const  fetchOrdersSuccess =(orders)=>{
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const  fetchOrdersFailed =(error)=>{
    return {
        type:actionTypes.FETCH_ORDERS_FAILED,
        error:error
    }
}
export const fetchOrdersStart =()=>{
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
   
}
export const fetchOrders =() =>{
    return dispatch =>{
        let fetchedOrders=[]
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
       
        .then(res=>{
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            console.log('fetched',fetchedOrders);
            dispatch(fetchOrdersSuccess(fetchedOrders))
        })
        .catch(error => { 
            dispatch(fetchOrdersFailed(error))
        })
    }
}