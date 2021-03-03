import React ,{useState} from 'react'
import { Button, Card, CardBody, CardText, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import Modal from './common/Modal'
import ModalCart from './common/ModalCart'
import '../../assets/style/checkout.scss'
import { FaRegAddressBook, FaUserAlt } from 'react-icons/fa'
import { MdPayment } from "react-icons/md";
import address from '../../assets/images/address.png'
import checkout from '../../assets/images/checkout.svg'
import {connect} from 'react-redux'

import { TiTickOutline } from "react-icons/ti";
import Axios from 'axios'
import Swal from 'sweetalert2'
class ModalAddress extends React.Component{
state={
    name:"",
    address:"",
    phone:""    
}
handleChange=(event)=>{
    this.setState({
     [event.target.name]: event.target.value
    })

 }
 handleSubmit=(event)=>{
    event.preventDefault();
    const {name,address,phone}=this.state
    if(this.props.editingAddress){
        console.log("update product")
        this.props.updateAddress(name,address,phone)
    }
    else {
        this.props.addAdress(name,address,phone)
        console.log("create product")
    }

    this.props.handleClick();

}
componentDidMount(){
    if(this.props.editingAddress){
        const {name,address,phone} =  this.props.editingAddress
        console.log("MODAL EDIT")
        this.setState({
            name,
            address,
            phone
        })
    }else{
        console.log("MODAL CREATE")
    }

}
componentWillUnmount(){
    this.props.clearIsEditing()
}
render(){
    const {name,address,phone} = this.state
    return <>
    <div className="address_modal-container">
       <div className="address_item">
           <Form className="form-address_modal" onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" value={name} onChange={this.handleChange} name="name" id="name" placeholder="Nhap name"/>
                </FormGroup>
                <FormGroup>
                    <Label for="address">Address</Label>
                    <Input type="text" value ={address} onChange={this.handleChange}  name="address" id="address" placeholder="Nhap dia chi"/>
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="number" value={phone} onChange={this.handleChange} name="phone" id="phone" placeholder="Nhap so dien thoai"/>
                </FormGroup>
                <div className="form-button">
                    <Button className="btn-cancel" onClick={this.props.handleClick}>Cancel</Button>
                    <Button color="primary"  className="btn-add">Add</Button>
                </div>
           </Form>
       </div>
    </div>
</>
}

}


// component Address Item

function UserAddress(props){
    const {address,name,phone} = props.addAdress;
    const handleUpdate =()=> {
        props.updateIsEditting(props.addAdress.id)
    }
    const handleUseAddress= async()=>{
        
        // console.log({...props.addAdress})
      const cart_item = window.localStorage.getItem('cart')
      const cart_item_final = JSON.parse(cart_item)
      console.log(cart_item_final)
      const user_cart_final = {
        address,name,phone, cart_list:cart_item_final,
        "id_cart":Date.now(),
        "date_cart":new Date()
      }
     await Axios.post("https://badhit1234.herokuapp.com/cart",{...user_cart_final}).then(res=>{
        Swal.fire({
            title:"Đặt Hàng Thành Công ",
            timer : 1000,
            icon:"success"
        })
        props.completeCart();
        props.handleStep()
      }).catch(()=>{
        Swal.fire({
            title:"Đặt Hàng Thất Bại ",
            timer : 1000,
            icon:"error"
        })
      })
     
    }
    const handleClick=(event)=>{
        console.log(event.currentTarget)
        const x = event.currentTarget
        console.log(x.children[3])
        const z= x.children[4]
        const d = x.children[3]
        const y = document.querySelectorAll(".card_address")
        for(let i =0 ; i<y.length;i++) {
            y[i].classList.remove('active')
            y[i].children[4].style.display="none"
            y[i].children[3].style.display="none"

        }
        x.classList.add('active')        
        z.style.display ="flex"
        d.style.display="flex"
    }
    return(<> <Card className="card_address" onClick={handleClick}>
                    <CardText className="user_name">
                        {name}
                    </CardText>
                    <CardText className="user_address">
                    Address:  {address}
                    </CardText>
                <CardText className="Phone-number">Phone number :{phone}</CardText>
                     <CardBody className="user-button">
                        <Button color="primary" className="user_btn-addres" onClick={handleUseAddress}>Use this address </Button>
                        <Button color="primary" className="user_btn-addres" onClick={handleUpdate}>Edit </Button>

                    </CardBody>
                    <div className="card_active">
                        <TiTickOutline/>
                    </div>
    </Card>
                            


    </>
    )
}





















class Checkout extends React.Component{
    state={
        open:false,
        opencart:false,
        openAddress:false,
        addressItem : [
        ],
        isEdit:undefined,
        step:1
    }
    toggleOpen=()=>{
        this.setState({
            open:!this.state.open
            
        })
    }
    toggleOpenCart=(event)=>{
        
        this.setState({
            opencart:!this.state.opencart
        })
    }
    toggleModelAdress=()=>{
        this.setState({
            openAddress:!this.state.openAddress
        })
    }
    handleStep=()=>{
        this.setState({
            step:!this.state.step
        })
    }
    componentDidMount() {
        const token=window.localStorage.getItem('admin_token');
        if(!token){
            window.location.pathname ="/account/login"
        }
        // document.querySelector(".toggleModalSearch").addEventListener("click",this.toggleOpen);
        
        // document.querySelector('.toggleModalCart').addEventListener("click",this.toggleOpenCart);
        // window.onclick=(e)=>{
        //     if(e.target.id === "over-lay") {
        //        this.toggleOpen( )
        //     }
        //     if(e.target.id ==="over-lay2"){
        //         this.toggleOpenCart()
    
        //     }
        // }
        
        // console.log(this.state.address.length)
        
        
    
    }
    addAddress=(name,address,phone)=>{
        const adressItem={
            id:this.state.addressItem.length,
            name,
            address,
            phone
        }
        this.setState({
            addressItem:[...this.state.addressItem,adressItem]
        })

    }



    // lấy ra vị trí address mà bạn muốn edit trong checkout , sau đó sẽ truyền xuống Modal form address đó 
    updateIsEditting=(id) => {
        const address_index = this.state.addressItem.findIndex((address)=>{
            return address.id === id
        })
        this.setState({
            isEdit:address_index
        })
        this.toggleModelAdress()
    }

    // thực hiện update
    updateAddress = (name,address,phone) => {
        const new_address = [...this.state.addressItem];
        console.log(new_address)
        console.log(new_address[this.state.isEdit])
        new_address[this.state.isEdit]={
            
            name,
            address,
            phone
        }
        console.log(new_address[this.state.isEdit])
        this.setState({
            addressItem:new_address
        },()=>{
            console.log(this.state.addressItem)
        })
    }
    // clear
    clearIsEditing = () => {
        this.setState({
            isEdit:undefined
        })
    }
    render(){
        return (<>
                <section id="checkout">
                    <Container >
                        <div className="progess-payment-wrapped">
                            <div className="lines_process">
                                <div className="line active"></div>
                                <div className={this.state.step == 1 ? "line " : "line active"}></div>
                                <div className="icon-wrap">                                
                                        <div className="icon-user-login active">
                                            <FaUserAlt/>
                                            <h3>Login</h3>
                                        </div>
                                        <div className="icon-user-address active">
                                            <FaRegAddressBook/>
                                            <h3>Address</h3>
                                        </div>
                                        <div className={this.state.step == 1 ?"icon-user-payment" :"icon-user-payment active"}>
                                            <MdPayment/>
                                            <h3>Payment</h3>
                                        </div>
                                </div>                      
                            </div>
                        </div>
                        <div className="hr">
                            <hr/>
                        </div>
                        {this.state.step == 1 ?<div className="address-user-wrapped">
                        <h4> Choose your address below</h4>   
                           
                            {this.state.addressItem.length == 0 ?<img style={{"width":"100%","height":"50%"}} src={address}/>  :
                            this.state.addressItem.map((address,index)=>{
                               return <>
                                <UserAddress completeCart={this.props.completeCart} handleStep={this.handleStep} updateIsEditting={this.updateIsEditting} addAdress={address} key={"addres-" +Number(index+1)} index={index} toggleModelAdress={this.toggleModelAdress}> </UserAddress>
                                </>
                            })}
                            <div className="btn_add">
                                <Button className="add" onClick={this.toggleModelAdress}>
                                    Your Address Information
                                </Button>
                            </div>
                        </div> : <div className="checkout_success" style={{"display":"flex"}}>
                                    <img style={{"width":"50%"}} src={checkout}/>
                                    <div style={{"display": "flex",
                                    "alignItems": "center"}}>
                                        <h2>Thanks For Shopping . Have a Good Day</h2>

                                    </div>
                            
                                </div>}
                    </Container>
                </section>
                {this.state.openAddress?<ModalAddress clearIsEditing={this.clearIsEditing} updateAddress={this.updateAddress} editingAddress={this.state.addressItem[this.state.isEdit]}   addAdress={this.addAddress} handleClick={this.toggleModelAdress} />:""}
        </>)
    }
}
const mapDispathToProps = dispatch =>{
    return {
        completeCart:(user_info)=>{
            dispatch({
                type : "COMPLETE_CART",
                payload:{
                    ...user_info
                }
            })
        }
    }
}
export default connect(null,mapDispathToProps)(Checkout)   