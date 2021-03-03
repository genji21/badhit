import React from 'react'
import {
  CardImg,
  CardLink} from 'reactstrap'
  import Slider from 'infinite-react-carousel';
    import SideBar from './sidebar'
  import '../../../assets/style/home.scss'
import {FaBeer} from 'react-icons/fa'
import Modal from '../common/Modal';
import ModalCart from '../common/ModalCart'
export default class Home extends React.Component{
        state = {
            open : false,
            openCart:false
        }
        
        // xử lý Toggle Modal Search , truyền vào prop của navbar 
        toggleOpen=()=>{
            this.setState({
                open:!this.state.open
                
            })
        }
        toggleOpenCart=()=>{
            this.setState({
                openCart:!this.state.openCart
            })
        }
        // componentDidMount(){
        //     document.querySelector(".toggleModalSearch").addEventListener("click",this.toggleOpen)
            
        //     document.querySelector('.toggleModalCart').addEventListener("click",this.toggleOpenCart)
    
           
           
        // }
        // componentWillUnmount(){
        //     document.querySelector(".toggleModalSearch").removeEventListener("click",this.toggleOpen)
            
        //     document.querySelector('.toggleModalCart').removeEventListener("click",this.toggleOpencart)
    
        // }
        
    render(){
        const settings = {
            duration : 10
        }


        {
            window.onclick=(e)=>{
                if(e.target.id === "over-lay") {
                    this.setState({
                        open:!this.state.open,
                      
                    })
                }
                if(e.target.id ==="over-lay2"){
                    this.setState({
                        openCart :!this.state.openCart
                    })
                }
            }
        }
        return <>
            
             <div id="banner" className={this.state.open || this.state.openCart?"banner active" :""}>
                 <section id="banner_item1 slide">
                    <div className="banner_item1_contaienr">
    
                    <Slider { ...settings } >
                    <div>
                        <img alt="Anh 1" src="https://theme.hstatic.net/1000351433/1000471586/14/slideshow_1.jpg?v=547"></img>
                    </div>
                    <div>
                    <img alt="anh2" src="https://theme.hstatic.net/1000351433/1000471586/14/slideshow_2.jpg?v=547"></img>
                        
                    </div>
                    <div>
                    <img alt="anh3" src="https://theme.hstatic.net/1000351433/1000471586/14/slideshow_3.jpg?v=547"></img>
                        
                    </div>
                    
                    </Slider>
                    </div>
                 </section>
                 <section id="banner_item2">
                    <div className="banner_item2_container">
                        <div className="banner_item2_img">
                            <CardLink  href="#">
                                <CardImg src="https://theme.hstatic.net/1000351433/1000471586/14/slideshow_2.jpg?v=547" alt="" />                            
                            </CardLink>
                        </div>
                    </div>
                 </section>
                 <section id="banner_item3">
                    <div className="banner_item3_container">
                        <div className="banner_item3_img">
                            <CardLink href="#">
                            <CardImg src="https://theme.hstatic.net/1000351433/1000471586/14/banner_index_2.jpg?v=547" alt="" />                            
                            </CardLink>
                        </div>
                    </div>
                 </section>
                 <section id="banner_item4">
                    <div className="banner_item4_container">
                        <div className="banner_item4_img">
                            <CardLink href="#">
                            <CardImg src="https://theme.hstatic.net/1000351433/1000471586/14/banner_index_3.jpg?v=547" alt="" />                        
                            </CardLink>
                        </div>
                    </div>
                 </section>
                 <section id="banner_item5">
                    <div className="banner_item5_container">
                        <div className="banner_item5_img">
                            <CardLink href="#">
                            <CardImg src="https://theme.hstatic.net/1000351433/1000471586/14/banner_index_4.jpg?v=547" alt="" />
                                
                            </CardLink>
                        </div>
                    </div>
                 </section>
            </div>
            <SideBar></SideBar>
            
            {this.state.open?<Modal />:""}
            {this.state.openCart?<ModalCart/>:""}
            </>
    }
    
}