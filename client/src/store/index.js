import { configureStore } from "@reduxjs/toolkit"
import { menuCharacterReducer } from "./menuCharacter"


export const store = configureStore({
    reducer: {
        menu: menuCharacterReducer
    }
})