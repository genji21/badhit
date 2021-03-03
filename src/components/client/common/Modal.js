import { queryAllByAltText, render } from "@testing-library/react";
import React from "react";
import {
  CardText,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

class Modal extends React.Component {
  state = {
    value: "",
  }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      value: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    //   window.location.pathname="/search"
    this.props.add_Value(this.state.value);

    this.props.handleToggle()

    this.props.history.push(`/search/${this.state.value}`);

  };
  componentDidMount(){
    document.querySelector(".toggleModalSearch").addEventListener("click",this.toggleOpen)
    
    // document.querySelector('.toggleModalCart').addEventListener("click",this.toggleOpenCart)    
    window.onclick=(e)=>{
        if(e.target.id === "over-lay") {
           this.props.handleToggle()
        }
        // if(e.target.id ==="over-lay2"){
        //     this.toggleOpenCart()

        // }
      }
    }
  render() {
    const ModalStyle = {
      width: "100%",
      height: "100%",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 9999,
      // "visibility" : "hidden",
      // "opacity" : 0,
      transition: "all 200ms linear",
      background: "rgba(0,0,0,0.8)",
    };

    return (
      <>
        <div id="over-lay" className="overlay-cm" style={ModalStyle}>
          <div id="Modal-Search" className="Search-Wrapped modal_common">
            <div className="Search-container" style={{ marginTop: "100px" }}>
              <Container>
                <Row>
                  <Col lg="12">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <CardText>Tìm Kiếm</CardText>
                      <span
                        onClick={this.props.handleToggle}
                        className="toggleX"
                        style={{ fontSize: "30px" }}
                      >
                        X
                      </span>
                    </div>

                    <Form
                      onSubmit={this.handleSubmit}
                      style={{ marginTop: "40px" }}
                    >
                      <FormGroup>
                        <Input
                          name="tensanpham"
                          value={this.state.value}
                          onChange={this.handleChange}
                          placeholder="Nhập tên sản phẩm cần tìm kiếm"
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    valuesada: state,
  };
};
const mapDispathToProps = (dispatch) => {
  return {
    add_Value: (value) => {
      dispatch({
        type: "add_value_search",
        payload: value,
      });
    },
  };
};


export default connect(mapStateToProps, mapDispathToProps)(withRouter(Modal));
