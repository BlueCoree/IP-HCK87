import { configureStore } from "@reduxjs/toolkit"
import { menuCharacterReducer } from "./menuCharacter"
import { menuWeaponReducer } from "./menuWeapons"


export const store = configureStore({
    reducer: {
        menu: menuCharacterReducer,
        menuWeapon: menuWeaponReducer
    }
})