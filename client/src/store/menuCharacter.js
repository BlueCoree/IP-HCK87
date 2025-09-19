import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const menuSlice = createSlice({
    name: 'menuCharacter',
    initialState: {
        data: [],
        loading: false,
        error: null,
        pagination: {total: 0, page: 1, limit: 10, totalPages: 0}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload.data
            state.pagination = action.payload.pagination
        })
        builder.addCase(fetchCharacters.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const menuCharacterReducer = menuSlice.reducer;
export const menuCharacterActions = menuSlice.actions;

export const fetchCharacters = createAsyncThunk(
    'menuCharacter/characters', 
    async function fetchCharacters(params = {}, thunkAPI) {
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
            url: `http://localhost:3000/characters?${query.toString()}`
        })
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
})