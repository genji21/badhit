import { render } from '@testing-library/react';
import React from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import clothes from '../../../assets/icons/icon_clothes.svg';
import jewley from '../../../assets/icons/jewley.svg'
import {connect} from 'react-redux';
import '../../../assets/style/search.scss'
import { TiTickOutline } from "react-icons/ti";
import {Link} from 'react-router-dom';
import axios from 'axios'
import Loading from '../../client/common/loading'
import notfound from '../../../assets/images/notfound.png'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Product from '../product/product'
import "../../../assets/style/productMain.scss"

// function ProductItem(props){
//    const {image,price,id,name} = props.product
   
//    const name2=props.product.name.replace(/ /g,"-")
//     return    <>
//      <Col lg="3" md="6">
//          <Link className="linksp" to={`/products/${name2}`} >
//             <Card>
//                  <CardBody>
//                      <LazyLoadImage  effect="blur" style={{"width":"100%","height":"100%"}} src={image[0]}  />
//                         <CardTitle>
//                           {name}
//                         </CardTitle>
//                          <CardText>
//                          {price}$
//                          </CardText> 
//                 </CardBody>
//              </Card>
                                                    
//             </Link>
//          </Col>
//         </>
        
        
// }














class SearchMain extends React.Component{
    
    state={
        loading:false,
        product:[],
        value:"a"
    }
    
