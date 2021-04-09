export const cartReducer = (state = { cartItems: [], billingAddress: {} }, action ) => {
  switch(action.type) {
    case 'CART_ADD_ITEM':
      const item = action.payload

      //this means if there's an item
      const existItem = state.cartItems.find((x) => x.product === item.product)

      if(existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x)=> x.product === existItem.product ? item : x)
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }

      case 'CART_SAVE_BILLING_ADDRESS':
        return{
          ...state,
          billingAddress: action.payload
        }
      
        case 'CART_SAVE_PAYMENT_METHOD':
        return{
          ...state,
          paymentMethod: action.payload
        }

    default:
      return state
  }
}

//pass to store.js