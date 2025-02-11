import feed from '/images/feeds.png'
import collection from '/images/collection.png'
import friends from '/images/friends.png'
import profile from '/images/profile.png'
import video from '/images/videos.png'
import chat from '/images/chat.png'
import useAuth from '../hooks/useAuth'

//  const { id } = useAuth()



export const sideBar = [
    { label:'Feed', href:'/feed', id: 1, images: feed},
    { label:'Message', href:'/friends', id: 2, images: friends},
    { label:'Friend', href:'/users', id: 3, images: chat},
    { label:'Profile', href:'/profile', id: 4, images: profile},
    { label:'Collection', href:'/events', id: 5, images: collection}
]