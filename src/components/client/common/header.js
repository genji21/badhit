import React,{useState,useEffect} from 'react'
import { Link , NavLink } from 'react-router-dom'
import { Card, CardBody, CardHeader, CardImg, CardText, CardTitle, Col, Container, ListGroup, ListGroupItem, Row } from 'reactstrap'
import Modal from '../common/Modal'
import ModalCart from '../common/ModalCart'
import {connect} from 'react-redux'
import  Breadcrumps from './Breadcrumbs'
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa'











 function Header(props){
    const headerstyle = {
        "backgroundColor" : " white",
        "width":"100vw",
        "padding":"20px",
        "marginBottom" : "20px",
        "boxShadow" :"0 4px 10px 0 hsla(0,0%,39.2%)",
    }
   const [search,setModalSearch] = useState(false)
   const [cart,setModalCart] = useState(false)
  const [cartQuanity,setCartQuanity] = useState(0)

   const handleToggle=()=>{
       setModalSearch(!search)
   }
   const handleToggleCart=()=>{
       setModalCart(!cart)
   }

   useEffect(()=>{
  const  cart_item =  window.localStorage.getItem('cart')
    // console.log(cart_item)
       if(cart_item) {
           const cart = JSON.parse(cart_item) 
        //    console.log(cart.length)
        //    console.log(cart)
           const total = cart.reduce((sum,product)=>{
            return sum = product.quanity + sum
        },0)
        setCartQuanity(total)
       }
       else{
        const total = props.cart.reduce((sum,product)=>{
            return sum = product.quanity + sum
        },0)
        setCartQuanity(total)
       }
    //    console.log('did mount')
   })
  
  return (<>
     <header style={headerstyle}>
            <Container fluid>              
                    <Row style={{"justifyContent":"space-between"}}>
                        <Col lg={9} md={9} sm={0}>
                            <img style={{
                            }} src="https://theme.hstatic.net/1000351433/1000471586/14/logo.png?v=558"/>             
                        </Col>
                       
                        <Col className="navbar-wrap" lg={3} md={3} sm={3}>
                        <div id="navbar">
                <Row className="navbar-wrapped ">
                    <ListGroup>
                        <ListGroupItem>
                            <Link to="/account/login">
                                <FaUserCircle></FaUserCircle>
                            </Link>
                        </ListGroupItem>
                        <ListGroupItem>
                            <FaSearch onClick={handleToggle} className="toggleModalSearch" ></FaSearch>
                        </ListGroupItem>
                        <ListGroupItem>
                            <FaShoppingCart onClick={handleToggleCart} className="toggleModalCart"   >

                            </FaShoppingCart>
                            <div className="cart_length">
                                 <span>{cartQuanity}
                                </span>
                            </div>

                        </ListGroupItem>

                    </ListGroup>
                </Row>
        </div>
                                    </Col>
                                    <ul style={{"margin":"0 auto","display":"flex","width":"30%","justifyContent":"space-evenly","listStyleType":"none"}} >
                                        <li>
                                            <NavLink to="/products/allproduct">Shop</NavLink>
                                        </li>
                                       
                                        <li>
                                        <NavLink to="/Admin">Admin</NavLink>
                                        </li>
                                        


                                    </ul>
                    </Row>
            </Container>
        </header>
       
        {search?<Modal handleToggle={handleToggle} />:""}
        {cart?<ModalCart handleToggleCart={handleToggleCart} />:""}
    </>

    )
}

const mapStateToProps =(state)=>{
    // tính tổng số lượng sản phẩm trong giỏ hàng
 
  
    return {
        cart:state.cart
    }
}
export default connect(mapStateToProps)(Header)