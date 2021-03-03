import React from 'react'
import { FaAddressBook, FaCrown, FaFileInvoice, FaUserAlt } from 'react-icons/fa'
import { Button, Col, Container, CustomInput, FormFeedback, FormGroup, FormText, Input, Label, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { RiLogoutCircleLine } from "react-icons/ri";
import '../../../assets/style/user.scss'
import { Route, Link, withRouter } from "react-router-dom";
import { withFormik,Form, Field } from 'formik'
import * as Yup from 'yup'
import FormikForm from './user_profile'
import DatePicker from 'react-date-picker';
import User_Cart from './user_cart';





class User_Home extends React.Component{
  
state = {
    selectedDate:null,
    img:'',
    username:''
}
    componentDidMount(){
        if(window.location.pathname === "/user" || window.location.pathname === "/user/") {
            window.location.replace("https://badhit1234.herokuapp.com/user/profile");
            // window.localStorage.setItem('user','')
        }
    }
    handleLogout=()=>{
        window.localStorage.removeItem('admin_token')
        window.localStorage.removeItem('user')

        this.props.history.goBack()
    }
    render(){
       
       
        return (<>
        
                <section id="home_user_container">
                    <Container>
                        <Row>
                        <Col lg="4" md="4" sm="12" >
                            <article className="user_navbar">
                                <div className="user_header">
                                    <div className="user_header-info">
                                        <img className="user_avtar" src={this.state.img || "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"}/>
                                        <div className="user_info_detail">
                                            <span>Trường Phi</span>
                                        </div>
                                    </div>
                                </div>
                                <ListGroup>
                                    <ListGroupItem>
                                        <Link to="/user/profile" className="user_menu_info">
                                            <FaUserAlt/>
                                            <span >Hồ sơ của tôi</span >
                                        </Link>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Link to="/user/myorder" className="user_menu_info" >
                                            <FaFileInvoice/>
                                            <span>Đơn Hàng Của Tôi</span>
                                        </Link>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <div className="user_menu_info">
                                            <FaAddressBook/>
                                            <Link  >Sổ Địa Chỉ</Link >
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <div className="user_menu_info">
                                            <FaCrown/>
                                            <Link >Hạng Thành Viên</Link >
                                        </div>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <div className="user_menu_info">
                                            <RiLogoutCircleLine/>
                                            <Link onClick={this.handleLogout} >Đăng Xuất </Link >
                                        </div>
                                    </ListGroupItem>
                                </ListGroup>
                            </article>
                        </Col>

                        
                       
                            <Route exact path="/user/myorder">
                               <User_Cart/>
                            </Route>
                            <Route exact path="/user/profile">
                                <FormikForm/>
                            </Route>
                       

                        </Row>



                    </Container>


                </section>


        </>)
    }
}
// 

export default withRouter(User_Home) 