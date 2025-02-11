import { useSelector } from "react-redux"
import {selectFeedById} from "../features/feed/feedsApiSlice"
import img1 from '/images/blank.png'
import { useNavigate } from "react-router-dom"
import Feed from './Feed'
import { useState } from "react"
import {useDeleteFeedMutation} from '../features/feed/feedsApiSlice'
import ToggleText from "./ToggleText"
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdVideocam } from "react-icons/io";
import { IoVideocamOutline } from "react-icons/io5";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { RiSearchLine } from "react-icons/ri";
import { MdContentCopy } from "react-icons/md";
import { LuCopyCheck } from "react-icons/lu";
import { AiOutlineLike } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import { BsShare } from "react-icons/bs";
import { BsSave } from "react-icons/bs";
import { IoSunnyOutline } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import {Link} from 'react-router-dom'
import { useSaveFeedMutation} from "../features/save/saveApiSlice"
import {useAuth} from '../hooks/useAuth'
import { useEffect } from "react"



const ShareFeed = ({feedId}) => {

 const feeds = useSelector(state => selectFeedById(state, feedId))

 const [deleteFeed, {isLoading, isError, error}] = useDeleteFeedMutation()
 const [saveFeeds, {isLoading: Saving, error: saveError, isSuccess: SaveSuccess}] = useSaveFeedMutation()
 
      
 const {id} = useAuth()

 const navigate = useNavigate()

     const [show, setShow] = useState(false)
     const [open, setOpen] = useState(false)

     const [description, setDescription] = useState('')


      useEffect(() => {
          if(SaveSuccess){
            setDescription('')
            navigate('/events')
          }
      },[SaveSuccess, navigate])


     const handleSaveFeed = async (e) => {
         e.preventDefault()

         await saveFeeds({userId: id, feedId: feeds, description})
     }

       if(saveError){
        return <div>{saveError.message}</div>
       }

    const handleEdit = () => navigate(`/feed/${feedId}`)

     const handleDelete = async(e) => {
      e.preventDefault()
      await deleteFeed({id: feeds.id})
     }

     const handleShow = () => {
      setShow((prev) => !prev)
     }
    
   const [copied, setCopied] = useState(" ")

     if(feeds) {
      const created = new Date(feeds.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

      const updated = new Date(feeds.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

  const errClass = isError ? <p className='errmsg'>{error?.data?.message}</p> : null 


     
        const handleCopy = () => {
      setCopied(feeds.feedDetail)
       navigator.clipboard.writeText(feeds.feedDetail)
       setTimeout(() => setCopied(''), 3000)
     }
      

        return (
            <>
      <p className={`${errClass}`}>{error?.data?.message}</p>   
             
            <div className='flex flex-col gap-2 dark:bg-black/50 rounded-md dark:p-2 dark:text-white'>
            <div className='flex flex-col '>
             <div className='flex flex-col'>
              <div className="flex justify-between items-center">
               <div className='flex items-center gap-2'>
                 <div className='w-10 h-10 '>
                 <Link 
            to={`/user/${feeds.creator?._id}`}>
                      <img src={feeds.creator.profile ? `http://localhost:4000/images/`+feeds.creator.profile : img1} className='w-full h-full rounded-full object-cover'/>
                      </Link>
                 </div>
                 <div className='flex justify-between'>
                  <div className="flex flex-col">
                    <div className="flex gap-1">
                 <p className=' font-semibold font-zentry-regular'>{feeds.firstName}</p>
                 <p className=' font-semibold font-zentry-regular '>{feeds.lastName}</p>
                    </div>
                    <p className="text-[12px]">{created}</p>
                                                         <div>
                       
                       </div>
                       
                              </div>

                             </div>
                            
               </div>
               <div className="cursor-pointer relative ">
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
                 </div>
                      </div>
                <p className='px-4 mt-2 leading-7 text-justify text-black/75 mb-4 font-robert-regular dark:text-white'>
                 <ToggleText description={feeds.feedDetail}/>
                </p>
               </div>
           <div className='text-white w-full h-[25rem]  rounded-t-md'>
             <img src={`http://localhost:4000/images/`+feeds.feedUrl} alt="image/url" className='h-full w-full rounded-t-md object-cover'/>
           </div>
               <div className="bg-white shadow-md p-2 flex flex-col rounded-b-lg dark:bg-black/5">
              <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-600"/>
              <div className="flex mt-4 gap-6">
              <div className="flex items-center gap-2">
                  <div>
                      <AiOutlineLike className="size-5 cursor-pointer"/>
                  </div>
                  <p className="font-zentry-regular font-semibold">Like</p>
                 </div>
                 <div className="flex items-center gap-2">
                 
                  <div>
                      <FaRegComment className="size-5 cursor-pointer"/>
                  </div>
                  <Link to={`/post/${feeds.id}`}>
                  <p className="font-zentry-regular font-semibold underline underline-offset-4 text-[#2f71fd]">View all Comment</p>
                  </Link>

                 </div>

                 <div className="flex items-center gap-2 relative">
                  <div>
                      <BsSave className="size-5 cursor-pointer"/>
                  </div>
                  <p className="font-zentry-regular font-semibold cursor-pointer" onClick={(e) => setOpen((prev) => !prev)}>Save</p>
                    { open && <div className="flex flex-col bg-black p-2 gap-2 rounded-lg absolute -top-28 z-10 -right-36">
                        <form className="flex flex-col gap-2" onSubmit={handleSaveFeed}>
                          <input type="text" placeholder="create a collection" className="p-1 rounded-sm outline-none text-black font-zentry-regular"  value={description} onChange={(e) => setDescription(e.target.value)}/>
                          <div className="flex gap-2">
                          <div className="bg-red-500 text-white p-1 rounded-sm font-semibold font-zentry-regular cursor-pointer text-center" onClick={(e) => setOpen((prev) => !prev)}>Cancel Feed</div>
                          <button className="bg-[#2f71fd] text-white p-1 rounded-sm font-semibold font-zentry-regular cursor-pointer" type="submit">Save Feed</button>
                          </div>
                        </form>
                    </div>}
                 </div>

                 </div>
               </div>

                       </div>
             
           </div>
           </>     
        )
     } else return <p>Unavailable</p>
   
}
export default ShareFeed

 