import React from 'react'
import {Container ,Row, Spinner } from 'reactstrap'
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
import Swal from 'sweetalert2';
import Loading2 from '../common/loading2'
import Product from '../product/product'

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
        loading2:false,
        stock:0,
        products:[]
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

        axios.get(`https://apishop1.herokuapp.com/products?name_like=${name}`).then(res=>{
            console.log(res.data[0])
            console.log(res)
            this.setState({
                products_detail:res.data[0],
                loading:!this.state.loading,
                stock:res.data[0].stock
            },()=>{
            window.addEventListener('scroll', this.handleScroll);

            })
        }).then( axios.get(`http://apishop1.herokuapp.com/products?category=${this.props.match.params.category}`).then(res=>{
            this.setState({
                products:res.data
            })
        }))
       
      };
      

    
      
     
      
      handleScroll(event) {
        if(window.scrollY>143){
            document.querySelector(".image_left").style.top="-10%"
        }
        else if(window.scrollY<143){
            document.querySelector(".image_left").style.top="20%"
            
        }
        else if(window.scrollY > 1300) {
            console.log(window.scrollY)
        }
        console.log(window.scrollY)
      };
   

     handleAddToCart= async (event)=>{
        event.preventDefault();
        const stock = this.state.stock

         const user = window.localStorage.getItem('user_info')
         const id_user = window.localStorage.getItem('id_user')
         console.log(this.state.products_detail.stock)
         if(!user){
            window.location.pathname ="/account/login"
        }
        else {
            if(this.state.quanity > stock) {
                // await  axios.patch(`https://apishop1.herokuapp.com/products/${this.state.products_detail.id}`,{
                //     "stock":0
                // }).then(
                //     this.setState({
                //         loading2:!this.state.loading2
                //     })
                // )
                Swal.fire({
                    icon: 'error',
                    title: 'Không đủ hàng.',
                    text: `Sản phẩm chỉ còn ${stock} `,
                  })
            //    this.setState({
            //        loading2:!this.state.loading2
            //    })   
       
            }
            else if(this.state.quanity <= stock) {
               
                await  axios.patch(`https://apishop1.herokuapp.com/products/${this.state.products_detail.id}`,{
                    "stock":stock-this.state.quanity
                }).then(
                    this.setState({
                        loading2:!this.state.loading2
                    })
                )
                await axios.get(`https://apishop1.herokuapp.com/products/${this.state.products_detail.id}`).then(res=>{
                    console.log(res.data.stock)
                    this.setState({
                        stock:res.data.stock,
                        products_detail:res.data
                    })
                })
              await   Swal.fire({
               position: 'top-end',
               icon: 'success',
               title: `bạn vừa thêm ${this.state.quanity} sản phẩm`,
               showConfirmButton: false,
               timer:1000
             }).then(
                 this.setState({
                     loading2:!this.state.loading2
                 })
             )
                await  this.props.addToCart({
                       ...this.state.products_detail
                   },
                     this.state.quanity,id_user,this.state.products_detail.id)
               }
            }
          
       
      }
    

      componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
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
               {this.state.loading2?<Loading2/>:""}

            </section>
             :<Loading/>}  
                      {/*section product lien quan   */}
            <section style={{"marginTop":"50px"}} id ="section_product_lq">
                <Container fluid>

                    <Row>
                           {/*product  */}
                           {/* <div  style={{"position":"absolute","left":"50%","bottom":0}}>
                        {this.state.products.map((product,index)=>{
                                return (
                                    <Product category={product.category} loading={this.state.loading} key={`$product_${index}`} id={product.id} name={product.name} img={product.image} price={product.price}/>
                            
                                )
                           })}
                        </div>
                            */}
                    </Row>
                </Container>
                
                
                </section>          
                 {/* {this.state.open?<Modal/>:""} */}
                {/* {this.state.opencart?<ModalCart/>:""} */}
        
        
        </>

        )
    }
}
const mapDispathtoProps = (dispath) =>{
//store .dispath
return {
    addToCart : (product,quanity,id_user,idproduct)=>{
        dispath({
            type:"ADD_TO_CART",
            payload:{
                ...product,
                quanity,id_user,idproduct
            }
        })
    }
}
}
export default  connect(null,mapDispathtoProps)(withRouter(ProductDetail))