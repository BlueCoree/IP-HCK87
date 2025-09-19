import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const menuSlice = createSlice({
    name: 'menuWeapons',
    initialState: {
        data: [],
        loading: false,
        error: null,
        pagination: {total: 0, page: 1, limit: 10, totalPages: 0}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWeapons.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchWeapons.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload.data
            state.pagination = action.payload.pagination
        })
        builder.addCase(fetchWeapons.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const menuWeaponReducer = menuSlice.reducer;
export const menuWeaponActions = menuSlice.actions;

export const fetchWeapons = createAsyncThunk(
    'menuWeapons/weapons', 
    async function fetchWeapons(params = {}, thunkAPI) {
    try {
        const { page = { number: 1, size: 10 }, sort = null, filter = null, search = '' } = params;
        const query = new URLSearchParams();

        if (search) query.append('search', search);
        if (filter) query.append('filter', filter);
        if(sort) query.append('sort', sort)
        if (page) {
            if (page.size) query.append('page[size]', page.size);
            if (page.number) query.append('page[number]', page.number);  
        }

        const { data } = await axios({
            method: 'GET',
            url: `http://localhost:3000/weapons?${query.toString()}`
        })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})