import React from 'react';
import { Card, CardImg, Col } from 'reactstrap';
import ProductImageLeft from './imageContainerItem';
export default function ImageContainer(props){
  const {image} = props.product
    return (<>
                         <Col className="image_left"  lg={1} >                  
                           <div className="image_container_left">
                            {
                              image.map((imgItem,index)=>{
                                return <ProductImageLeft key={index} id={index} srcImg={imgItem} />
                              })
                            }

                              
                           </div>
                        </Col>
    </>)
}