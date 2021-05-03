import Axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import { Col, Container,  FormGroup, Input, Label, Row ,Button, FormText} from 'reactstrap';
import Swal from 'sweetalert2';
import { withFormik, Field,Form, Formik } from 'formik'
import * as Yup from 'yup'
class Signup extends Component {
 
  state = {
    username: '',
    password: "",
    email: "",
    diachi:"",
    phone:"",
    sodienthoai:""
  }

  

   handletest=()=>{
     console.log()
   }
   

  render() {
const regexPass = /^(?=.*[A-Za-z])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const validationSchema =Yup.object().shape({ // Validate form field
            username: Yup.string()
                .required('Username is required')
                .min(5, 'Username must have min 5 characters')
                .max(10, 'Username have max 10 characters'),
                email:Yup.string()
                .required('Email is required')
                .email('Sai Định Dạng Email'),
                phone:Yup.string()
                .min(10,'Yourphone must have min 10 number')
                .max(11,'Phone have max 11 number')
                .typeError("That doesn't look like a phone number"),
                password:Yup.string()
              .required("password is required")
              .matches(regexPass,"Mật Khẩu ít nhât 8 kí tự , bao gồm chữ hoa , thường , số  kí tự đặc biệt")
              ,
              address:Yup.string()
              .required("Không được để trống địa chỉ")
                
        })
      
    return ( <>
      <Container fluid >
      <Row className="login_form_container">
         

          <Col lg="6" md="6" sm="6" xs='6' >
              <div className="form_login-wrapped">
                      <div  className="form_login-title">
                           <h2>Đăng Ký</h2>
                      </div>
              </div>
            
          </Col>
          <Col lg="6" md="6" sm="6" xs='6' >
              <div className="form-input-user">
                     <Formik  validationSchema={validationSchema}  
                           initialValues={{ email: 'jared',password:"",username:"",address:"",phone:""}} 
                            onSubmit={async (values, actions) => {
                              await Axios.post('https://badhit1234.herokuapp.com/sign-in',{...values})
                                  await   Swal.fire({
                                    title:"Đăng ký  thành công",
                                    timer : 2000,
                                    icon:"success"
                                })
                                await Axios.post('https://badhit1234.herokuapp.com/login',{...values}).then(
                                (res)=>{ 
                                  const token=res.data;
                                  window.localStorage.setItem('admin_token',token);
                                  window.localStorage.setItem('user_info',res.config.data)
                                })
                                await  Swal.fire({
                                  title:"Đăng nhập thành công",
                                  timer : 1000,
                                  icon:"success"
                              }).then(()=>{
                                this.props.history.push("/user/profile")
                              })
                               
                                
}}
>                                   
                       {(props) => (
                          <Form onSubmit={props.handleSubmit} >
                          <FormGroup>
                              <Label for="email_register" >Email</Label>
                       <Input name="email" placeholder="Nhập email của bạn" id="email_register"    onChange={props.handleChange}
             onBlur={props.handleBlur}
             value={props.values.email}  
             
             
             
             /> 
                              
                              {props.touched.email && props.errors.email ? (
                              <FormText>{props.errors.email}</FormText>
                            ) : null}
                          </FormGroup>
                          <FormGroup >
                              <Label for="password_register">Mật Khẩu</Label>
                              <Input name="password" type="password" placeholder="Nhập mật khẩu của bạn" id="password_register"    onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}  /> 
                              
                              {props.touched.password && props.errors.password ? (
                              <FormText>{props.errors.password}</FormText>
                            ) : null}
                              
                             
                          </FormGroup>
                          <FormGroup >
                              <Label for="username_register">Họ tên</Label>
                              <Input name="username" placeholder="Nhập họ tên của bạn" id="username_register"    onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.username}  /> 
                              
                              {props.touched.username && props.errors.username ? (
                              <FormText>{props.errors.username}</FormText>
                            ) : null}
                          </FormGroup>
                          <FormGroup >
                              <Label for="address_register">Địa chỉ</Label>
                              <Input name="address" placeholder="Nhập địa chỉ của bạn" id="address_register"    onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.address}  /> 
                              
                              {props.touched.address && props.errors.address ? (
                              <FormText>{props.errors.address}</FormText>
                            ) : null}
                          </FormGroup>
                          <FormGroup >
                              <Label for="phone_register">Số Điện Thoại</Label>
                              <Input name="phone" placeholder="Nhập địa chỉ của bạn" id="phone_register"    onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.phone}  /> 
                              
                              {props.touched.phone && props.errors.phone ? (
                              <FormText>{props.errors.phone}</FormText>
                            ) : null}
                          </FormGroup>
                          <FormGroup>
                              <Button type="submit" color="primary"> Đăng Ký</Button>
                          </FormGroup>
                  </Form>
                       )}
                     </Formik>
              </div>
             
          </Col>
      </Row>
      
            
          
         
        
      </Container>
      </>
    )
  }
}
const mapPropsToValues=()=>{
    return {
        username:'',
        email:'',
        phone:'',
        address:'',
        password:""
    }
}

const mapDispatchToProps = dispatch => ({
  userPostFetch: (userInfo) => dispatch({ 
    type:"userSignUp",
    payload:userInfo})
})
// const FormikForm = withRouter(withFormik({
//   mapPropsToValues
  
//  , validationSchema: Yup.object().shape({ // Validate form field
//       username: Yup.string()
//           .required('Username is required')
//           .min(5, 'Username must have min 5 characters')
//           .max(10, 'Username have max 10 characters'),
//           email:Yup.string()
//           .required('Email is required')
//           .email('Sai Định Dạng Email'),
//           phone:Yup.string()
//           .min(10,'Yourphone must have min 10 number')
//           .max(11,'Phone have max 11 number')
//           .typeError("That doesn't look like a phone number"),
//           password:Yup.string()
//         .required("password is required")
//         .matches(regexPass,"Mật Khẩu ít nhât 8 kí tự , bao gồm chữ hoa , thường , số  kí tự đặc biệt")
//         ,
//         address:Yup.string()
//         .required("Không được để trống địa chỉ")
          
//   }), handleSubmit: async function (values, { setSubmitting })  {
//     // const data =this.props.values
//     console.log(values)
//     await Axios.post('https://badhit1234.herokuapp.com/sign-in',{...values})
//     await   Swal.fire({
//       title:"Đăng ký  thành công",
//       timer : 2000,
//       icon:"success"
//   })
//   await Axios.post('https://badhit1234.herokuapp.com/login',{...values}).then(
//   (res)=>{ 
//     const token=res.data;
//     window.localStorage.setItem('admin_token',token);
//     window.localStorage.setItem('user_info',res.config.data)
//   })
//   await  Swal.fire({
//     title:"Đăng nhập thành công",
//     timer : 1000,
//     icon:"success"
// }).then(()=>{
  
// })
 
//   }
// })(Signup))
export default connect(null, mapDispatchToProps)(withRouter(Signup));