import logo from './logo.svg';
import './App.css';
import Home from './components/client/home/home'
import {BrowserRouter as Router,Redirect,Route,Switch} from 'react-router-dom'
import ProductsMain from './components/client/product/productMain'
import './assets/style/custom.scss'
import ShoppingAdmin from './components/admin/ShoppingAdmin';
import ProductDetail from './components/client/productDetail/productDetail';
import Header from './components/client/common/header';
import ShoppingCart from './components/client/cart';
import { createStore } from 'redux';
import {Provider} from 'react-redux'
import Login from './components/client/common/login';
import Signup from './components/client/common/register';
import BasicExample from './components/client/common/notfound'
import Footer from './components/client/common/footer';
import Checkout from './components/client/checkout';
import SearchMain from './components/client/search/searchMain';
import User_Home from './components/client/user/home';
import './assets/style/reponsive.scss'

function App() {
  const initState ={
    cart :[
      // {
      //   name:"product 1 ",
      //   id: "abc",
      //   price:50,
      //   quanity : 1,
      //   image:["abc","xyz"],
      //   id_cart:0
      // },
      // {
      //   name:"product 12 ",
      //   id: "abcdsa",
      //   price:50,
      //   quanity : 1,
      //   image:["abc","xyz"],
      //   id_cart:1
      // },
    ],
    value : "",
    user:null,
    products_total:[],
    loading:true,
    products:[]
  }
 
  const root_reducer = function (state = initState,action){
    console.log(state,action)
    const token_cart = window.localStorage.getItem('cart');

    if(action.type === "ADD_TO_CART"){  
      const exist_product_index = state.cart.findIndex(product=>product.id===action.payload.id);
      let new_cart ;
      // Nếu có storage Cart thì dùng storage Cart là neew Cart
     
     if(exist_product_index<0){
        new_cart =  [
       ...state.cart
       ,{
         ...action.payload,
         id_cart:Date.now()
       }
        ]
     window.localStorage.setItem('cart',JSON.stringify(new_cart))

      }
      
      else {
      new_cart =[...state.cart];
      new_cart[exist_product_index].quanity = new_cart[exist_product_index].quanity  + action.payload.quanity
     localStorage.cart =JSON.stringify(new_cart)

     }


      return {
        ...state,  // lấy lại những state cũ , bởi vì hàm này sẽ ghi dè lại bằng return  state mới
        cart: new_cart
        
      }
      
    }
    else if(action.type ==="UPDATE_CART") {
      const exist_product_index = state.cart.findIndex(product=>product.id_cart===action.payload.id_cart);
      const new_cart = [...state.cart]
      new_cart[exist_product_index].quanity = action.payload.quanity
     localStorage.cart =JSON.stringify(new_cart)
       console.log("update cart")

      return {
        ...state,cart:new_cart
      }
    }
    else if(action.type === "DELETE_CART") {
      const new_cart  = state.cart.filter(product=>{
        return product.id_cart !== action.payload
      })
     localStorage.cart =JSON.stringify(new_cart)
      // console.log('delete item')
      // console.log(state.cart)
      // console.log(new_cart)
      return {
        ...state,cart:new_cart
      }
    }
    else if(action.type ==="COMPLETE_CART") {
      
      const new_cart = []
      localStorage.cart =JSON.stringify(new_cart)

      return {
        ...state,
        cart:new_cart
      }
    }
    
   
    else if(action.type ==='getAllProducts') {
      return {  
        ...state,
        products_total:action.payload,
      }
    }
     
    else if(action.type==='getPageProducts'){
      return {
        ...state,
        products: action.payload
      }
    }
    
   
    else if(action.type === "add_value_search"){
      return {
        ...state,
        value : action.payload
      }
    }
   
    // handle Login
    else if(action.type === 'userLogin')
    {
      return {
        ...state,
        user:action.payload
      }        
    }
if(token_cart){
      const cart = JSON.parse(localStorage.getItem('cart'));
      return {...state,cart:cart}
    }
    return state 
  }
 const store = createStore(root_reducer
  ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
 return (
    <Provider store={store} >
      
          <Router>
        
            <div className="App">       
               <Switch>
                  <Route  exact path="/">
                    <Home/>
                </Route>
               <Route exact path="/cart">
              <Header></Header>
                 
                  <ShoppingCart/>
                  <Footer/>
                </Route>
                {/* end cart */}
               <Route exact path="/products/:category">  
              <Header></Header>

                  <ProductsMain/>
                </Route> 
                    
                <Route exact path="/search/:keyword">
              <Header></Header>

                    <SearchMain/>
                    <Footer/>

                </Route>



                  {/* <Route exact path="/products/:id"  component={Header,ProductDetail}> */}
                    <Route exact path="/products/:category/:name">
              <Header></Header>

                          <ProductDetail/>
                    </Route>
                   {/* </Route> */}z
               
                <Route exact path="/checkout">
              <Header></Header>

                  <Checkout/>

                </Route>
                
              {/* url khác path ở trên thì ricte về products */}

              <Route  path="/user">
              <Header></Header>

                <User_Home/>
               
              </Route>

               
                <Route exact  path="/account/login">
                    <Header></Header>

                        <Login/>
                      <Footer/>

                </Route>
                <Route exact  path="/account/register">
                    <Header></Header>

                        <Signup/>
                      <Footer/>

                </Route>
                <Route Route exact path="/admin">
                  
                    <ShoppingAdmin></ShoppingAdmin>
                </Route>

                <Route>
                  <BasicExample/>
                </Route>
             </Switch>
             </div>
        </Router>
    </Provider>
  );  
}

export default App;
