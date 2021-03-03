import React from 'react' 
import { GiBackForth, GiPriceTag } from 'react-icons/gi'
import { Card, CardBody, CardImg, Col,Input,Button } from 'reactstrap'
import {Link} from 'react-router-dom'
import { BsTrash } from "react-icons/bs";
import QuanityInput from './common/QuanityInput'
import Swal from 'sweetalert2'
export default class CartDetail extends React.Component{
    state={
        quanity:1
    }
    handleChangeQuantity=(data,operator = false)=>{
        if(operator){
            if(this.state.quanity === 1 && data === -1){
              return this.setState({quanity:1})
            }
            return this.setState({
                quanity:this.state.quanity + data // 
            },()=>{       // set lại state cart của store sau khi state input sản phẩm thay đổi
                this.props.updateCart(this.props.products.id_cart,this.state.quanity)
            })
            
        }
        if(data === 0 || data < 0){
            return this.setState({quanity:1})
        }
        this.setState({
            quanity: data
        },()=>{
            this.props.updateCart(this.props.products.id_cart,this.state.quanity)
        })
    }
    handleDeleteCart = ()=>{
        Swal.fire({
            title: 'Bạn có chắc muốn xóa sản phẩm này không?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            timer : 5000,
            timerProgressBar:true,
            
          }).then((result) => {
            if (result.isConfirmed) {
               
              Swal.fire(
                'Xóa Thành Công',
                'Sản phẩm đã bị xóa ',
                'success'
              )
              this.props.deleteCart(this.props.products.id_cart)
            }
          })
    }
    componentDidMount(){
        this.setState({
            quanity:this.props.products.quanity
        })
    }
    render(){
    const {name,price,quanity,image,cart_id} = this.props.products;
  
    return (<>
          
                                                <div className="product_item_wrapped">
                                                    <Card className="product_item">
                                                        <div style={{"display":"flex"}} className="product_item_detail_container">
                                                            <CardBody className="item_img" >
                                                                <CardImg style={{"maxWidth":"100%","width":"100px"}} src={image[0]} alt="dsadsa" />
                                                            </CardBody>
                                                                 <h3 className="item_detail_name">{name}</h3>
                                                            
                                                               <QuanityInput onChange={this.handleChangeQuantity} value={quanity}/>
                                                           
                                                            <CardBody style={{"textAlign":"left"}}  className="item_detail_price">
                                                                <div className="item_detail_price_wrap">
                                                                    <GiPriceTag/>
                                                                    <span className="item_detail_price-Num">{price*quanity}</span>

                                                                </div>
                                                                <div className="item_detail_price-discount">
                                                                    <del>${Number(price+(price*10/100))*quanity}</del>
                                                                    <span>|</span>
                                                                    <strong className="item_detail_price"> -10%</strong>
                                                                </div>
                                                            </CardBody>
                                                            <CardBody className="item-remove" onClick={this.handleDeleteCart}>
                                                                        <BsTrash/>
                                                                        <span> Remove</span>
                                                            </CardBody>
                                                        </div>
                                                    </Card>
                                                   
                                                   
                                                    
                                                </div>
                                            
                                           
    </>
    )
}
}