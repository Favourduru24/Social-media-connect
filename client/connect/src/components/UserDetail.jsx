import { useGetUserQuery } from "../features/user/usersApiSlice"
import { useGetUserFeedQuery } from "../features/feed/feedsApiSlice"
import {  Link, useParams } from "react-router-dom"
import {useFollowUserMutation, useUnFollowUserMutation} from '../features/user/usersApiSlice'
import img1 from '/images/blank.png'
import ToggleText from "./ToggleText"
import cover from '/images/cover.jpg'
import { BsThreeDotsVertical } from "react-icons/bs";
import   {useAuth  } from '../hooks/useAuth'
import {useSendFriendRequestMutation, useGetFriendRequestQuery} from '../features/request/friendApiSice'
import {useAcceptFriendRequestMutation} from'../features/request/friendApiSice'
import { RiSearchLine } from "react-icons/ri"
import Practice from "./Practice"
import { useState } from "react"


//   export const FriendRequest = () => {
//   //  const {data: getRequest , isLoading, error} = useGetFriendRequestQuery()
   
//    if(isLoading) {
//      return <p>Loading</p>
//    }
//      if(error) {
//       return <div>Error: {error.message}</div>
//      }

//      const feedIds = getRequest.ids
//       const feedEntities = getRequest.entities


//      console.log({getRequest})
  
//      return (
//         <>
//       {feedIds ? feedIds.map((feedId) => {
//         const post = feedEntities[feedId]
//         return (
//           <>
//             {/* <p>{post?.createdAt}</p> */}
//                <div>
//              <div key={post?._id}>
//                   <Friend friend={post} />
//            </div>
//             </div>  
//         </> 
//         )
//       }): <p>No Feed Available </p> }   
//       </> 
//   )
// }
        
//     //  <p>Hello World</p>
    
   
//   const Friend = ({friend}) => {
//     const [acceptRequest, {isLoading}] = useAcceptFriendRequestMutation()

//      if(isLoading){
//       return <p>Loading..</p>
//      }
      
//      const handleAcceptRequest = async () => {
//        try {
//          await acceptRequest(friend._id).unwrap()
//          console.log('Friend request accepted.')
//        } catch (error) {
//          console.error('Error accepting friend request.', error)
//        }
//      }
//      const created = new Date(friend?.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'short' })
     
//     return (
//       <>
//       {
//          friend ? 
//        <div className="flex justify-between">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 rounded-full">
//             <img src={friend?.sender?.profile ? `http://localhost:4000/images/`+ friend?.sender?.profile : img1 } className="w-full h-full object-  rounded-full"/>
//           </div>
//           <div className="flex flex-col">
//        <p className="font-zentry-regular font-semibold">{friend?.sender?.firstname} {friend?.sender?.lastname}</p>
//          <p className="text-[10px] ">{created}</p>
//               </div>
//         </div>
//           <div className="flex gap-2 ">
//         <button onClick={handleAcceptRequest} className="bg-[#2f71fd]  px-4 rounded-md font-semibold font-zentry-regular">Accept</button>
//         <button onClick={() => {}} className="bg-red-600 px-4 rounded-md font-semibold font-zentry-regular">Decline</button>
//           </div>
//        </div>
//        : <p>Loading</p>  
//        }   
//       </>
        
//     )
//   }

