import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../Axios-Order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UIComponents/Spinner/Spinner';
class Orders extends Component {
    state ={
        orders:[],
        loading:false
        }

    componentDidMount(){
        let fetchedOrders=[]
        this.setState({loading:true})
        axios.get('/orders.json')
       
        .then(res=>{
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id:key
                })
            }
            console.log('fetched',fetchedOrders);
            this.setState({loading:false,orders:fetchedOrders});
        })
        .catch(error => console.log(error))
    }
    render(){
        let order=null;
        if(this.state.loading){
            order =<Spinner/>
        }
        else {
            order =(
                <React.Fragment>
                
               {this.state.orders.map(order=>{
                    return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
               })
            }
            </React.Fragment>
            )
        }
        return(
            <div>
             {order}
            </div>
        )
    }
}
export default WithErrorHandler(Orders,axios);