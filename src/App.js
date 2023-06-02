import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const[products, setProducts] = useState([])
  const[cart, setCart] = useState([])
  useEffect(() => {
    (
      async() =>{
        try{
          const {data :{products} }= await axios.get('https://dummyjson.com/products')
          // const updatedProducts = products.map((product) => ({...product, isInCart : false}))
          setProducts(/*updatedProducts*/products);
        }
        catch(err){
          console.log("something went wrong !!!")
        }
      }
    )()
  },[])

  // const handleAddtoCartClick = (prodID, isInCart) =>{
  //   if(!isInCart){
  //     setProducts(products.map((product) => product.id === prodID ? ({...product, isInCart : true}) : product))
  //     let updatedcart = products.filter((product) => product.id === prodID)
  //     updatedcart = updatedcart.map((product) => ({...product, isInCart : true}))
  //     setCart([...cart, ...updatedcart])
  //   }
  // }
  const findIsInCart = (prodID) =>{
    return cart.some((product) => product.id === prodID)
  }

  const handleAddtoCartClick = (prodId) =>{
    const isInCart = findIsInCart(prodId)
    if(!isInCart){
      const filteredCart = products.filter((product) => product.id === prodId) 
      setCart([...cart, ...filteredCart])
    }
  } 

console.log(cart)
  return (
    <div>
    <div className='cart-btn'> 
    <span class="material-icons-outlined">
      shopping_cart
     </span>
    <span className='cart-num'> <button className='btn'>{cart?.length}</button> </span>
    </div>
    <div className="App">
      {
        products?.length > 0 && products.slice(0,20).map((product) => {
          return(
            <div key={product.id}>
              {product.title}
              <button onClick={() => handleAddtoCartClick(product.id /*,product.isInCart*/)}>Add to Cart</button>
              </div>
          )
        })
      }
    </div>
    </div>
  );
}

export default App;
