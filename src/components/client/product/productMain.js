import React from 'react'
import "../../../assets/style/productMain.scss"
import { Col, Container, Row } from 'reactstrap'
import ProductList from './productList'
import Modal from '../common/Modal'
import ModalCart from '../common/ModalCart'
export default class ProductsMain extends React.Component{
    state={
        open:false,
        opencart:false,
    }
    toggleOpen=()=>{
        this.setState({
            open:!this.state.open
            
        })
    }
    toggleOpenCart=()=>{
        this.setState({
            opencart:!this.state.opencart
        })
    }

    
    componentDidMount(){
      
       
       
    }
  
  render() {
{
    window.onclick=(e)=>{
        if(e.target.id === "over-lay") {
           this.toggleOpen( )
        }
        if(e.target.id ==="over-lay2"){
            this.toggleOpenCart()

        }
    }
}
      
      return (<>
      <div className={this.state.open || this.state.opencart?"wrapped active" :"wrapped"} >
       
        <ProductList />
       <section className="banenr-end">
                            <Container>
                                <Row>
                                   <Col lg="12" >
                                       <img style={{"width":"100%","height":"100%"}} src="http://theme.hstatic.net/1000351433/1000471586/14/collection_banner.jpg?v=547" alt="" />
                                   </Col> 
                                </Row>
                            </Container>
       </section>
       <footer>

       </footer>
       {this.state.open?<Modal/>:""}
       {this.state.opencart?<ModalCart/>:""}
      </div>
      
    </>)
      }
}