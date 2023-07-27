
import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlices'
import authReducer from './slices/authSlices'

export default configureStore({
    reducer: {
      cart: cartReducer,
      auth: authReducer
    },
  })