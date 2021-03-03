import React from 'react'
import { CardImg, Col } from 'reactstrap'
import ProductMidImg from './imageMidItem'
export default function ImagecontainerMid(props){
  const {image} = props.product

    return (<>

         <Col lg ={6} className="image_wrapped_middle">
                            <div className="image_container_middle">
                              
                            {
                              image.map((imgItem,index)=>{
                                return  <ProductMidImg  key={index} id={index} srcImg={imgItem} />
                              })
                            }
                              


                            </div>
                        </Col>



    </>)
}