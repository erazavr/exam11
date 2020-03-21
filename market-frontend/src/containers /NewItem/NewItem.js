import React, {Component} from 'react';
import {Button, Col, Container, Form, FormGroup, Input, Label} from "reactstrap";
import FormElement from "../../components /FormElement/FormElement";
import {createProduct, getCategory} from "../../store /actions /productsAction";
import {connect} from "react-redux";

class NewItem extends Component {
    state = {
        title: '',
        description: '',
        image: '',
        price: '',
        category: ''
    };
    componentDidMount() {
        this.props.getCategories()
    }
    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.createProduct(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };
    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message
        } catch (error) {
            return undefined
        }
    };
    render() {
        return (
            <>
                <Container>
                    <h1>Create new Item</h1>
                    <Form onSubmit={this.submitFormHandler}>
                        <FormElement
                            propertyName='title'
                            title='Title'
                            value={this.state.title}
                            onChange={this.inputChangeHandler}
                            placeholder='Title'
                            error={this.getFieldError('title')}
                            autoComplete='new-title'
                            type='text'
                        />
                        <FormElement
                            propertyName='description'
                            title='Description'
                            value={this.state.description}
                            onChange={this.inputChangeHandler}
                            placeholder='Description'
                            error={this.getFieldError('description')}
                            type='textarea'
                        />
                        <FormElement
                            propertyName='price'
                            title='Price'
                            value={this.state.price}
                            onChange={this.inputChangeHandler}
                            error={this.getFieldError('price')}
                            placeholder='Price'
                            type='number'
                        />
                        <FormElement
                            propertyName='image'
                            title='Image'
                            onChange={this.fileChangeHandler}
                            type='file'
                            error={this.getFieldError('image')}
                        />
                        <FormGroup row>
                            <Label sm={2} for="category">Category</Label>
                            <Col sm={10}>
                                <Input
                                    type="select"
                                    name="category" id="category"
                                    value={this.state.category}
                                    onChange={this.inputChangeHandler}
                                >
                                    <option value="">Please select a category...</option>
                                    {this.props.categories && this.props.categories.map(category => (
                                        <option key={category._id} value={category._id}>{category.title}</option>
                                    ))}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={{offset: 2, size: 10}}>
                                <Button color='primary' type='submit'>
                                    Create Item
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>
            </>
        );
    }
}
const mapStateToProps = state => ({
   categories: state.products.categories,
   error: state.products.error
});
const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategory()),
    createProduct: productData => dispatch(createProduct(productData))
});
export default connect(mapStateToProps, mapDispatchToProps)(NewItem);