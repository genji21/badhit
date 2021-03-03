import React,{useState,useEffect} from 'react'
import { Col,  Table } from 'reactstrap';
import {NavLink} from 'react-router-dom'
import Axios from 'axios'

function User_Cart(props) {
  const [cart_order,set_cart] = useState([])
  useEffect( async()=>{
   await Axios.get("https://badhit1234.herokuapp.com/cart").then(res=>{console.log(res.data)
    set_cart(res.data)
    console.log(cart_order)

  }
    )
  },[])
    return (
       <Col lg="8" md="8" sm="12" >
                                    <article className="user_detail-info">
                                    <h3 className="use_detail-title">
                                        Đơn hàng của tôi
                                    </h3>
                                    <Table dark>
      <thead>
        <tr>
          <th>Mã Đơn Hàng </th>
          <th>Ngày Đặt</th>
          <th>Thành Tiền</th>
          <th>Trạng Thái</th>
        </tr>
      </thead>

      <tbody> 
        {cart_order.map((cart_item)=>{
          const {name,id_cart,cart_list,date_cart} = cart_item
          const total = cart_list.reduce((sum,cart_list_item)=>{
            return sum = sum +( cart_list_item.quanity * cart_list_item.price)
          },0)
          return  <tr>
                    <th scope="row">{id_cart}</th>
                    <td>{date_cart || "Lỗi thông tin ngày đặt"} </td>
                    <td> {total}</td>
                    <td>Đang Xác Nhận</td>
                  </tr>
        })}
       
        
      </tbody>
    </Table>
                                    </article>

                                </Col>
       
    );
}

export default User_Cart;