    handleClick=(event)=>{
        const url =`https://apishop1.herokuapp.com/products?price_gte=${1}&price_lte=${100}`
        if(event.currentTarget.classList.contains("active")) {
            return false
         }
         else {}
         
        let x = document.getElementsByClassName("price_item")
        for (let i = 0 ; i<x.length;i++){
           x[i].children[0].style.backgroundColor="white"
          x[i].children[0].children[0].style.display="block"
          x[i].classList.remove('active')
        }
        
        // console.log(x[0].children)
        event.currentTarget.children[0].style.backgroundColor ="rgb(33, 176, 150)";
        event.currentTarget.classList.add('active')
       
       const th  =event.currentTarget.dataset.case
       switch(th) {
           case "case1":
            {
                this.setState({
                    product:[],
                    loading:true,
                    
                },()=>{
                    axios.get(`https://apishop1.herokuapp.com/products`).then(res=>{
                        console.log(res.data)
                        const array = res.data.filter(function(item){
                            return item.price < 50
                        })
                      const new_product_array =  array.sort(function(a,b){
                            return parseInt(a.price) - parseInt(b.price);  
                        })
            
                        this.setState({
                            product:new_product_array,
                            loading:false,

                        })
                    })
                })
            }        
               break;
               case "case2":
                   {
                 this.setState({
                    product:[],
                    loading:true,

                },()=>{
                    axios.get(`https://apishop1.herokuapp.com/products`).then(res=>{
                        console.log(res.data)
                        const array = res.data.filter(function(item){
                            return item.price > 100 && item.price < 200
                        })
                      const new_product_array =  array.sort(function(a,b){
                            return parseInt(a.price) - parseInt(b.price);  
                        })
            
                        this.setState({
                            product:new_product_array,
                            loading:false,
                        })
                    })
                })
                   }
               break;

                   case "case3":
                    {
                  this.setState({
                     product:[],
                     loading:true,

                 },()=>{
                     axios.get(`https://apishop1.herokuapp.com/products`).then(res=>{
                         console.log(res.data)
                         const array = res.data.filter(function(item){
                             return item.price > 200 && item.price < 400
                         }) 
                       const new_product_array =  array.sort(function(a,b){
                             return parseInt(a.price) - parseInt(b.price);  
                         })
             
                         this.setState({
                             product:new_product_array,
                             loading:false,

                         })
                     })
                 })
                    }
               break;

                    case "case4":
                        {
                      this.setState({
                         product:[],
                         loading:true,

                     },()=>{
                         axios.get(`https://apishop1.herokuapp.com/products`).then(res=>{
                             console.log(res.data)
                             const array = res.data.filter(function(item){
                                 return item.price > 400 && item.price < 800
                             })
                           const new_product_array =  array.sort(function(a,b){
                                 return parseInt(a.price) - parseInt(b.price);  
                             })
                 
                             this.setState({
                                 product:new_product_array,
                                 loading:false,

                                 
                             })
                         })
                     })
                        }
               break;

                        case "case5":
                            {
                          this.setState({
                             product:[],
                             loading:true,
                         },()=>{
                             axios.get(`https://apishop1.herokuapp.com/products`).then(res=>{
                                 console.log(res.data)
                                 const array = res.data.filter(function(item){
                                     return item.price > 800 && item.price < 1000
                                 })
                               const new_product_array =  array.sort(function(a,b){
                                     return parseInt(a.price) - parseInt(b.price);  
                                 })
                     
                                 this.setState({
                                     product:new_product_array,
                                     loading:false,

                                 })
                             })
                         })
                            }
               break;

                            case "case6":
                            {
                          this.setState({
                             product:[],
                             loading:true,
                         },()=>{
                             axios.get(`https://apishop1.herokuapp.com/products`).then(res=>{
                                 console.log(res.data)
                                 const array = res.data.filter(function(item){
                                     return item.price > 1000
                                 })
                               const new_product_array =  array.sort(function(a,b){
                                     return parseInt(a.price) - parseInt(b.price);  
                                 })
                     
                                 this.setState({
                                     product:new_product_array,
                                     loading:false,

                                 })
                             })
                         })
                            }
                            break;
                            default:
                break;
       }

    }
    componentDidMount(){
        if(this.props.value_name){
            this.setState({
                loading:true,
                value : this.props.value_name
            },()=>{
                axios.get(`https://apishop1.herokuapp.com/products?name_like=${this.props.value_name}`).then(res=>{
                    console.log(res.data)
                    this.setState({
                        product:res.data,
                        loading:!this.state.loading
                    })
                })
            })
           
        }
    }
    componentDidUpdate(){
        if(this.state.value !== this.props.value_name){
            this.setState({
                loading:true,
                value : this.props.value_name
            },()=>{
                axios.get(`https://apishop1.herokuapp.com/products?name_like=${this.props.value_name}`).then(res=>{
                    console.log(res.data)
                    this.setState({
                        product:res.data,
                        loading:!this.state.loading
                    })
                })
            })
        }
    }
    render(){
        return(<>
            <section id="search_product_wrap">
                <div className="search_product_container">
                    <div className="search_product">
                        <Container fluid>   
                            <Row>
                                <Col className="filter_search_product" lg="3" sm="0" >
                                    <h4 to="/products">Sport Shoes</h4>  
                                    <h4>Filter By</h4>
                                    <div className="line">
                                                <hr/>
                                    </div>
                                    <div className="filter_product">
                                        <h5 >Types Product</h5>
                                        
                                        <div className="type_search">
                                            <div className="type_search_clothes">
                                                <img src={clothes}></img>
                                                <span>Trang phục </span>
                                            </div>
                                            <div className="type_search_jewley">
                                                <img src={jewley}/>
                                                <span>Phụ kiện thời trang</span>
                                            </div>
                                            <div className="line">
                                                <hr/>
                                            </div>
                                           
                                            <div className="type_search_price">
                                                <h5>PRICE</h5>
                                                <div data-case="case1" className="price_item " onClick={this.handleClick}>
                                                    <div className="icon_circle">
                                                        <TiTickOutline/> 
                                                    </div>
                                                    <span>Under 100$</span>
                                                </div>
                                                <div data-case="case2" className="price_item " onClick={this.handleClick}>
                                                    <div className="icon_circle">
                                                    <TiTickOutline/> 

                                                    </div>
                                                    <span>100$ to 200$</span>
                                                </div>
                                                <div data-case="case3" className="price_item" onClick={this.handleClick}>
                                                    <div className="icon_circle">
                                                    <TiTickOutline/> 

                                                    </div>
                                                    <span>200$ to 400$</span>
                                                </div>
                                                <div data-case="case4" className="price_item" onClick={this.handleClick}>
                                                    <div className="icon_circle">
                                                    <TiTickOutline/> 

                                                    </div>
                                                    <span>400$ to 800$</span>
                                                </div>
                                                <div data-case="case5" className="price_item" onClick={this.handleClick}>
                                                    <div className="icon_circle">
                                                    <TiTickOutline/> 

                                                    </div>
                                                    <span>800$ to 1000$</span>
                                                </div>
                                                <div data-case="case6" className="price_item" onClick={this.handleClick}>
                                                    <div className="icon_circle">
                                                    <TiTickOutline/> 

                                                    </div>
                                                    <span>Above 1000$</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </Col>
                                <Col className="section_result-search" lg="9" md="12" sm="12">
                                    <Container>
                                        <Row>
                                            <div className="resutl_title">
                                                <h4>Search Result</h4>
                                                        {this.state.product.length ==0 || <span>{this.state.product.length} items   { + this.props.value_name == "" ?"" : `for `+ this.props.value_name.toUpperCase() } </span> }
                                            </div>
                                            
                                        </Row>
                                        <div className="line">
                                                        <hr/>
                                            </div>
                                            <Row>
                                                {this.state.loading?<Loading/>:(this.state.loading || this.state.product.length > 0)  ?  this.state.product.map((product,index)=>{
                                                            return                <Product category={product.category} loading={this.state.loading} key={`$product_${index}`} id={product.id} name={product.name} img={product.image} price={product.price}/>

                                                       }) : <div className="notfound">
                                                            <img src={notfound}/>
                                                            <h3>Sorry, We cannot find any product with your search text or filter options!</h3>
                                                           </div>}

                                                   
                                            </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </section>
         

        </>)
    }
}
const mapStateToProps = (state)=>{
    return {
        value_name : state.value
    }
}
export default connect(mapStateToProps,null)(SearchMain)