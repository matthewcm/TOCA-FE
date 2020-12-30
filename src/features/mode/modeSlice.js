import {createSlice} from '@reduxjs/toolkit'
// NEED CONSTS FOR MODE

const modeSlice = createSlice({
    name: 'mode',
    initialState: {mode:'UNSET'},
    reducers: {
        setMode(state, action) {
            state.mode = action.payload.mode
        },
        summaryQuery(state, action) {
            if (state.mode == 'SUMMARY'){
                state.query = action.payload.query
                state.search = action.payload.search
            }
        }
    }
})

export const selectMode = state => state.mode.mode
export const selectModeQuery = state => state.mode

export const {setMode ,summaryQuery} = modeSlice.actions
export default modeSlice.reducer