import React from 'react';
import { CardImg } from 'reactstrap';
export default function ProductMidImg(props){
    const ErrorImg=(event)=>{
        event.target.src="https://bitsofco.de/content/images/2018/12/broken-1.png"
      }
    return (<>
        <section id={`product_${props.id}`}>
            <CardImg onError={ErrorImg} style={{"height":"100vh"}} src={props.srcImg} alt="" />
        </section>
    </>)
}