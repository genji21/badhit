import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardImg, CardText, CardTitle, Col } from 'reactstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Product(props){
   
    const name2 = props.name.replace(/ /g,"-")
    const {category} = props
    return (<> 
             <Col lg="3" md="6">
                 <Link className="linksp" onClick={(name)=>{document.title = name2}} to={`/products/${category}/${name2}`}>
                        <Card>
                           <CardBody>
                               <LazyLoadImage  delayTime effect="blur" style={{"width":"100%","height":"100%"}} src={props.img[0]}/>
                               <LazyLoadImage delayTime effect="blur" style={{"width":"100%","height":"100%"}} src={props.img[1]}/>
                               {props.stock === 0 ? <img className="sold_out" src="http://theme.hstatic.net/1000351433/1000669365/14/sold_out.png?v=244"/>:"" }
                              
                               <CardTitle>
                                    {props.name}
                               </CardTitle>
                               <CardText>
                                   {props.price}$
                               </CardText> 
                           </CardBody>
                        </Card>
                 </Link>
                    </Col>
    
    </>)
}