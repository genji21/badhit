import { render } from '@testing-library/react';
import React from 'react';
import { Col, Container, FormGroup,InputGroup ,Label, Row ,Form,Input,Button} from 'reactstrap';
import QuanityInput from '../common/QuanityInput';
export default class ProductDetailForm extends React.Component{
    render(){
    const {name,price} = this.props.product
        return <>
          <Col className="product-detail-right" lg={4}>
                            <div className="product_intro_wrapped" style={{"textAlign":"left"}}>
                                <Container>
                                    <Row>
                                        <Col lg={12} >
                                        <Form className="form_product" id="form_product1">
                                    <FormGroup className="product_title_intro">
                                        {/*  đổi name */}
                                        <h5>
                                            {name}
                                        </h5>
                                        <span className="name-id" style={{"fontSize": "12px", "color": "#a3a5a7"}}>SKU:SP00519-1</span>
                                        </FormGroup>
                                        <FormGroup  className="product_price">
                                            <span className="price-pd" style={{"fontSize": "18px","opacity": ".92", "fontWeight": "bold"}}>
                                                {price}$
                                            </span>
                                        </FormGroup>
                                        <FormGroup className="product-color">
                                            <Label style={{"marginBottom":"10px"}} for="den">Đen</Label>
                                            <div>
                                            <Input type="radio" id="den" name="den" placeholder="" />

                                            </div>
                                        </FormGroup>
                                        <FormGroup style={{"display":"flex"}} className="product-size">
                                            <InputGroup>
                                                <Input style={{"display":"none"}} type="checkbox" id="checkbox" name="checkbox" placeholder="M"/>
                                                <Label for="checkbox">M</Label>
                                            </InputGroup>
                                            <InputGroup>
                                                <Input style={{"display":"none"}} type="checkbox" id="sizeL" name="sizeL" placeholder="L"/>
                                                <Label for="checkbox">L</Label>
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup className="product_quanity">
                                            <div className="product_quanity_wrapped" style={{"display":"flex","flexDirection":"row"}}>
                                                <QuanityInput onChange={this.props.changeInput} value={this.props.value} />

                                            </div>
                                        </FormGroup>
                                        <FormGroup>
                                            <div className="button-wrapped">
                                                <Button  className="button-addcart button dark" onClick={this.props.addToCart} type="#" style={{"width":"100%"}}>
                                                    Thêm Vào Giỏ
                                                </Button>
                                            </div>
                                        </FormGroup>
                                </Form>
                                        </Col>
                                    </Row>
                                </Container>
                               
                            </div>
                        </Col>
        </>
        
    }
}