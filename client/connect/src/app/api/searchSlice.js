import { createSlice} from '@reduxjs/toolkit'

 
const initialState = {
    searchTerm: '',
}

 const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers:{
        updateSearchTerm(state, action) {
            state.searchTerm = action.payload
        },
    },
 })

 export const {updateSearchTerm } = searchSlice.actions
 export default searchSlice.reducer