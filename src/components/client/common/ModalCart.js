import { queryAllByAltText } from '@testing-library/react'
import react from 'react'
import React from 'react'
import {Link} from 'react-router-dom'
import { FaWindowClose } from 'react-icons/fa'
import { Button, Card, CardBody, CardColumns, CardHeader, CardImg, CardText, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap'
import {connect} from 'react-redux'
import CurrencyFormat from 'react-currency-format';

function Modalcart_item(props){
    const imgstyle ={
        "width":"50px",
        "height":"50px"
    }
    const borderQuanityItem ={
        "background": "#ededed",
    "textAlign": "center",
    "padding": "6px 12px",
    "fontSize":" 0.8rem",
    "lineHeight": "1",
    }
    const {quanity,price,image,name} = props.item_cart
    return <>
             <Card style={{"padding" :"10px 20px","flexDirection" :"row"}}>
                                            <div className="item-img-price-wrap" style={{"flexDirection":" column", "display": "flex"}} >
                                                <CardImg style={imgstyle} src={image[0]} alt="dsa" />
                                               <div className="item-img-price" style={{"display":"flex","marginTop": "10px"}}>
                                                <CardText className="item-quanity" style={borderQuanityItem}>
                                                        {true?quanity:""}
                                                </CardText>
                                                    <CardText className="item-price" style={{"marginLeft":"10px"}}>
                                                        {true?price:""}
                                                    </CardText>
                                               </div>
                                            </div>
                                            <div className="item-category" style={{"width":"70%"}}>
                                                <CardText style={{"fontSize":"1.2rem"}} >{true?name :""} </CardText>
                                                <CardText>
                                                    Size L
                                                </CardText>
                                            </div>
                                            
                                        </Card >
                                    
    
    </>
}







class ModalCart extends React.Component{
  componentDidMount(){
        window.onclick=(e)=>{
        //     if(e.target.id === "over-lay") {
        //        this.toggleOpen( )
        //     }
            if(e.target.id ==="over-lay2"){
                this.props.handleToggleCart()
    
            }
        }
    }

   render() {

    const ModalStyle={
        "width" : "100%",
        "height":"100%",
        "position" : "fixed",
        "top" : 0,
        "left":0,
        "zIndex" : 9999,
        // "visibility" : "hidden",
        // "opacity" : 0,
        "transition": "all 200ms linear",
        "background": "rgba(0,0,0,0.8)"
    }
    
       return ( <>
     <div id="over-lay2" onClick={this.props.toggleModel} className="overlay-cm"  style={ModalStyle}>
            <div id="Modal-Cart"  className="Search-Wrapped modal_common">
                <div className="Search-container" style={{}}>
                    <Container>
                    <Row>
                        <Col lg="12">
                            <div style={{"display" : "flex","justifyContent" :"space-between","alignItems":"center"}}>
                                <CardText>Giỏ Hàng</CardText>
                                <span className="toggleX" onClick={this.props.handleToggleCart} style={{"fontSize":"30px"}}>X</span>
                            </div>
                            
                            <Form style={{"marginTop" :"40px"}}>
                                <FormGroup>
                                    <div className="item-container" >
                                        {/* card item modal cart */}
                                    {this.props.cart.map((item_cart)=>{
                                        return <Modalcart_item item_cart={item_cart}/>
                                    })}                                    
                                    </div>
                                    <hr>
                                    </hr>
                                    
                                    <div className="item-checkout">
                                     <Card>
                                         <CardHeader style={{"display":"flex","justifyContent":"space-between","border":"1px solid rgba(0,0,0,.125)"}}>
                                             <CardText>Tổng Tiền</CardText>
                                             
                                             <CurrencyFormat value={this.props.price_total} displayType={'text'} thousandSeparator={true} prefix={'$'} renderText={value => <CardText>{value}</CardText>} />

                                         </CardHeader>
                                         <CardBody>
                                             <Link to="/cart">
                                             <Button onClick={this.props.handleToggleCart} color="info" type="submit">Xem Giỏ Hàng</Button>
                                             
                                             </Link>
                                             <Link to="/checkout">
                                             <Button color="primary" type="submit">Thanh Toán  </Button>

                                             </Link>

                                         </CardBody>
                                     </Card>
                                          
                                       
                                    </div>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    </Container>  
                </div>
            </div>
        </div>
    </>
        
        ) 
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
export default connect (mapStatesToProps,null)(ModalCart)