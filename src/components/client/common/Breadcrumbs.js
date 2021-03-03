import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

export default function Breadcum(props){
    
    return<>
     <Breadcrumb tag="nav" listTag="div">
                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to="/products">Products</Link></BreadcrumbItem>
                <BreadcrumbItem active tag="span">{props.category || props.url.replace('/products/',"")}</BreadcrumbItem>
      </Breadcrumb>
    </>
}
