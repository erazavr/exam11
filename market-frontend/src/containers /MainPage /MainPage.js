import React, {Component} from 'react';
import {getCategory, getProducts, getProductsByCategory} from "../../store /actions /productsAction";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {Card, CardBody, CardImg, CardSubtitle, CardTitle, Col, Row} from "reactstrap";

class MainPage extends Component {
    requestData = () => {
      if (this.props.match.params.name) {
          this.props.getProductsByCategory(this.props.match.params.name);
      } else {
          this.props.getProducts();
      }
    };
    componentDidMount() {
        this.props.getCategories();
        this.requestData();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.name !== this.props.match.params.name) {
            return this.requestData()
        }
    }

    render() {
        const categories = this.props.categories;
        const products = this.props.products;
        return (
            <>
              <div style={{float: 'left', marginRight: '100px'}}>
                  <ul>
                      <li>
                          <NavLink to='/'>All items</NavLink>
                      </li>

                  {categories &&
                    categories.map(c => (
                        <li key={c._id}>
                            <NavLink to={'/categories/' + c._id}>{c.title}</NavLink>
                        </li>
                    ))
                  }
                  </ul>
              </div>
                <Row>
                    {products && products[0]?
                        products.map(product => (
                            <Col sm={3} key={product._id}>
                                <Card style={{cursor: 'pointer'}} className='mb-3' onClick={() => this.props.history.push(`/${product._id}`)}>
                                    {product.image !== '' ? <CardImg top width="100%" src={`http://localhost:8000/uploads/${product.image}`} alt="Card image cap" style={{width: '180px',height: '180px', margin: '5px auto'}}/>:null}
                                    <CardBody>
                                        <CardTitle>Title: <b>{product.title}</b></CardTitle>
                                        <CardSubtitle>Price: <b>{product.price}</b>$</CardSubtitle>
                                    </CardBody>
                                </Card>
                            </Col>
                        )): <h1>No products</h1>
                    }

                </Row>
            </>
        );
    }
}
const mapStateToProps = state => ({
    products: state.products.products,
    categories: state.products.categories
});
const mapDispatchToProps = dispatch => ({
   getCategories: () => dispatch(getCategory()),
   getProducts: () => dispatch(getProducts()),
   getProductsByCategory: cId => dispatch(getProductsByCategory(cId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);