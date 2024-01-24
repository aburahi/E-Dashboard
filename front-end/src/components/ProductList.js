import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
const ProductList=()=>{
    const [products,setProducts]=useState([]);
    useEffect(()=>
    {
        getProducts();
    },[])
    const getProducts=async()=>{
        let result= await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        setProducts(result);
    }
    const deleteProduct=async(id)=>{
        console.log(id)
        let result=await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result= await result.json();
        if(result){
            getProducts();
            setTimeout(() => {
                alert("record is deleted");
              }, "100");
              
            
            
        }
    }
    const searchHandle=async(e)=>{
        let key=e.target.value;
        if(key){
        let result=await fetch(`http://localhost:5000/search/${key}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        if(result)
        {
            setProducts(result);
        }
    }
    else{
        getProducts();
    }
    }
        
    
    return(
        <div className="product-list">
            <h3>
                Product List
            </h3>
            <input type="text" placeholder="Search product" className="search-product-box" onChange={searchHandle}></input>
            <ul>
                    <li>S.No</li>
                    <li>Name</li>
                    <li>Price</li>
                    <li>Category</li>
                    
                    <li>Operation</li>
                </ul>
                {
                    products.length>0?products.map((item,index)=>
                        <ul key={item._id}>
                        <li>{index}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        
                        <li><button><Link to="/" onClick={()=>deleteProduct(item._id)} type="button">Delete</Link></button>
                        <button><Link to={"/update/"+item._id} type="button">update</Link></button>
                        </li>
                    </ul>
                        )
                        :
                        <h1>No product found</h1>
                }
        </div>
    )
}
export default ProductList;