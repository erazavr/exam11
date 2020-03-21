import {FETCH_CATEGORY_SUCCESS, FETCH_PRODUCT_FAILURE, FETCH_PRODUCT_SUCCESS} from "../actions /productsAction";

const initialState = {
    categories: null,
    products: null,
    error: null
};
const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_SUCCESS:
            return {...state, categories: action.category};
        case FETCH_PRODUCT_SUCCESS:
            return {...state, products: action.product, error: null};
        case FETCH_PRODUCT_FAILURE:
            return {...state, error: action.error};
        default:
            return state
    }
};

export default productsReducer