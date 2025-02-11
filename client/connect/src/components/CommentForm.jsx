import React, { useEffect, useState } from 'react'
import { BsSend } from "react-icons/bs";
import img1 from '/images/blank.png'
import { useAddNewCommentMutation } from '../features/comment/commentsApiSlice'
import {useAuth } from '../hooks/useAuth'

const CommentForm = ({id}) => {

     const {profile} = useAuth()

     

    const [text, setText] = useState('')

     const [addComment, {isLoading, isSuccess, error}] = useAddNewCommentMutation()
        
     useEffect(() => {
        if(isSuccess) {
           setText('')
          }
     },[isSuccess])
     
        const handleSubmit = async (e) => {
          e.preventDefault()
            
          addComment({
            postId: id,
            data: {
              postId: id,
              text: text
            }
          })     
        }

  return (
    <div className='flex items-center gap-2'>
      <div className='w-11 h-11'>
                    <img src={profile ? `http://localhost:4000/images/`+profile : img1} className=' w-full h-full object-cover rounded-full'/>
                    </div>
    <form onSubmit={handleSubmit} className='max-w-[500px] flex-grow'>
          <div className='flex items-center bg-black/50 rounded-md p-1'>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
       placeholder='Write your comment.'
       className='w-full flex-grow  min-h-10 p-1 rounded-md h-10 outline-none bg-transparent font-zentry-regular'
         ></textarea>
          <button type='submit' className='text-[#2f71fd]'>{isLoading ? 'Commenting' : <BsSend/>}</button>
       </div>   
          {error && <p>{error?.data?.message}</p>}
    </form>
    
    </div>
)
}

export default CommentForm
