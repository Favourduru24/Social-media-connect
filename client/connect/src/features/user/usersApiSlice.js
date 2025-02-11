 import {createEntityAdapter, createSelector} from '@reduxjs/toolkit'
 import {apiSlice} from '../../app/api/apiSlice'

  const usersAdapter = createEntityAdapter({})
  const initialState = usersAdapter.getInitialState()

   export const usersApiSlice = apiSlice.injectEndpoints({
     endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
             validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
             },
            //  keepUnusedDataFor:5,
             transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                      return user 
                })
                return usersAdapter.setAll(initialState, loadedUsers)
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
        
        getUser: builder.query({
          query: (id) => `/users/${id}`,
           validateStatus: (response, result) => {
                  return response.status === 200 && !result.isError
           },
          //  keepUnusedDataFor:5,
        //    transformResponse: responseData => {
        //       const loadedUsers = responseData?.map(user => {
        //           user.id = user._id
        //             return user 
        //       })
        //       return usersAdapter.setAll(initialState, loadedUsers)
        //    },
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
          addNewUser: builder.mutation({
            query: initailUsersData => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initailUsersData
                }
            }),
            invalidatesTags: [
                {type:'User', id: 'List'}
            ]
          }),
          updateUser: builder.mutation({
            query: initailUsersData => ({
                url: '/users',
                method:'PATCH',
                body: {
                    ...initailUsersData
                }
            }),
            invalidatesTags: (result, error, arg) => {
             return [{type: 'User', id: arg.id}]
            }
          }),
          followUser: builder.mutation({
            query: (id) => ({
                url: `/users/follow/${id}`,
                method:'PUT'
            }),
            invalidatesTags: (result, error, arg) => {
             return [{type: 'User', id: arg.id}]
            }
          }),
          unFollowUser: builder.mutation({
            query: (id) => ({
                url: `/users/unfollow/${id}`,
                method:'PUT'
            }),
            invalidatesTags: (result, error, arg) => {
             return [{type: 'User', id: arg.id}]
            }
          }),
            
          deleteUser: builder.mutation({
            query: ({id}) => ({
                url: '/users',
                method: 'DELETE',
                body: {
                    id
                }
            }),
            invalidatesTags: (result, error, arg) => [{type: 'User', id:arg.id}]
          }),

     }),
   })

  export  const {
       useGetUsersQuery,
       useAddNewUserMutation,
      useUpdateUserMutation,
      useDeleteUserMutation,
      useGetUserQuery,
      useFollowUserMutation,
      useUnFollowUserMutation,
      
   } = usersApiSlice


   export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

   const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
   )

    export const {
        selectAll: selectAllUsers,
        selectIds: selectUsersIds,
        selectById: selectUsersById
      } = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
    