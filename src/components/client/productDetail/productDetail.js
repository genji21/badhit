import React from 'react'
import {Container ,Row } from 'reactstrap'
import '../../../assets/style/productdetail.scss'
import ModalCart from '../common/ModalCart';
import Modal from '../common/Modal';
import ImageContainer from './imageContainer/imageContainerLeft';
import ImagecontainerMid from './imageContainerMid/imageContainer';
import ProductDetailForm from './productDetailForm';
import axios from 'axios'
import Loading from '../common/loading';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import Breadcum from '../common/Breadcrumbs';

class ProductDetail extends React.Component {
    
    state={
        products_detail:{
            id:null,
            name:"",
            image:[]
        },
        quanity:1,
        loading:false,
        open:false,
        opencart:false,
        
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

    handleChangeQuantity=(data,operator = false)=>{
        if(operator){
            if(this.state.quanity === 1 && data === -1){
                return this.setState({quanity:1})
              }
            return this.setState({
                quanity:this.state.quanity + data
            })
        }
        if(data === 0 || data < 0){
            return this.setState({quanity:1})
        }
        this.setState({
            quanity: data
        })
    }
     

    componentDidMount() {
       console.log()

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
        const name = this.props.match.params.name.replace(/-/g," ")

        axios.get(`https://badhit1234.herokuapp.com/products?name_like=${name}`).then(res=>{
            console.log(res.data[0])
            console.log(res)
            this.setState({
                products_detail:res.data[0],
                loading:!this.state.loading
            },()=>{
            window.addEventListener('scroll', this.handleScroll);

            })
        })
      };
      

    
      
     
      
      handleScroll(event) {
        if(window.scrollY>143){
            document.querySelector(".image_left").style.top="-10%"
        }
        else if(window.scrollY<143){
            document.querySelector(".image_left").style.top="20%"
            
        }
      };
   

      handleAddToCart=(event)=>{
         event.preventDefault();

            this.props.addToCart({
                ...this.state.products_detail,
            },
            this.state.quanity)

      }
      componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
        // document.querySelector(".toggleModalSearch").removeEventListener("click",this.toggleOpen);
        // document.querySelector('.toggleModalCart').removeEventListener("click",this.toggleOpenCart);

      }
    render(){
       
        return( <>
        <section id="category-list" style={{"textAlign":"left"}} >
         
            <Breadcum url={window.location.pathname} />
        </section>
        {this.state.loading ? 
        <section  style={{"marginTop":"50px"}} id="section-product-detail">
                <Container fluid>
                    <Row>
                        {/* Image Container */}
                        
                        <ImageContainer product={this.state.products_detail}/>
                       
                       {/* Image Container Mid */}
                       <ImagecontainerMid product={this.state.products_detail}/>

                       {/* Image Container Form */}
                        <ProductDetailForm value={this.state.quanity} changeInput = {this.handleChangeQuantity} addToCart={this.handleAddToCart} toggleCart={this.toggleOpenCart} product={this.state.products_detail} />
                    </Row>
                </Container>
               
            </section>
             :<Loading/>}           
                 {/* {this.state.open?<Modal/>:""} */}
                {/* {this.state.opencart?<ModalCart/>:""} */}
        
        
        </>

        )
    }
}
const mapDispathtoProps = (dispath) =>{
//store .dispath
return {
    addToCart : (product,quanity)=>{
        dispath({
            type:"ADD_TO_CART",
            payload:{
                ...product,
                quanity
            }
        })
    }
}
}
export default  connect(null,mapDispathtoProps)(withRouter(ProductDetail))