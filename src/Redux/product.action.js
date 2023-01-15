import { PRODUCT_ERROR, PRODUCT_FILTER, PRODUCT_LOADING, PRODUCT_SEARCH, PRODUCT_SUCESS } from "./product.action.type"


 export const getProduct=()=>(dispatch)=>{
          dispatch(productLoading())
        
             fetch("https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json")
              .then(res => res.json())
              .then(res=>{ dispatch(productSuccess(res))
            }).catch((err)=>{
                  dispatch(productError())
            })
            
        
 }
 export const productLoading=()=>({type:PRODUCT_LOADING})
 export const productSuccess=(payload)=>({type:PRODUCT_SUCESS ,payload})
 export const productError=()=>({type:PRODUCT_ERROR});
 export const product_filter=(payload)=>({type:PRODUCT_FILTER,payload})
 export const product_search=(payload)=>({type:PRODUCT_SEARCH,payload})