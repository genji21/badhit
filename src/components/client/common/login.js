
import React from 'react';
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import {Link} from 'react-router-dom'
import '../../../assets/style/login.scss'
import Modal from './Modal';
import ModalCart from './ModalCart';
import Axios from 'axios';
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import Breadcum from './Breadcrumbs';
class Login extends React.Component {
    state = {
        email:"",
        password:"",
       
    }
    
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleLogin=(event)=>{
        event.preventDefault()
        Axios.post('https://badhit1234.herokuapp.com/login',{
           ...this.state
        }).then(res=>{
            console.log(res.data)
            console.log(res)
            
            const token=res.data;
            window.localStorage.setItem('admin_token',token);
            window.localStorage.setItem('user_info',res.config.data)
            // window.localStorage.setItem('user_token',token);

            Swal.fire({
                title:"Đăng nhập thành công",
                timer : 1000,
                icon:"success"
            })
        }).then(()=>{
            this.props.userLogin({...this.state})
            
            this.props.history.push('/user/profile')
        }).catch(err=>{
            console.log(err)
            Swal.fire({
                title:"Đăng nhập thất bại",
                timer : 1000,
                icon:'error'
            })
        })
       
    }
    componentDidMount() { 
     
        // khi trang hiển thị , kiểm tra có token chưa , nếu có token => admin hoặc trang thanh toán , nếu ko ở im trang này 
        const admin_token = window.localStorage.getItem('admin_token');
        if(admin_token){
            this.props.history.push('/user/profile')
        }
      };
    render()
    {
        return (<>
                <Container fluid >
                <Row className="login_form_container">
                   

                    <Col lg="6" md="6" sm="6" xs='6' >
                        <div className="form_login-wrapped">
                                <div className="form_login-title">
                                     <h2>Đăng Nhập</h2>
                                </div>
                        </div>
                      
                    </Col>
                    <Col lg="6" md="6" sm="6" xs='6' >
                        <div className="form-input-user">
                                <Form onSubmit={this.handleLogin}>
                                        <FormGroup>
                                            <Label for="email" >Email</Label>
                                            <Input type="email" onChange={this.handleChange} id="email" name="email" placeholder="Nhập email của bạn"/>
                                        </FormGroup>
                                        <FormGroup >
                                            <Label for="password">Mật Khẩu</Label>
                                            <Input type="password" onChange={this.handleChange} id="password" name="password" placeholder="Nhập mật khẩu"/>
                                        </FormGroup>
                                        <FormGroup>
                                            <Button color="primary"> Đăng Nhập</Button>
                                            <span>Bạn chưa có tài khoản , đăng kí  <Link to="/account/register"> Tại Đây</Link></span>
                                        </FormGroup>
                                </Form>
                        </div>
                       
                    </Col>
                </Row>
                
                      
                    
                   
                  
                </Container>
             
        
        
        </>

           
            
            )
        }
}
const mapDispatchToProps = dispatch =>({
    userLogin : (userinfo)=>{
        dispatch ({
            type:"userLogin",
            payload:userinfo
        })
    }
})
const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})
export default  connect(null,mapDispatchToProps)(withRouter(Login))