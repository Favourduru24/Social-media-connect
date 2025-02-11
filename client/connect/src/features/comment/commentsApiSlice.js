import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const commentAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})
 
const initialState = commentAdapter.getInitialState()

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getComment: builder.query({
            query: (postId) => `/comment/${postId}/comments`,
             validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
             },
            //  keepUnusedDataFor:5,
            //  transformResponse: responseData => {
            //     const loadedComment = responseData.map(comment => {
            //         comment.id = comment._id
            //           return comment 
            //     })
            //     return commentAdapter.setAll(initialState, loadedComment)
            //  },
             providesTags: (result, error, arg) => {
                if(result?.ids){
             return [{type:'Comment', id:'List'},
             ...result.ids.map(id => ({type: 'Comment', id}))
            ]
                }else {
                    return [{type: 'Comment', id: 'List'}]
                }
             }
        }),
          addNewComment: builder.mutation({
            query: ({postId, data}) => ({
                url: `/comment/${postId}/createComment`,
                method: 'POST',
                body: data

            }),
            invalidatesTags: [
                {type:'Comment', id: 'List'}
            ]
          }),
          updateComment: builder.mutation({
            query: initailCommentData => ({
                url: '/comment',
                method:'PATCH',
                body: {
                    ...initailCommentData
                }
            }),
            invalidatesTags: (result, error, arg) => {
             return [{type: 'Comment', id: arg.id}]
            }
          }),

          deleteComment: builder.mutation({
            query: ({id}) => ({
                url: '/comment',
                method: 'DELETE',
                body: {
                    id
                }
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Comment', id:arg.id}]
          }),
        })
})

export const {
useGetCommentQuery,
useAddNewCommentMutation,
useUpdateCommentMutation,
useDeleteCommentMutation
} = commentApiSlice

// returns the query result object
export const selectCommentResult = commentApiSlice.endpoints.getComment.select()

// creates memoized selector
const selectCommentData = createSelector(
selectCommentResult,
commentResult => commentResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllComment,
selectById: selectCommentById,
selectIds: selectCommentIds
// Pass in a selector that returns the comment slice of state
} = commentAdapter.getSelectors(state => selectCommentData(state) ?? initialState)

