import React, {Component} from 'react';
import {connect} from "react-redux";
import {deleteProduct, getProductById} from "../../store /actions /productsAction";
import {Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Container} from "reactstrap";

class ProductInfo extends Component {
    componentDidMount() {
        console.log(this.props.match.params.id);
        this.props.getProductById(this.props.match.params.id)
    }

    render() {
        const product = this.props.product && this.props.product[0];
        return (
            <>
                <Container>
                    <Col sm={12}>
                    {product ?
                    <Card>
                        {product.image ? <CardImg style={{width: '180px', height: '180px', margin: '5px auto'}} top width="100%" src={`http://localhost:8000/uploads/${product.image}`} alt="Card image cap" />:null}
                        <CardBody>
                            <CardTitle>Title: <b>{product.title}</b></CardTitle>
                            <CardText>Seller: <b>{product.user.username}</b></CardText>
                            <CardText>Phone number of the seller: <b>{product.user.phone}</b></CardText>
                            <CardText>Description: <b>{product.description}</b></CardText>
                            <CardText>Category: <b>{product.category.title}</b></CardText>
                            <CardText>Display name: <b>{product.user.displayName}</b></CardText>
                            <CardText>Price: <b>{product.price}</b>$</CardText>
                            {this.props.user &&
                                <>
                                {product.user._id === this.props.user._id ?
                                        <Button id={product._id} onClick={this.props.deleteProduct} color='primary'>Sales</Button>:null
                                }
                                </>
                            }
                        </CardBody>
                    </Card>: <h1>No product</h1>
                    }
                    </Col>

                </Container>
            </>
        );
    }
}
const mapStateToProps = state => ({
    user: state.users.user,
    product: state.products.products,
});
const mapDispatchToProps = dispatch => ({
    getProductById: id => dispatch(getProductById(id)),
    deleteProduct: id => dispatch(deleteProduct(id.currentTarget.id))
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);