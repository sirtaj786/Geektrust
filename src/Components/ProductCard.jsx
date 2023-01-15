import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add_cart_data } from '../Redux/cart.action';

const ProductCard = ({data}) => {
    const dispatch=useDispatch();
    const {cartData} = useSelector((store)=>store.CartReducer)
    console.log("carddata",data)
  return (
    <>
    <div className="product_card">
        <p className='product_title'>{data.name}</p>
        <img src={`${data.imageURL}`} alt=" image_it" />
         <div className="item_details">
            <p>Rs {data.price}</p>
            <button onClick={()=>{
               // for checking duplicate data
                let itemIndex=cartData.findIndex((e)=>e.id===data.id)
              
                if(itemIndex!==-1){
                  alert("Item is already in the Cart !")
                  return 
                }
                // if there is no duplicate item then add it to cart
               dispatch(add_cart_data(data));
               alert(`${data.name} Added in the Cart !`)
            }}>Add to Cart</button>
         </div>
     </div>
    
    </>
  )
}

export default ProductCard