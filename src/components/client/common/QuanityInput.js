import React from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { Col, Row } from 'reactstrap';
import '../../../assets/style/quanityInput.scss'
export default function QuanityInput(props){
  
    return (<>
            <div className="quanity-input">
            <input type="number" value={props.value} onChange={(event)=>{props.onChange && props.onChange(Number(event.target.value))}}/>
                <div className="button-wrap">

                        <div className="add" md={4} onClick={()=>{props.onChange && props.onChange(+1,true)}}>
                            <FaArrowUp/>
                        </div>
                        <div className="minus" md={4} onClick={()=>{props.onChange && props.onChange(-1,true)}}>
                            <FaArrowDown/>  
                        </div>
                </div>

            </div>
    </>

    )
}