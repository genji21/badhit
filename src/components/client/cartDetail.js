import React from 'react' 
import { GiBackForth, GiPriceTag } from 'react-icons/gi'
import { Card, CardBody, CardImg, Col,Input,Button } from 'reactstrap'
import {Link} from 'react-router-dom'
import { BsTrash } from "react-icons/bs";
import QuanityInput from './common/QuanityInput'
import Swal from 'sweetalert2'
import axios from 'axios'
import Loading2 from './common/loading2'

export default class CartDetail extends React.Component{
    state={
        quanity:1,
        products:{
            id:null,
            name:"",
            image:[]
        },
        stock:0,
        loading:false
    }
    handleChangeQuantity=(data,operator = false)=>{
        if(operator){
            if(this.state.quanity === 1 && data === -1){
              return this.setState({quanity:1})
            }
            return  this.setState({
                quanity:this.state.quanity + data // 
            },async ()=>{       // set lại state cart của store sau khi state input sản phẩm thay đổi
                if(this.state.quanity > this.state.stock) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Không đủ hàng.',
                        text: `Sản phẩm ${this.props.products.name} chỉ còn ${this.state.stock} `,
                      })
                          this.setState({
                              quanity:this.state.quanity-1
                          })
                }
                else {
              await  axios.patch(`http://apishop1.herokuapp.com/products/${this.props.products.id}`,{
                    "stock":(this.state.stock+this.state.quanity)-(data === -1? this.state.quanity-1 : this.state.quanity+1)
                }).then(
                    this.setState({
                        loading:!this.state.loading
                    })
                )
                  await axios.get(`https://apishop1.herokuapp.com/products/${this.props.products.id}`).then(res=>{
                    this.setState({
                        stock:res.data.stock,
                    })
                })
               await this.setState({
                   loading:!this.state.loading
               })
               await  this.props.updateCart(this.props.products.id_cart,this.state.quanity)

            }
            })
            
        }
        // if(data === 0 || data < 0){
        //     return this.setState({quanity:1})
        // }
        // this.setState({
        //     quanity: data
        // },()=>{
        //     this.props.updateCart(this.props.products.id_cart,this.state.quanity)
        // })
        
    }
    handleDeleteCart = async ()=>{

       await  axios.patch(`http://apishop1.herokuapp.com/products/${this.props.products.id}`,{
            "stock":this.state.stock + this.state.quanity
        }).then(
            this.setState({
                loading:!this.state.loading
            })
        )

          await  this.props.deleteCart(this.props.products.id_cart)
          await this.setState({
              loading:!this.state.loading
          })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Xóa ${this.state.quanity} sản phẩm ${this.props.products.name} thành công`,
            showConfirmButton: false,
            timer: 1500
          })
         

          
    }
    componentDidMount(){
        // axios.get(`http://apishop1.herokuapp.com/products/${this.props.products.id}`).then(res=>{
        //     this.setState({
        //         quanity:this.props.products.quanity,
        //         stock:res.data[0]
        //     })
        // })
        this.setState({
            quanity:this.props.products.quanity,
            stock:this.props.products.stock
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
                                                            
                                                               <QuanityInput onChange={this.handleChangeQuantity} value={this.state.quanity}/>
                                                           
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
                                                {this.state.loading?<Loading2/>:""}
                                            
                                           
    </>
    )
}
}