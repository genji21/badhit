import { render } from '@testing-library/react';
import React from 'react';
import { Button, Card, CardBody, CardImg, Col, Container, Form, Input,  Row } from 'reactstrap';
import {Link} from 'react-router-dom'
import {GiPriceTag,GiBackForth} from 'react-icons/gi'
import { MdSecurity} from "react-icons/md";
import '../../assets/style/cart.scss'
import { FaTruck } from "react-icons/fa";
import NumericInput from 'react-numeric-input'
import ModalCart from './common/ModalCart';
import Modal from './common/Modal'
import {connect} from 'react-redux'
import CartDetail from './cartDetail';
import EmptyCart from './common/emptyCard';
class ShoppingCart extends React.Component{
    state =({
        quanity:1,
        loading:false,
    })
    componentDidMount() {
    }
    componentDidUpdate(){
    }
      handleClick=(event)=>{
        event.preventDefault();
    }
    render()
    {
        const total_discount = this.props.price_total+(this.props.price_total*0.1);
        const total_price = this.props.price_total;
        const cart_length = this.props.cart.length;
        return <>
           <section id="shopping_cart_detail">
                <div className="shopping_cart-intro">
                    <h2>Giỏ Hàng Của Bạn</h2>
                    <span>Có {this.props.cart.length} sản phẩm trong giỏ hàng </span>
                    <Container>
                        <Row>
                            <Col sml={12} md={12} xl={12}>
                                <Form className="Form_Cart">
                                    <Container>
                                        <Row>
                                        <Col 
                                        sm={12} xs={0}  md={8} lg={8} >
                                            {/* Cart Detai; */}
                                            {this.props.cart.length>0?
                                            this.props.cart.map(product=>{
                                                return <CartDetail deleteCart={this.props.deleteCart} updateCart={this.props.updateCart}  key={product.cart_id}  products={product}/>
                                            }) : <EmptyCart/>
                                        }

                                            </Col>
                                            <Col sm={0} md={4} lg={4}>
                                                <div className="productDetail_toTal" >
                                                    <div style={{"display":"flex","flexDirection":"column"}} className="productDetail_ToTal_Wrap">
                                                        <h5> Total :</h5>
                                                        <span style={{"color":"black","fontSize":"3rem"}} className="productDetail_Total_Num">
                                                            {total_price}$
                                                        </span>
                                                        {/* total discount = Tổng discount bên các sản phẩm  */}
                                    <del className="total_discount">{total_discount }$</del>
                                                        {/* phần trăm discount = giá trước / giá sau *100 */}
                                                        <span className="total_discount_percent">10% OFF</span>
                                                        {/* Tổng sp trên 10k thì freeship Okee */}
                                                        <span className="total_ship">Free Shipping!!</span>
                                                            <Button  onClick={this.handleClick} className={cart_length > 0 ? "active" :"disabled"} style={{"color":"white"}}>
                                                                <Link to="/checkout">
                                                                            Proceed To CheckOut
                                                                
                                                                </Link>
                                                            </Button>

                                                        {/* security policty */}
                                                        <div className="Security">
                                                            <div className="Security_Wrapped">
                                                                <div style={{"border-left": "6px solid #f37990" ,"display":"flex"}} className="security_item">
                                                                    <MdSecurity style={{"color":"rgb(214,69,96)","fontSize":"2rem","margin":"0 20px"}}/>
                                                                    <span> Security policy (edit with Customer reassurance module) </span>
                                                                </div>
                                                            </div>
                                                            <div className="Security_Wrapped">
                                                                <div style={{"border-left": "6px solid #f37990" ,"display":"flex"}} className="security_item">
                                                                    <FaTruck style={{"color":"rgb(214,69,96)","fontSize":"2rem","margin":"0 20px"}}/>
                                                                    <span> Security policy (edit with Customer reassurance module) </span>
                                                                </div>
                                                            </div>
                                                            <div className="Security_Wrapped">
                                                                <div style={{"border-left": "6px solid #f37990" ,"display":"flex"}} className="security_item">
                                                                    <GiBackForth style={{"color":"rgb(214,69,96)","fontSize":"2rem","margin":"0 20px"}}/>
                                                                    <span> Security policy (edit with Customer reassurance module) </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div> 
                                                </div>
                                            </Col> 
                                        </Row>
                                    </Container>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
           </section>
              
        </>
    }
}
const mapStatesToProps = state=>{
    const total =  state.cart.reduce((sum,cart)=>{
        return sum = sum + cart.quanity*cart.price 
    },0)
    return {
        cart :state.cart,
        price_total : total 
    }
}
const mapDispathToProps = dispatch =>{
    return {
        updateCart:(id_cart,quanity)=>{
            dispatch({
                type :"UPDATE_CART",
                payload :{
                    id_cart,
                    quanity
                }
            })
        },
        deleteCart:(id_cart)=>{
            dispatch({
                type:"DELETE_CART",
                payload:id_cart
            })
        }
    }
}
export default connect (mapStatesToProps,mapDispathToProps)(ShoppingCart)