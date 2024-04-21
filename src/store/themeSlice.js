import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    themeMode: "light"
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setDarkTheme: (state) => {
            state.themeMode = "dark"
        },
        setLightTheme: (state) => {
            state.themeMode = "light"
        },
    }
})

export const {setDarkTheme, setLightTheme} = themeSlice.actions;
export default themeSlice.reducer;