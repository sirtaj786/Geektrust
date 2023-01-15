
import React, { useEffect, useState } from 'react'

import {useDispatch, useSelector} from "react-redux"
import { Link, useNavigate } from 'react-router-dom';
import { decrease_quantity, delete_cart_data, increase_quantity } from '../Redux/cart.action';

const Cart = () => {
  const navigate=useNavigate()
  const {cartData }= useSelector((store)=>store.CartReducer);
  const dispatch=useDispatch()
   let totalPrice=0;
 
  console.log("current item in cart ", cartData)

  return (
    <>
    <div id="navBar">
      <div className="menu">
       <Link to="/"> <h3  onClick={()=>{navigate("/")}}>TeeRex Store</h3></Link>
        <i class="fa fa-shopping-cart" aria-hidden="true" style={{fontSize:"35px" , cursor:"pointer"}}
         onClick={()=>{
         }}
        >Products
            <span id='cart_item_count'>{ cartData.length>0?cartData.length:""}</span>
        </i>
      </div>
    </div>
    <div className="cart_main">
       <p>Shopping Cart</p> 
       <div className="cart_content">
          {
            cartData.length? cartData.map((el , i)=>{
              {totalPrice= totalPrice+(el.price*el.currentQuantity)}
              return (
                <div className="cart_content_main" id={el.id}>
              <img src="https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png" alt="" />
               <div className="price_and_title_box">
                <p>{el.name}</p>
                <h4>Rs {el.price * el.currentQuantity}</h4>
               </div>
               <div className="button_box">
                 <div className="increase_decrease_box">
                  <button onClick={()=>{
                    // checking quantity limit 
                     let itemIndex= cartData.findIndex((el)=>el.currentQuantity>el.quantity);
                     if(itemIndex!==-1){
                     alert("Item quantity limit is exceeded ")
                      return 
                     }
                     dispatch(increase_quantity(el.id))
                  }}>+</button>
                  <div style={{marginTop:"6px"}}>Qty {el.currentQuantity}</div>
                  <button  disabled={el.currentQuantity===1} onClick={()=>{
                      dispatch(decrease_quantity(el.id))
                  }}>-</button>
                 </div>
                  <button onClick={()=>{
                      console.log("clicked item id" , el.id, el)
                      dispatch(delete_cart_data(el.id))
                  }}>Delete</button>
               </div>
          </div>
              )
            }):  <div className='no_cart_item_div'>
                   <p onClick={()=>{navigate("/")}}>Please Add Item in Cart</p>
                 
            </div>
          }
          
        </div>

        <h4 style={{marginRight:"18rem" , marginTop:"1%"}}>Total payable amount :RS. {totalPrice==0?"":totalPrice}</h4>
    </div>

     
    
    </>
  )
}

export default Cart