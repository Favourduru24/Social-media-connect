import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const  saveAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})
 
const initialState =  saveAdapter.getInitialState()

export const  saveApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSave: builder.query({
            query: () => '/save',
             validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
             },
            //  keepUnusedDataFor:5,
             transformResponse: responseData => {
                const loadedSave = responseData.map(save => {
                    save.id = save._id
                      return save 
                })
                return  saveAdapter.setAll(initialState, loadedSave)
             },
             providesTags: (result, error, arg) => {
                if(result?.ids){
             return [{type:'Feed', id:'List'},
             ...result.ids.map(id => ({type: 'Feed', id}))
            ]
                }else {
                    return [{type: 'Feed', id: 'List'}]
                }
             }
        }),
         saveFeed: builder.mutation({
            query: initailSaveData => ({
                url: '/save',
                method: 'POST',
                body: {
                    ...initailSaveData
                }
            }),
            invalidatesTags: [
                {type:'Feed', id: 'List'}
            ]
          })
        })
})

export const {  
useGetSaveQuery,
 useSaveFeedMutation,
} =  saveApiSlice

// returns the query result object
export const selectSaveResult =  saveApiSlice.endpoints.getSave.select()

// creates memoized selector
const selectSaveData = createSelector(
selectSaveResult,
 saveResult =>  saveResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllSave,
selectById: selectSaveById,
selectIds: selectSaveIds
// Pass in a selector that returns the  save slice of state
} =  saveAdapter.getSelectors(state => selectSaveData(state) ?? initialState)

