import {createSlice , createAsyncThunk} from '@reduxjs/toolkit'
import { signin } from '../../data/users'

const initialState = {
    user: null ,
    loading: false,
    error: ''
}

export const siginAsync = createAsyncThunk('signin', async ({email, password}, store) => {
    try {
       const user = await signin(email, password);

       return user;
    } catch (error) {
        throw error;
    }
})

// siginAsync.pending ตัวบอกว่าเริ่มทำงาน , siginAsync.fulfilled ตัวบอกว่าทำงานสำเร็จ , siginAsync.rejected ตัวบอกว่าทำงานไม่สำเร็จ

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signout: (state, action) => {
            state.user = null;
            state.loading = false;
            state.error = '';
        }
    },
    extraReducers:{
        [siginAsync.pending]: (state, action) => {
            state.loading = true;
            state.error = '';
        },
        [siginAsync.fulfilled]: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = '';
        },
        [siginAsync.rejected]: (state, action) => {
            state.user = null;
            state.loading = false;
            state.error = action.error.message;
        }
    }
})

export const {signout} = authSlice.actions;
export default authSlice.reducer