const UserDetail = () => {

   const {id: currentUser} = useAuth()
   


     const { id } = useParams()

     const [friends, setFriends]  = useState(false)
     const [followings, setFollowings]= useState(false)
     const [followers, setFollowers]  = useState(false)

   
      console.log({friends,  followers, followings})

        const handleFriendClick = () => {
           setFriends(true)
        }
        
        const handleFollowersClick = () => {
           setFollowers(true)
        }

        const handleFollowingClick = () => {
           setFollowings(true)
        }
      const {data: feeds, isLoading: feedLoading, error: feedError} = useGetUserFeedQuery(id)
      //  console.log({feeds})


     const [followUser, {isLoading, isError, error,}] = useFollowUserMutation(id)
     const [unFollowUser, { isLoading: UnFollowing, isError: isErrMsg, error: errMsg}] = useUnFollowUserMutation(id)

      const [sendRequest, {}] = useSendFriendRequestMutation()
         

     const errClass = isError ? <p className='errmsg'>{error?.data?.message}</p> : null
     const errClassMsg = isErrMsg ? <p className='errmsg'>{errMsg?.data?.message}</p> : null


      const handleFollow = async (e) => {
          e.preventDefault()
          await followUser(id)
      }

      const handleUnFollow = async (e) => {
          e.preventDefault()
          await unFollowUser(id)
      }
     const {data} = useGetUserQuery(id )
     console.log({data})

          //  console.log({getRequest})
   
    if(feedLoading){
        return <div>Loading...</div>
      }
    
       if(feedError
       ) {
        return <div>{feedError?.message}</div>
       }
      
      
      const feedIds = feeds.ids
      const feedEntities = feeds.entities

      // console.log({feedIds})
      // console.log({feedEntities})
      // console.log({feeds})

      // const navigate = useNavigate()
  //  const navigate = useNavigate()


      //  const handleEdit = () => navigate(``)

      //interaction 
      
   
      //End of interaction

      const handleSubmitFriendRequest = async() => {
         try {
           await sendRequest({senderId: currentUser, receiverId: id}).unwrap()
           console.log('friend request sent.')

         } catch (error) {
            console.error('error sending friend request')
         }
      } 
       
      // console.log({getRequest})

  return (
  <>  
            <div  className="col-span-6 mb-80">
                  <div className="flex flex-col gap-2">
                  <div className='rounded-md flex justify-center'>
                    <div className='w-[37rem] bg-black/50 rounded-xl h-[23rem] flex flex-col'>
                       <div className="w-full relative h-[12rem]">
                      <img src={data?.Cover ? `http://localhost:4000/images/`+ data?.Cover : cover} className='w-full  rounded-t-lg cursor-pointer h-full'/>
                    <div className='absolute -bottom-10 h-24 w-24 bg-black rounded-full left-5'>
                       <img src={data?.profile ? `http://localhost:4000/images/`+ data?.profile : img1} className='w-full h-full object-cover rounded-full cursor-pointer border-2 border-gray-100'/>
                     </div>
                    </div> 

                        <div className="text-white mt-11 ml-5 flex flex-col">
                             <p className="font-zentry-regular font-semibold">{data?.firstname} <span className="text-gray-400">{data?.lastname}</span></p>
                             {data?.address ? <p className="text-sm font-robert-regular ">{data?.address}</p> : <p className="text-[0.6rem] text-gray-400">(No Address Yet)</p>}

                             <div className="flex gap-2 items-center">
                             <p className="text-[0.8rem] font-robert-regular text-gray-400">{data?.email}</p>
                            { data?.work ? <p className="text-[0.8rem] font-robert-regular ">{data?.work}</p> :
                             <p className="text-[0.6rem] text-gray-400">(No Work Status Yet)</p>}
                             </div>
                           <div className="flex gap-2 mt-2">
                               <button className="border-[#2f71fd] border-2 bg-transparent rounded-full py-1 px-5 cursor-pointer rounded- font-semibold font-robert-regular">
                                {data?.follower.includes(currentUser) ?
                               
                               ( 
                                <p onClick={handleUnFollow}>{UnFollowing ? 'Unfollwing' : 'Unfollow'}</p>
                                 ) : 
                          
                                (
                            <p onClick={handleFollow}>{isLoading ? 'Following' : 'Follow'}</p>
                              )
                           }

                               </button>
                               <button className="border-[#2f71fd] border-2 bg-[#2f71fd] py-1 px-5 cursor-pointer font-semibold font-robert-regular rounded-full" onClick={handleSubmitFriendRequest}>Add Friend</button>
                           </div>
                        </div>
                    </div>
                  </div>
                  <div className='w-full h-fit bg-white  rounded-lg flex flex-col mb-10 dark:bg-black/50 dark:text-white'>
                     <div className='flex flex-col p-2'>
                     {/* src={`http://localhost:4000/images/`+feeds.feedUrl} */}
                      <div className='flex flex-col '>
                            <div className="flex justify-between items-center">
                              <h2 className="text-cente font-serif font-semibold text-gray-400">About...</h2>
                               <div className="cursor-pointer">
                                  { currentUser !== id ? '' : <Link to='/friends/:id'>
                                   <BsThreeDotsVertical/>
                                  </Link>}
                               </div>
                            </div>
                              <div className="w-full h-[0.1px] bg-black/40 mt-2" />
                      <div className=' flex gap-2'>
                          <p className='font-semibold font-robert-regular 
                '></p>
                <span className=' flex flex-1 max-w-[35rem] font-medium font-zentry-regular text-[0.9rem] mt-[3px] leading-6 text-justify'>
                 <ToggleText description={data?.bio}/>
               </span>
                        </div>
                         
                          <div className="flex gap-2 items-center">
                          { data?.school ? <p className='font-semibold font-serif'>Education:{' '}<span className='font-medium font-zentry-regular text-[0.9rem] mt-[3px] leading-6 text-justify'
                          >
                        {data?.school}
              </span>
                        </p> : <p className="text-[0.6rem] text-gray-400"><span className="font-semibold font-serif text-[1rem] text-white">RelationShip:{' '}</span>(No field Yet)</p>}
                        
                        { data?.relationship ? <p className='font-semibold font-serif'>Relationship:{' '}<span className='font-medium font-zentry-regular text-[0.9rem] mt-[3px] leading-6 text-justify'
                          >
                        {data?.relationship}
              </span>
                        </p> : <p className="text-[0.6rem] text-gray-400"><span className="font-semibold font-serif text-[1rem] text-white">Education:{' '}</span>(No field Yet)</p>}

                        { data?.birthday ? <p className='font-semibold font-serif'>Birthday:{' '}<span className='font-medium font-zentry-regular text-[0.9rem] mt-[3px] leading-6 text-justify'
                          >
                        {data?.birthday}
              </span>
                        </p> : <p className="text-[0.6rem] text-gray-400"><span className="font-semibold font-serif text-[1rem] text-white">Birthday:{' '}</span>(No field Yet)</p>}
                          </div>

                           <div className="flex gap-2 mt-2">
                             <div className="border-[#2f71fd] border-2 bg-[#2f71fd] py-1 px-5 cursor-pointer font-semibold font-robert-regular rounded-lg">Friends {data?.friendRequest.length}</div>
                             <div className="border-[#2f71fd] border-2 bg-[#2f71fd] py-1 px-5 cursor-pointer font-semibold font-robert-regular rounded-lg">Following {data?.following.length}</div>
                             <div className="border-[#2f71fd] border-2 bg-[#2f71fd] py-1 px-5 cursor-pointer font-semibold font-robert-regular rounded-lg">Followers {data?.follower.length}</div>
                           </div>

                         <div className='flex justify-between items-center px-2'>
                        {/* <Link to='/friends/:id'>
                        <div className='font-semibold font-zentry-regular text-[#2f71fd] cursor-pointer'
                        
                        >
                           Edit Profile
                         </div>
                           </Link> */}
                        </div>
                         
                       
                      </div>
                      {/* <p onClick={handleSubmitFriendRequest} className="cursor-pointer font-semibold font-zentry-regular">Add Friend</p> */}
                     </div>
                     {/* <FriendRequest/> */}
                  </div>
                  <div>
                  {/* get feed by user. */}
                  { feedIds.length ? feedIds.map((feedId) => {
  const post = feedEntities[feedId]
  return (
    <>
{/* <p className={`${errClass}`}>{error?.data?.message}</p>    */}

<div className='flex flex-col gap-2 dark:bg-black/50 rounded-lg dark:p-2 dark:text-white mb-8' key={post.id}>
<div className='flex flex-col '>
<div className='flex flex-col'>
<div className="flex justify-between items-center">
<div className='flex items-center gap-2'>
<div className='w-10 h-10 '>

    <img src={post.creator.profile ?`http://localhost:4000/images/`+post.creator.profile : img1} className='w-full h-full rounded-full object-cover'/>
</div>
<div className='flex justify-between'>
<div className="flex flex-col">
  <div className="flex gap-1">
<p className=' font-semibold font-zentry-regular'>{post.creator.firstname}</p>
<p className=' font-semibold font-zentry-regular '>{post.creator.lastname}</p>
  </div>
  {/* <p className="text-[12px]">{created}</p>
  <Link to={`/post/${feeds.id}`}> */}
  {/* <p>hey</p> */}
  {/* </Link> */}
                   <div>
     

     </div>
     
            </div>

           </div>
          
</div>
{/* <div className="cursor-pointer relative ">
<div onClick={handleShow}>< BsThreeDotsVertical/></div>
{show && 
<div className="bg-black text-white rounded-md absolute top-5 w-[max-content] dark:bg-black/50">
  <div className="flex flex-col">
  <p className="text-white px-3 py-1  border-b-[1px] font-zentry-regular font-semibold" onClick={handleEdit}>Edit feed</p>
  <p className="text-white px-3 py-1 border-b-[1px] font-zentry-regular font-semibold" >Save Feed</p>
  <p className="text-white px-3 py-1  border-b-[1px] font-zentry-regular font-semibold" onClick={handleDelete}>{isLoading ? 'Loading..' : 'Delete feed'}</p>
   <div className="flex gap-2 items-center">
   <p className="text-white px-3 py-1  border-b-[1px] font-zentry-regular font-semibold" >Copy Text</p>
   <div>{copied === feeds.feedDetail ? <LuCopyCheck/>  : <MdContentCopy onClick={handleCopy}/>}</div>
   </div>
  
  </div>
</div>}
</div> */}
    </div>
<p className='px-4 mt-2 leading-7 text-justify text-black/75 mb-4 font-robert-regular dark:text-white'>
<ToggleText description={post.feedDetail}/>
</p>
</div>
<div className='text-white w-full h-[25rem]  rounded-md'>
<img src={`http://localhost:4000/images/`+post.feedUrl} alt="image/url" className='h-full w-full rounded-md object-cover'/>
</div>
     </div>

</div>
</> 
  )
}): <p>No Feed Found.</p>}

                </div>
                  </div>
              
                  {/* </> */}
            </div>
            <div className='col-span-3  dark:bg-black/50 rounded-lg  flex flex-col p-4 shadow-lg max-h-screen'>
              <p className='font-zentry-regular font-semibold dark:text-white'>Network</p>
              <div className='flex max-w-[260px] items-center bg-white  h-10 p-2 rounded-md gap-2 my-4'>
                        <div><RiSearchLine className='text-gray-500'/></div>
                <input type='text' placeholder='Connect..' className='flex-grow outline-none bg-transparent'/>
              </div>
               
                      <div className='flex gap-2 items-center mb-4'>
                      
                      <div className="border-[#2f71fd] border-2 bg-[#2f71fd] py-1 px-2 cursor-pointer font-semibold font-robert-regular rounded-lg text-white" onClick={handleFriendClick}>Friends
                     </div>
                     
                     <div className="border-[#2f71fd] border-2 bg-[#2f71fd] py-1 px-2 cursor-pointer font-semibold font-robert-regular rounded-lg text-white" onClick={handleFollowersClick}>Follwers</div>

                     <div className="border-[#2f71fd] border-2 bg-[#2f71fd] py-1 px-2 cursor-pointer font-semibold font-robert-regular rounded-lg text-white" onClick={handleFollowingClick}>Follwing</div>
                         </div>  
                             <div>
                             {friends ? (
                            <div className='flex-col flex gap-2 my-2 '> 
                              {data.friendRequest.length ? data.friendRequest.map((friendList) => (
                                    <div className='flex gap-2 items-center '>
                                    {/* <Link to={`/user/${user.id}`}> */}
                                          <div className='w-10 h-10 rounded-full'>
                                          <img src={friendList.profile ?`http://localhost:4000/images/`+ friendList.profile : img1} className='w-full h-full rounded-full object-cover'/>
                                          </div>
                                          {/* </Link> */}
                                    {/* <Link to={`/user/${user.id}`}>   */}
                                        <p className='text-black cursor-pointer font-zentry-regular font-semibold dark:text-white'>{friendList.firstname} {friendList.lastname}</p>
                                       {/* </Link> */}
                                    </div>
                                        )) : <p>No Friend Yet</p>}
                                    </div> ) :  
                                           (followers ?  (
                              <div className='flex-col flex gap-2 my-2 '> 
                              {data.follower.length ? data.follower.map((follow) => (
                                    <div className='flex gap-2 items-center '>
                                    {/* <Link to={`/user/${user.id}`}> */}
                                          <div className='w-10 h-10 rounded-full'>
                                          <img src={follow.profile ?`http://localhost:4000/images/`+ follow.profile : img1} className='w-full h-full rounded-full object-cover'/>
                                          </div>
                                           {/* </Link> */}
                                    {/* <Link to={`/user/${user.id}`}>   */}
                                        <p className='text-black cursor-pointer font-zentry-regular font-semibold dark:text-white'>{follow.firstname} {follow.lastname}</p>
                                       {/* </Link> */}
                                    </div>
                                        )) : <p>No Followers Yet</p>}
                                    </div>

                             ) : followings ? <p>Following is true</p> : <p>No Data.</p>)
                              }
                            
                        </div>
                      </div>

                
      
   </>

  )
}

export default UserDetail
// {data.friendRequest.map((friendList) => (
                                         
// ))}


