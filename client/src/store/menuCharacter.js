import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const menuSlice = createSlice({
    name: 'menuCharacter',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(fetchCharacters.rejected, (state, action) => {
            state.loading = false
            // state.error = error.message
        })
    }
})

export const menuCharacterReducer = menuSlice.reducer;
export const menuCharacterActions = menuSlice.actions;

export const fetchCharacters = createAsyncThunk('menuCharacter/characters', async function fetchCharacters(params, thunkAPI) {
    try {
        const { data } = await axios({
            method: 'GET',
            url: 'http://localhost:3000/characters'
        })
        return data
    } catch (error) {
        throw error
    }
})