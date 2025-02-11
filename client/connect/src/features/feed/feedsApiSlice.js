import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const feedsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})
 
const initialState = feedsAdapter.getInitialState()

export const feedsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFeeds: builder.query({
            query: () => '/feeds',
             validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
             },
            //  keepUnusedDataFor:5,
             transformResponse: responseData => {
                const loadedFeeds = responseData.map(feed => {
                    feed.id = feed._id
                      return feed 
                })
                return feedsAdapter.setAll(initialState, loadedFeeds)
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
        getFeed: builder.query({
            query: (id) => `/feeds/${id}`,
             validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
             },
            //  keepUnusedDataFor:5,
            //  transformResponse: responseData => {
            //     const loadedFeeds = responseData.map(feed => {
            //         feed.id = feed._id
            //           return feed 
            //     })
            //     return feedsAdapter.setAll(initialState, loadedFeeds)
            //  },
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
        searchFeed: builder.query({
                query:(searchTerm) => ({
                   url: `/feeds/search?q=${searchTerm}`,
                   method: 'GET'
                 }),
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
        getUserFeed: builder.query({
            query: (id) => `/feeds/user/${id}`,
             validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
             },
            //  keepUnusedDataFor:5,
             transformResponse: responseData => {
                const loadedFeeds = responseData.map(feed => {
                    feed.id = feed._id
                      return feed 
                })
                return feedsAdapter.setAll(initialState, loadedFeeds)
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
          addNewFeed: builder.mutation({
            query: initailFeedsData => ({
                url: '/feeds',
                method: 'POST',
                body: {
                    ...initailFeedsData
                }
            }),
            invalidatesTags: [
                {type:'Feed', id: 'List'}
            ]
          }),
                 updateFeed: builder.mutation({
            query: initailFeedsData => ({
                url: '/feeds',
                method:'PATCH',
                body: {
                    ...initailFeedsData
                }
            }),
            invalidatesTags: (result, error, arg) => {
             return [{type: 'Feed', id: arg.id}]
            }
          }),

          likeFeed: builder.mutation({
            query: (id) => ({
                url: `/feeds/like/${id}`,
                method:'PUT',
            }),
            invalidatesTags: (result, error, arg) => {
             return [{type: 'Feed', id: arg.id}]
            }
          }),

          deleteFeed: builder.mutation({
            query: ({id}) => ({
                url: '/feeds',
                method: 'DELETE',
                body: {
                    id
                }
            }),
            invalidatesTags: (result, error, arg) => [{type: 'Feed', id:arg.id}]
          }),
        })
})

export const {  
useGetFeedsQuery,
useGetFeedQuery,
useGetUserFeedQuery,
useAddNewFeedMutation,
useUpdateFeedMutation,
useDeleteFeedMutation,
useLikeFeedMutation,
useSearchFeedQuery,
} = feedsApiSlice

// returns the query result object
export const selectFeedsResult = feedsApiSlice.endpoints.getFeeds.select()

// creates memoized selector
const selectFeedsData = createSelector(
selectFeedsResult,
feedsResult => feedsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
selectAll: selectAllFeeds,
selectById: selectFeedById,
selectIds: selectFeedIds
// Pass in a selector that returns the feeds slice of state
} = feedsAdapter.getSelectors(state => selectFeedsData(state) ?? initialState)

