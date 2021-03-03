import React from 'react';
import { CardLink, ListGroup, ListGroupItem } from 'reactstrap';
import {FaArrowDown,FaArrowUp} from 'react-icons/fa'
import {Link} from 'react-router-dom'
export default function Sidebar(){
    return(<>
        <div className="sidebar-container">
        <ListGroup>
                <ListGroupItem>
                    <Link to="/">
                        Home
                    </Link>
                </ListGroupItem>
                <ListGroupItem> 
                    <Link to="/products/allproduct">
                        Shop
                    </Link>
                </ListGroupItem>
                <ListGroupItem> 
                    <Link to="#">
                        Collection
                    </Link>
                </ListGroupItem>
                <ListGroupItem> 
                    <Link to="#">
                        About Us
                        </Link>
                </ListGroupItem>
                <ListGroupItem> 
                    <Link to="#">
                        Privacy Policy
                        <FaArrowDown style={{"fontSize" :"10px"}}>
                         </FaArrowDown>
                        
                         <ListGroup>
                            <ListGroupItem>
                                <Link to="#">
                                    Điều khoản dịch vụ
                                </Link>
                                
                            </ListGroupItem>
                            <ListGroupItem>
                                <Link to="#">
                                    Điều khoản Bảo Mật
                                </Link>
                                
                            </ListGroupItem>
                            <ListGroupItem>
                                <Link to="#">
                                    Chính Sách Đổi Trả
                                </Link>
                                
                            </ListGroupItem>
                        </ListGroup>
                    </Link>
                </ListGroupItem>
                <ListGroupItem> 
                    <Link to="#">
                        Blog
                    </Link>
                </ListGroupItem>
        </ListGroup>
        </div>
    
    
    
    
    </>)
}