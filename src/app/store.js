import { configureStore } from '@reduxjs/toolkit'

import modeReducer from '../features/mode/modeSlice'

export default configureStore({
    reducer: {
        mode: modeReducer
    }
})