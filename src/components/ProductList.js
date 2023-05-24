import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

import "./ProductList.css"
const ProductList = () =>{
   const [products, setProducts] = useState([]);
   
   useEffect(()=>{
    getProduct();
   },[])

   const getProduct = async() =>{
       let result = await fetch("https://e-commerce-back-end-3ec1.onrender.com/products");
       result = await result.json();
       setProducts(result);
   }
//    console.warn(products);
   const deleteProduct= async(id)=>{
        // console.warn(id)
        let result = await fetch(`https://e-commerce-back-end-3ec1.onrender.com/product/${id}`,{
            method:'delete'
        });
        result = await result.json();
        if(result){
            // alert('Product deleted')
            getProduct();
        }
   }

   const searchHandle = async(event) =>{
        // console.warn(event.target.value);
        let key = event.target.value;
        if(key){
            let result = await fetch(`https://e-commerce-back-end-3ec1.onrender.com/search/${key}`);
            result = await result.json()
            if(result){
                setProducts(result);
            }
        }else{
            getProduct();
        }

   }
   

    return(
        <div className='product-list'>
            <h1>Product List</h1>
            <input className='search-product' placeholder='Search Product'
              onChange={searchHandle}
            />
            <ul>
               <li>S. No.</li>
               <li>Name</li>
               <li>Price</li>
               <li>Category</li>
               <li>Company</li>
               <li>Operation</li>
            </ul>
            {
              products.length > 0 ? products.map((item, index)=>
                 <ul key={item._id}>
                   <li>{index+1}</li>
                   <li>{item.name}</li>
                   <li>{item.price}</li>
                   <li>{item.category}</li>
                   <li>{item.company}</li>
                   <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                   <Link to={"/update/"+item._id}>Update</Link>
                   </li>
                 </ul>   
                ) : <h1>No Result Found</h1>
            }

        </div>
    )
}
export default ProductList;