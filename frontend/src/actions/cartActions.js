import axios from 'axios'

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: 'CART_ADD_ITEM',
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  //we save it to local storage, but where do we get our State? We get it in store.js. Go to Store.js
}

//saveBilling Address action
export const saveBillingAddress = (data) => async (dispatch) => {

  dispatch({
    type: 'CART_SAVE_BILLING_ADDRESS',
    payload: data

  })

  localStorage.setItem('billingAddress', JSON.stringify(data))
  //we save it to local storage, but where do we get our State? We get it in store.js. Go to Store.js
}

export const savePaymentMethod = (data) => async (dispatch) => {

  dispatch({
    type: 'CART_SAVE_PAYMENT_METHOD',
    //go to cartReducer to write a function for CART_SAVE_PAYMENT_METHOD
    payload: data

  })

  localStorage.setItem('savePaymentMethod', JSON.stringify(data))
  //we save it to local storage, but where do we get our State? We get it in store.js. Go to Store.js
}

