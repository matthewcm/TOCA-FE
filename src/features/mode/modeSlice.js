import {createSlice} from '@reduxjs/toolkit'

// NEED CONSTS FOR MODE

const modeSlice = createSlice({
    name: 'mode',
    initialState: {mode:[]},
    reducers: {
        setMode(state, action) {
            if (state.mode.length > 0){
                if (!state.mode.includes(action.payload.mode)){
                    state.mode.push(action.payload.mode)
                }
            }else{
                state.mode = [action.payload.mode]
            }
            if (state.modeActive !== true){
                state.modeActive= true
            }
        },
        summaryQuery(state, action) {
            if (state.mode === 'SUMMARY'){
                state.query = action.payload.query
                state.active = true
            }
        },
        setCSV(state, action) {
            state.csv = action.payload.csv
            state.csvActive = true
        },
        setPreparations(state, action) {
            state.headers = action.payload.headers
            state.stopwords = action.payload.stopwords
        }
    }
})

export const selectMode = state => state.mode.mode
export const selectModeQuery = state => state.mode
export const selectCSV = state => state.mode.csv

export const {setMode ,summaryQuery, setCSV, setPreparations} = modeSlice.actions
export default modeSlice.reducer