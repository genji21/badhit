import React from 'react'
import { Button, Col, Container, CustomInput, FormFeedback, FormGroup, FormText, Input, Label, ListGroup, ListGroupItem, Row } from 'reactstrap'
import { RiLogoutCircleLine } from "react-icons/ri";
import '../../../assets/style/user.scss'
import { Route, Link } from "react-router-dom";
import { withFormik,Form, Field } from 'formik'
import * as Yup from 'yup'





class User_Profile extends React.Component{
  
state = {
    selectedDate:null,
    img:'',
    username:''
}
    componentDidMount(){
        if(window.location.pathname === "/user" || window.location.pathname === "/user/") {
            window.location.replace("/user/profile");
            window.localStorage.setItem('user','')
        }
        if(window.localStorage.getItem('user_info')) {
            this.props.values.username  = JSON.parse(window.localStorage.getItem('user_info')).username
            this.props.values.email  = JSON.parse(window.localStorage.getItem('user_info')).email
            this.props.values.phone  = JSON.parse(window.localStorage.getItem('user_info')).sodienthoai
            this.state.selectedDate = JSON.parse(window.localStorage.getItem('user_info')).date_birth
        }
    }
 
 handleFile = (e) => {
    const content = e.target.result;
    console.log('file content',  content)
    // You can set content in state and show it in render.
  }
 handleChangeFile = (event) => {
    var files = event.target.files;
 
    var file = files[0];
    var fileReader = new FileReader();

    fileReader.onload= (event)=>{
        var url = fileReader.result;
        this.setState({
            img:url
        })
    }
     fileReader.readAsDataURL(file)
    document.querySelector('.custom-file').style.width="100%"
    document.querySelector('.img_user-result').style.display="block"
}
 ButtonCancel=(e)=>{   
     const form_user = document.querySelector(".form-user")
   const inputs = form_user.querySelectorAll('input')
   inputs.forEach((input)=>{
       console.log(input.name)
       input.value=""
   })
   this.props.values.username=""
}
ButtonSubmit=(e)=>{
    if (this.props.errors.hasOwnProperty('username') || this.props.errors.hasOwnProperty('email') || this.props.errors.hasOwnProperty('phone') ) {
        console.log('errror')
        return false
    }
    else {
        window.localStorage.setItem('user_info',JSON.stringify({'username':this.props.values.username,
        'email':this.props.values.email,
        'phone':this.props.values.phone,
        'date_birth':this.state.selectedDate
           }))
           console.log('success')     
    }  
}   
    render(){
        return (<>
        <Col lg="8" md="8" sm="12" >
            <article className="user_detail-info">
            <div>
            <h3 className="use_detail-title">
                Hồ Sơ Của Tôi 
            </h3>
            </div>
            <div className="form-user">
                <Form>
                <FormGroup >
                <Label for="name_user" >Họ Và Tên</Label>
                <Field
                    name='username'
                    render={({field}) => (
                        <Input placeholder="Nhập họ tên của bạn" {...field} touched={this.props.touched.username} value={this.props.values.username} onChange={this.props.handleChange}  fullWidth  />
                     )} /> 
             
              {this.props.touched.username && <FormText>{this.props.errors.username}</FormText> }
                </FormGroup>
                <FormGroup  >
                    <Label for="email_user"> Email</Label>
                    <Field name="email">{({field }) => <Input placeholder="Nhập email của bạn"   fullWidth {...field} value={this.props.values.email} /> }</Field>
                   
                    {this.props.touched.email && <FormText>{this.props.errors.email}</FormText> }

                </FormGroup>
                <FormGroup>
                    <Label for="phone_user">Số Điện Thoại</Label>
                    <Field
                    name='phone'
                    render={({ field }) => (
                        <Input type="number"  placeholder="Nhập số điện thoại của bạn" fullWidth {...field} value={this.props.values.phone || window.localStorage.getItem('user') && JSON.parse(window.localStorage.getItem('user')).phone} />
                    )} />
                    {this.props.touched.phone && <FormText>{this.props.errors.phone}</FormText> }
                </FormGroup>
                <FormGroup>
                    <Label for="date_birth">Ngày Sinh</Label>
                    <div>
                    <input value={this.state.selectedDate} className="date_birth" name="date_birth"
                    type="text"
                    onFocus={
                    (e)=> {
                    e.currentTarget.type = "date";

                    e.currentTarget.placeholder = "";
                    }
                    }
                    onBlur={
                    (e)=>{e.currentTarget.type="text"
                    if(e.currentTarget.type ='date') {
                    console.log(e.currentTarget.value)
                    this.setState({
                    selectedDate:e.currentTarget.value
                    })
                    } }}
                    placeholder="Nhập ngày sinh của bạn"
/>
                 </div>
                </FormGroup>
                <FormGroup>
                   <div> <Label>Giới Tính</Label> </div>
                   <div className="gender-form-user">
                       <div className="gender_user">
                            <Label for="male"> Nam</Label>
                            <Input  type="radio" name="gender" id="male"/>
                       </div>
                    <div className="gender_user">
                        <Label for="female"> Nữ</Label>
                        <Input type="radio" name="gender" id="female"/>
                    </div>
                   </div>
                </FormGroup>
                <FormGroup>
                    <p>Ảnh Đại Diện</p>
                    <CustomInput onChange={this.handleChangeFile} label="Chọn Ảnh" name="avtar_user" type="file" id="exampleCustomFileBrowser" name="customFile" />
                </FormGroup>
                <div className="img_user-result">
                        <img src={this.state.img}/>
                 </div>
                 <FormGroup>
                  <div className="user_button">
                        <Button onClick={this.ButtonCancel}>Hủy Bỏ </Button>
                        <Button onClick={this.ButtonSubmit}>Xác Nhận </Button>
                      </div>   
                 </FormGroup>
                </Form>
            </div>
            </article>

        </Col>
        </>)
    }
}
const mapPropsToValues=()=>{
    return {
        username:'',
        email:'',
        phone:''
    }
}
const FormikForm = withFormik({
    mapPropsToValues
   , validationSchema: Yup.object().shape({ // Validate form field
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
            .typeError("That doesn't look like a phone number")
            
    })
})(User_Profile)
export default FormikForm

























