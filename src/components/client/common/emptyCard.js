import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { Button, CardImg, Container } from 'reactstrap'
import {Link} from 'react-router-dom'
export default function EmptyCart(){
    return (<>
            <Container>
                <div>
                <CardImg style={{"width":"50%"}} src="https://ezcookingbaking.myhartono.com/assets/uploads/images/cart_empty.png"></CardImg>
                    <h3 style={{"margin":"2rem"}}> Your Cart is Empty</h3>
                    <Link to="/products/allproduct">
                        <Button color="primary"> 
                            Continue To Shopping
                        </Button>
                    </Link>
                </div>
            </Container>


    </>)
}