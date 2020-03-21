import axiosApi from "../../axiosApi";
import {push} from "connected-react-router";

export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

export const fetchCategorySuccess = category => ({type: FETCH_CATEGORY_SUCCESS, category});
export const fetchProductSuccess = product => ({type: FETCH_PRODUCT_SUCCESS, product});
export const fetchProductFailure = error => ({type: FETCH_PRODUCT_FAILURE, error});

export const getCategory = () => {
    return async dispatch => {
        const response = await axiosApi.get('/categories');
        dispatch(fetchCategorySuccess(response.data))
    }
};
export const getProductsByCategory = cId => {
    return async dispatch => {
        const response = await axiosApi.get('/products?category=' + cId);
        dispatch(fetchProductSuccess(response.data))
    }
};
export const getProducts = () => {
   return async dispatch => {
       try {
           const response = await axiosApi.get('/products');
           dispatch(fetchProductSuccess(response.data))
       } catch (error) {
           dispatch(fetchProductFailure(error))
       }
   }
};
export const getProductById = id => {
    return async dispatch => {
        try {
            const response = await axiosApi.get('/products?product=' + id);
            dispatch(fetchProductSuccess(response.data))
        }catch (error) {
            fetchProductFailure(error)
        }
    }
};
export const createProduct = productData => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {"Authorization": "Token " + token};
            await axiosApi.post('/products', productData, {headers});
            dispatch(fetchProductSuccess());
            dispatch(push('/'))
        }catch (error) {
            if (error.response) {
                dispatch(fetchProductFailure(error.response.data));
            } else {
                dispatch(fetchProductFailure({global: "No network connection "}))
            }
        }
    }
};
export const deleteProduct = id => {
    return async (dispatch, getState) => {
        try {
            const token = getState().users.user.token;
            const headers = {"Authorization": "Token " + token};
            await axiosApi.delete('/products/' + id, {headers});
            dispatch(getProductById(id));
            dispatch(push('/'))
        } catch (error) {
            if (error.response) {
                dispatch(fetchProductFailure(error.response.data));
            } else {
                dispatch(fetchProductFailure({global: "No network connection "}))
            }
        }
    }
};
