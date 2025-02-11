import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

 const  friendAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
 })
 
const initialState =  friendAdapter.getInitialState()

export const  friendApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFriendRequest: builder.query({
            query: () => '/friendrequest',
             validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
             },
            //  keepUnusedDataFor:5,
             transformResponse: responseData => {
                const loadedFriend = responseData.map(friend => {
                    friend.id = friend._id
                      return friend 
                })
                return  friendAdapter.setAll(initialState, loadedFriend)
             },
             providesTags: (result, error, arg) => {
                if(result?.ids){
             return [{type:'User', id:'List'},
             ...result.ids.map(id => ({type: 'User', id}))
            ]
                }else {
                    return [{type: 'User', id: 'List'}]
                }
             }
        }),         
        sendFriendRequest: builder.mutation({
            query: (body) => ({
                url: '/friendrequest',
                method:'POST',
                body
            }),
            invalidatesTags: (result, error, arg) => {
             return [{type: 'User', id: arg.id}]
            }
          }),
          acceptFriendRequest: builder.mutation({
            query: (friendRequestId) => ({
                url: `/friendrequest/${friendRequestId}`,
                method:'PUT',
            }),
            invalidatesTags: (result, error, arg) => {
             return [{type: 'User', id: arg.id}]
            }
          }),
        })
})

export const {  
useGetFriendRequestQuery,
 useSendFriendRequestMutation,
 useAcceptFriendRequestMutation
} =  friendApiSlice

// returns the query result object
export const selectFriendResult =  friendApiSlice.endpoints.getFriendRequest.select()

// creates memoized selector
const selectFriendData = createSelector(
selectFriendResult,
 friendResult =>  friendResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllFriend,
selectById: selectFriendById,
selectIds: selectFriendIds
// Pass in a selector that returns the  friend slice of state
} =  friendAdapter.getSelectors(state => selectFriendData(state) ?? initialState)

