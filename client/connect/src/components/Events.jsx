import React from 'react'
import {useGetSaveQuery} from "../features/save/saveApiSlice"
import { Link } from 'react-router-dom'
// import { data } from 'react-router-dom'


const Events = () => {

  const {data: save, } = useGetSaveQuery() 

  const feedIds = save?.ids
  const feedEntities = save?.entities

   
  console.log({save})
  console.log({feedIds})
  console.log({feedEntities})

  // {feedIds ? feedIds.map((feedId) => {
  //   const post = feedEntities[feedId]
  //     <div>
//       <p>{save?.description}</p>
//  <p>{save?.feedId?.firstName}</p>
//    <p>{save?.feedId?.lastName}</p>
// {/* #F8FAFB   #ECEFF2 #OCODOE */}
// {/* <p className={`${errClass}`}>{error?.data?.message}</p>    */}
// {/* //#115DFB */}


//     </div>

   
  return (
      <div className='col-span-5 flex flex-col  dark:text-white gap-2 mb-80'>
          {feedIds ? feedIds.map((feedId) => {
            const post = feedEntities[feedId]
      const created = new Date(post?.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

            return (
              <>
            <div className='flex flex-col dark:bg-black/50 rounded-lg p-2 ' >
               <div className='flex flex-col'>
            <div className='flex flex-col'>
                   <div className='flex gap-2'>
                    <p className='font-zentry-regular font-semibold'>{post?.feedId?.firstName}</p>
                    <p className='font-zentry-regular font-semibold'>{post?.feedId?.lastName}</p>
                   </div>
                   <p className='text-[12px] mb-1'>{created}</p>
                   </div>
                   <Link to={`/post/${post?.feedId?._id}`}>
                   <div className='w-full h-[20rem]'>
                    <img src={`http://localhost:4000/images/` + post?.feedId?.feedUrl} className='rounded-md w-full h-full'/>
                   </div>
                   </Link>
                   <p className='pl-1 mt-1 font-zentry-regular font-semibold truncate'>{post?.description}</p>
                </div>                
                  </div>
           </> 
                    )
                  }): <p>No Feed Available </p>}
 </div>
 
 )
}

export default Events