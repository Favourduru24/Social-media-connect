import { useParams } from "react-router-dom"
import { useGetFeedQuery } from "../features/feed/feedsApiSlice"
import { useGetCommentQuery } from "../features/comment/commentsApiSlice"
import CommentList from './CommentList'
import CommentForm from './CommentForm'
import { useLikeFeedMutation } from "../features/feed/feedsApiSlice"
import img1 from '/images/blank.png'
import {useAuth} from '../hooks/useAuth'
import { AiOutlineLike } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import { BsSave } from "react-icons/bs"



const FeedDetail = () => {

 const {id} = useParams()
 const {id: currentUser} = useAuth()

 const {data: post, isLoading, error} = useGetFeedQuery(id)

  const {data: comments, isLoading: Commenting} = useGetCommentQuery(id)

  const [likeFeed, {isLoading: Liking}] = useLikeFeedMutation(id)

  // const isLiked = 

  console.log({post})

   const handleLike = async () => {
    //  e.preventDefault()
      await likeFeed(id)
   }
 

  if(isLoading){
    return <div>Loading...</div>
  }

   if(error) {
    return <div>{error?.message}</div>
   }

 const created = new Date(post.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

  const Likes = () => {
    if(post.likes.length > 0) {
      return post.likes.includes(id) ?
       (
       <><AiOutlineLike className="size-5"/> {post.likes.length > 2 ? `You and ${post.length}` : ''}</>
       )
         : 
       (
        <><AiOutlineLike className="size-5"/> {post.likes.length}  {post.likes.length === 1 ? '' : ''}</>
       )
    }
     return  <><AiOutlineLike className="size-5"/> likes</>
  }
  
 return (
    <>
    <div className="col-span-6 mb-80 dark:text-white ml-2">
    { post && (
    <div className="flex flex-col bg-white p-2 rounded-lg shadow-lg dark:bg-black/50">
      <div>

      
          <div className="flex gap-2 items-center mb-2 ">
           <div className='w-10 h-10'>
                                     <img src={post.userProfile ? `http://localhost:4000/images/`+ post.userProfile : img1 } className=' w-full h-full object-cover rounded-full'/>
                                     </div>
           <div className="flex flex-col">
            <div className="flex gap-2">
                <p className="text-black font-zentry-regular font-semibold dark:text-white">{post.firstName}</p>
                <p className="text-black font-zentry-regular font-semibold dark:text-white" >{post.lastName}</p>
            </div>
               <p className="text-[9px]">{created}</p>
           </div>

          </div>
      <div className="flex-col">
        <div className="w-full h-full rounded-md">
          <img src={`http://localhost:4000/images/` + post.feedUrl} className="rounded-lg object-cover w-full h-full"/>
          
        </div>
      <div className="mt-5 p-4 leading-8
    text-lg font-zentry-regular text-justify" >{post.feedDetail}</div>
      
      </div>
                   
      </div> 
      <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-600"/>
              <div className="flex mt-4 gap-6">
              <div className="flex items-center gap-2">
                  <div>
                    <div className="flex items-center gap-1">
                      <button onClick={handleLike}>{post.likes.includes(currentUser) ?  <AiOutlineLike className="size-5 cursor-pointer text-[#2f71fd] "/> :  <AiOutlineLike className=" size-5 cursor-pointer"/>}</button>
                      <div className="flex gap-2 items-center mt-[2px]">
             <p className="font-zentry-regular font-semibold">{post.likes.length} </p> 
             <p className="font-zentry-regular font-semibold">{'Like'}</p>
                      </div>
                      </div>

                  </div>
                  <div>
                  </div>
                 </div>
                 <div className="flex items-center gap-2">
                 <FaRegComment className="size-5 cursor-pointer"/>
                    
                  <div>
                      <div className="flex gap-2 items-center mt-[2px]">
             <p className="font-zentry-regular font-semibold">{comments?.length} </p> 
             <p className="font-zentry-regular font-semibold">{'Comment'}</p>
                      </div>
                  </div>
                  {/* <p className="font-zentry-regular font-semibold ">Comment</p> */}

                 </div>

                 <div className="flex items-center gap-2">
                  <div>
                      <BsSave className="size-5 cursor-pointer"/>
                  </div>
                  <p className="font-zentry-regular font-semibold">Save</p>
                 </div>
                  
                 </div>

                <div className="flex  flex-col mt-3">
                   <div>
                     <CommentForm id={id}/>

                   </div>
                    <div>
                    {comments?.length >= 0 && comments.map((comment) => {
            return <CommentList key={comment._id} comment={comment}/>
          })}
                    </div>
                </div>
         </div>
      )
  }
   
    
     </div>
  </>
  )
}

export default FeedDetail