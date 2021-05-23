import React from 'react'
import { Card, CardImg } from 'reactstrap'
export default function ProductImageLeft(props){
  function handleClick(event){
    
   const x = document.querySelectorAll(".card-img")
   for (let i = 0; i < x.length; i++) {
    x[i].classList.remove('active');
  }
  event.target.classList.add('active')
  }
  const ErrorImg=(event)=>{
    event.target.src="https://bitsofco.de/content/images/2018/12/broken-1.png"
  }
    return (<>
         <Card  onClick={handleClick}  className="product_item_img">
                                   <a href={`#product_${props.id}`}>
                                  <CardImg onError={ErrorImg}  src={props.srcImg} alt="Hinh" />     
                                       
                                </a>
                               </Card>
    </>

    )
}