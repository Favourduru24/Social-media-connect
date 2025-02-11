import { store } from '../../app/store'
import {usersApiSlice} from '../user/usersApiSlice'
import {feedsApiSlice} from "../feed/feedsApiSlice"

import { useEffect } from 'react';
import { Outlet } from "react-router-dom"


const Prefetch = () => {
 
    useEffect(() => {
        console.log('subscribing')
        const feeds = store.dispatch(feedsApiSlice.endpoints.getFeeds.initiate())
       const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        return () => {
            console.log('unsubscribing')
            feeds.unsubscribe()
            users.unsubscribe()
        }
    }, [])

    return <Outlet/>
     
}

export default Prefetch
 