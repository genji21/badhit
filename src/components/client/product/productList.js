import React,{useState} from 'react'
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row, Spinner } from 'reactstrap'
import Product from './product'
import axios from 'axios'
import { CgArrowLongLeft,CgArrowLongRight } from "react-icons/cg";
import Loading from '../common/loading'
import Skeleton from 'react-loading-skeleton';
import { Link, withRouter } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {connect} from 'react-redux'

import Breadcum from '../common/Breadcrumbs'
import { number } from 'yup';
function Pagination(props){
    const {page,textfilter} = props
    const [state,setState] = useState(page)
     const handleCLick=(data,event)=>{
         if(event.currentTarget.classList.contains("test")){
            console.log(event.currentTarget)
                console.log(Number(event.currentTarget.innerText))
                const number = Number(event.currentTarget.innerText)
                props.window.push(`/products/${props.category}/?page=${number}`)
                props.handlePage()
            


            //  })
         }
         else  {
            props.window.push(`/products/${props.category}/?page=${page+data}`)
            props.handlePage()

         }
            //  console.log(event.currentTarget.classList.contains("arrow-back"))
            //  props.changePage(-1,operator=true)
        //  setState(state-1)
        // if(event.currentTarget.classList.contains("test")){

        //     console.log(event.currentTarget)
        //     if(state == data ) {

        //         return false
        //      }
        //      else {   
        //          props.changePage(data,operator=false)

        //          setState(data)
        //     props.window.history.replace(props.window.location.pathname+`?page=${data}`)

        //      }

        // }
        //     else {
        //         props.changePage(data,operator=true);
        //         setState(state+data)
        //     props.window.history.replace(props.window.location.pathname+`?page=${state+data}`)

        //     }
     }
     const limit_page = Math.ceil(props.productRow/12); // moi trang co 12 product ,thi tong so gioi hang trang se la product /12 lam tron 
     console.log("limit_page "+limit_page)
    //  chuyen sang array de map 
    const new_array_limitpage = Array.from(String(limit_page),Number)
    // console.log(new_array_limitpage)
    const new_arr = []
    // có mảng , tìm ra các phần tử nhỏ hơn và push vào mảng mới
    for ( let i = 1 ; i<=new_array_limitpage[0];i++){
        new_arr.push(i)
    }
    // console.log(new_arr)
    return <>
    <div className="section_page">
        <div className="pageniation_icon-wrap">
           
            
            
           
            <CgArrowLongLeft  visibility={page==1?"hidden":""}  onClick={(event)=>{handleCLick(-1,event)}} className="arrow-back" />
            {new_arr.map((page_item)=>{
                return <span  className={page==page_item?"active":"test"} style={{pointerEvents:page==page_item?"none":""}}  onClick={(event)=>{handleCLick(page_item,event)}}>{page_item}</span>
            })}   
            <CgArrowLongRight  visibility={page==limit_page?"hidden":""}  className="arrow-next" onClick={(event)=>{handleCLick(1,event)}}/>
        </div>
    </div>
    </>
}
 class ProductList extends React.Component{
    state={
        products:[],
        isSubmitted: false,
        loading:false
    }
    componentDidMount(){
        let textCata = this.props.match.params.category
         let number_page = Number(this.props.location.search.replace(/[^0-9]/g,""))

        let products_sub
        window.addEventListener('popstate',this.showProductsPrevious)

        this.mounted=true
        // neu la product total thi khong search , khong page va 
        this.setState({
            loading:true
        })
        axios.get(`https://apishop1.herokuapp.com/products`).then(res=>{
            this.props.getAllProducts(res.data)
        })  
       if(this.props.location.search === '') {
           axios.get(`https://apishop1.herokuapp.com/products${textCata=='allproduct'?'':'?category='+textCata}`).then(res=>{
               textCata=='allproduct'?this.props.getProductsItem(res.data.slice(0,12)):this.props.getProductsItem(res.data)
               this.setState({
                   loading:false
               })
           })
       }
       else {
         
        axios.get(`https://apishop1.herokuapp.com/products${textCata=='allproduct'?('?_page='+number_page):'?category='+textCata+'&_page='+number_page}`).then(res=>{
        this.props.getProductsItem(res.data)
        this.setState({
                 loading:false
             })
         })
       }
    }
    componentWillUnmount(){
        console.log("product unmount")
        this.mounted = false
        window.removeEventListener('popstate',this.showProductsPrevious,false
        )
    }
   componentDidUpdate(prevProps,prevState){
    const textCata = this.props.match.params.category
   const number_page = Number(this.props.location.search.replace(/[^0-9]/g,""))
    
    if(this.mounted && this.state.isSubmitted){
        this.setState({
            loading:true
        })
        if(this.props.location.search === '') {
            axios.get(`https://apishop1.herokuapp.com/products${textCata=='allproduct'?'':'?category='+textCata}`).then((res)=>{
            
                this.props.getProductsItem(res.data)
                this.setState({
                    loading:!this.state.loading
                })
            })
            this.setState({
                isSubmitted:!this.state.isSubmitted,
            })
        }
        else {
            const page_number = this.props.location.search.replace(/[^0-9]/g,"")
            axios.get(`https://apishop1.herokuapp.com/products${textCata=='allproduct'?('?_page='+page_number):'?category='+textCata+'&_page='+page_number}`).then((res)=>{
                console.log(res.data)
                this.props.getProductsItem(res.data)
                this.setState({
                    loading:!this.state.loading
                })
            })
            this.setState({
                isSubmitted:!this.state.isSubmitted,
                // loading:false       
            })
        }
     }

   }
   
   showProductsPrevious=()=>{
    const textCata = this.props.match.params.category
    const number_page = Number(this.props.location.search.replace(/[^0-9]/g,""))
    this.setState({
        loading:true
    })
    if(this.props.location.search === '') {
        axios.get(`https://apishop1.herokuapp.com/products${textCata=='allproduct'?'':'?category='+textCata}`).then((res)=>{
            
            this.props.getProductsItem(res.data)
            this.setState({
                loading:false
            })
        })
    }
    else {
        axios.get(`https://apishop1.herokuapp.com/products${textCata=='allproduct'?('?_page='+number_page):'?category='+textCata+'&_page='+number_page}`).then((res)=>{
            console.log(res.data)
            this.props.getProductsItem(res.data)
            this.setState({
                loading:!this.state.loading
            })
        })
       
    }
           
   }


    showProductItem = (products, textFilter) => {
            var productsTmp;
            // if(textFilter == 'allproduct') {
            //     console.log("test")
            //     products = this.props.products_total.slice(0,12);
            // }
            return (
                products.map((product,index)=>{
                    return (
                        <Product category={product.category} loading={this.state.loading} key={`$product_${index}`} id={product.id} name={product.name} img={product.image} price={product.price}/>
                        
                    )
                })
            )
    }
    




    handleName(data){
        if(data == 'all'){
           
     var result =  data.replace('all','all product')
        }
        // // data == 'all'?this.setState({category:"ALL PRODUCT"}) :""
        else if( data === 'aothun'){
            var    result = data.replace('aothun','T-SHIRT GRAPHIC')
        }
        else if(data == 'paint') {
            var  result = data.replace('paint','SHORT & PAINT')
        }
        else {
            var result = data
        }
        return result
    }

    handlePage=()=>{
        this.setState({
            isSubmitted:!this.state.isSubmitted
        })
    }

       changeCategory=  (event)=>{
       
       this.setState({
           isSubmitted:!this.state.isSubmitted
       })
       }

   
    handleChangePage=()=>{
        this.props.changePage(this.state.page)
    }
   
    render(){
        var { products ,match,products_total} = this.props;
        var textFilter =this.props.match.params.category
        const nameCategory  = this.props.match.params.category 

        var number_page
        if(this.props.location.search === '') {
            number_page = 1
        }
        else {
            number_page = Number(this.props.location.search.replace(/[^0-9]/g,""))

        }
        const products_page =  textFilter === 'allproduct' ?products_total : products_total.filter(product=>{
            return product.category === textFilter
        })
            return (<>
                <section id="category-list" style={{"textAlign":"left"}} >
                   <Breadcum category={this.state.category} url={window.location.pathname} />
               </section>
                 <section id="main-product">
                   <h2>{this.handleName(nameCategory)}</h2>
                   <div className="category-product">
                      <Container >
                          <Row className="category-row">
                               <Col data-category = "all"  style={{pointerEvents:this.state.loading?"none":""}}  onClick={this.changeCategory} lg="2" md={12} sm={12}>
                                   <Link to="/products/allproduct">All Product</Link></Col>
                               <Col data-category ="aothun"  style={{pointerEvents:this.state.loading?"none":""}}  onClick={this.changeCategory} lg="1" md={12} sm={12}>
                                   <Link to="/products/aothun">T-Shirt</Link>
                               </Col>
                               <Col  data-category="hoddie"  style={{pointerEvents:this.state.loading?"none":""}}   onClick={this.changeCategory} lg="2" md={12} sm={12}>
                               <Link to="/products/hoddie">Hoddie-Sweater</Link>
                               </Col>
                               <Col  data-category="accessories"   style={{pointerEvents:this.state.loading?"none":""}}  onClick={this.changeCategory}  lg="1" md={12} sm={12}>
                               <Link to="/products/accessories">Accessories</Link>
                                   </Col>
                               <Col data-category="paint"  style={{pointerEvents:this.state.loading?"none":""}}  onClick={this.changeCategory} lg="1" md={12} sm={12}>
                               <Link to="/products/paint">Short/Paint</Link></Col>
                               <Col data-category="jacket"  style={{pointerEvents:this.state.loading?"none":""}}   onClick={this.changeCategory} lg="1" md={12} sm={12}>
                               <Link to="/products/jacket">jacket</Link></Col>
                          </Row>
       
                      </Container>
                   </div>
                   <Container fluid>
       
                       <Row>
                        {this.state.loading?<Loading/>:this.showProductItem(products,textFilter)}
                       </Row>
                   {products.length>0?  <Pagination productRow={products_page.length} handlePage={this.handlePage}  category={textFilter} window={this.props.history} page={number_page} />:''}
                   </Container>
               </section>
           </>)
        
        }
       
}
const mapState=(state)=>{
    return {
        products_total:state.products_total,
        products: state.products
    }
}
const mapDisPatch=(dispatch)=>{
    return {
      
      
        getAllProducts:(products)=>{
            dispatch({
                type:'getAllProducts',
                payload:products
            })
        },
        getProductsItem:(products)=>{
            dispatch({
                type:'getPageProducts',
                payload:products
            })
        }
        
    }
}
export default connect(mapState,mapDisPatch)(withRouter(ProductList))