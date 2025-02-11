import { useState, useEffect } from 'react'
import img from '/images/blank.png'
import img1 from '/images/blank.png'
import CreateFeed from './CreateFeed'
import useAuth from '../hooks/useAuth'
import ShareFeed from './ShareFeed'
import {useGetFeedsQuery} from "../features/feed/feedsApiSlice"
import { RiSearchLine } from "react-icons/ri";
import Practice from './Practice'
import { useGetUserQuery } from '../features/user/usersApiSlice'


const Feed = () => {

     const {profile} = useAuth()
     
     const Story = [1,2,3,4,5,6,7,8,9,10]

     
      const {id} = useAuth()
      const {data: user} = useGetUserQuery(id)

       console.log({user})

    const [open, setOpen] = useState(false)    

    const handleOpening = () => {
      setOpen((prev) => !prev)
    } 
      
    const {
      data: feeds,
      isLoading,
      isSuccess,
      isError,
      error
  } = useGetFeedsQuery('feedsList',  {

  //   selectFromResult: ({ data }) => ({
  //     feeds: data?.ids.map(id => data?.entities[id])
  // }),
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange:true
  })
   
     
  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }


   if (isSuccess) {

      const { ids } = feeds

      const tableContent = ids?.length
          ? ids.map(feedId => <ShareFeed key={feedId} feedId={feedId} /> )
          : null
  
   
   
      content = (
        <>
          {open && <div  className='flex justify-center items-center absolute z-[100] h-dvh w-screen overflow-hidden bg-[#FCFCFD] dark:bg-black'>
            <div className='bg-white w-[45rem] h-fit  rounded-xl shadow-2xl dark:bg-black/80'>
                 <CreateFeed handleOpening={handleOpening} />
            </div>
          </div> }
     
        <div className='col-span-6  p-2 rounded-md  mb-80 flex flex-col'>
    
        <div className='flex-col flex gap-3 '>
        <div className='text-white h-[8rem] bg-white dark:text-white dark:bg-black/50 rounded-md overflow-x-scroll flex justify-start px-3 scroll-hidden shadow-lg dark:black/50'>
             <div className='flex items-center gap-2 justify-center'>
                  {user?.friendRequest.map((friends) => (
                       <div className='flex flex-col gap-2' >
                      <div className='h-20 w-20 bg-white rounded-full cursor-pointer'>
                        <img src={friends?.profile ? `http://localhost:4000/images/`+ friends?.profile : img} className='rounded-full w-full h-full'/>
                      </div>
                         <p className='text-start text-[12px] font-semibold font-zentry-regular ml-2 text-balance text-black dark:text-white'>{friends.firstname} {friends.lastname}</p>
                       </div>
                  ))}
         </div>
        </div>
            <div className='bg-white w-full h-28 shadow-lg rounded-lg flex flex-col mb-5 cursor-pointer dark:bg-black/50' onClick={handleOpening}>
    
               <form className='flex flex-col gap-5 px-5 mt-2'  >
                <div className='flex items-center flex-grow gap-4' >
                   <div className='w-10 h-10'>
 <img src={profile ? `http://localhost:4000/images/`+profile : img1} className=' w-full h-full object-cover rounded-full'/>
                  </div>
                  <div className='max-w-[400px] flex flex-grow border-2 rounded-md' >
                  <input type='text' placeholder='What on your mind' className='w-full flex-grow h-9 outline-none px-2 rounded-md font-zentry-regular text-black/75' 
                                id='feedDetail'
                  name='feedDetail'
                  autoComplete='off'
                  />
                  </div>
                  <button className='bg-blue-200 px-8 p-[7px] rounded-md text-[#2f71fd] font-robert-regular font-semibold' type='submit'>
                     Share
                  </button>
                  </div>
                    <div className='flex gap-2 px-'>
                       <div className='bg-gray-500/10 px-2 py-[7px] rounded-md text-black/80 cursor-pointer dark:text-white'>
                       
                        images
                       </div>
                       <div className='bg-gray-500/10 px-2 py-[7px] rounded-md text-black/80 cursor-pointer dark:text-white'># Hashtag</div>
                    </div>
               </form>
             
            </div>
             {tableContent}
           
        </div>  
         </div>
         <div className='col-span-3  dark:bg-black/50 rounded-lg  flex flex-col p-4 shadow-lg'>
              <p className='font-zentry-regular font-semibold dark:text-white'>Network</p>
              <div className='flex max-w-[260px] items-center bg-white  h-10 p-2 rounded-md gap-2 my-4'>
                        <div><RiSearchLine className='text-gray-500'/></div>
                <input type='text' placeholder='Connect..' className='flex-grow outline-none bg-transparent'/>
              </div>
               
                     <div className='flex gap-2 items-center mb-4'>
                    <p className='font-zentry-regular font-semibold dark:text-white underline'>Primary</p>
                    <p className='font-zentry-regular font-semibold dark:text-white'>General</p>
                     </div> 

                        <div>
                          <Practice/>
                        </div>
                      </div>
        </>
      )
    }
      return content

  
}

export default Feed

 