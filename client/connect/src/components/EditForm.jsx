import { GrEmoji } from "react-icons/gr";

import img1 from '/images/blank.png'
import { useState, useEffect } from 'react'
import  {updateRequest} from '../app/axios'
import { useNavigate } from 'react-router-dom'
import { useUpdateFeedMutation } from '../features/feed/feedsApiSlice'
import useAuth from '../hooks/useAuth'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

 


const EditForm = ({feeds}) => {

const {firstname, lastname, email, profile} = useAuth()


      const [updateFeed, {
        isSuccess,
         isLoading,
          isError,
           error
        }] = useUpdateFeedMutation()

        const [feedDetail, setFeedDetail] = useState(feeds.feedDetail)
        const [file, setFile] = useState(feeds.feedUrl)

            const navigate = useNavigate()
        
        useEffect(() => {
            if(isSuccess){
                     setFeedDetail('')
                     navigate('/feed')
                  }
        },[isSuccess, navigate])
          
         const upload = async ( ) => {
            try{
              const formData = new FormData()
              formData.append('file', file)
               const res = await updateRequest.patch("/upload", formData)   
                return res.data
            } catch(err){
           console.log(err)
            }
            }
    
    
          const handleEditFeed = async(e) => {

            e.preventDefault()
             let imgUrl = ''
             if(file) imgUrl = await upload()
    
           await updateFeed({id: feeds.id, feedUrl: imgUrl, feedDetail})
       }

  const errClass = isError ? <p className='errmsg'>{error?.data?.message}</p> : null 
        
  const [showEmoji, setShowEmoji] = useState(false)

  const addEmoji = (e) => {
const syn = e.unified.split("_")
const codeArray = []
syn.forEach((el) => codeArray.push("0x" + el))
 let emoji = String.fromCodePoint(...codeArray)
  setFeedDetail(feedDetail + emoji)
  }

  return (
    < form className="flex flex-col px-5 py-2 z-[150] relative"  onSubmit={handleEditFeed}>
    <div className='flex items-center gap-3 mb-10'>
       <div className='w-10 h-10 rounded-full'>
            <img src={profile ? `http://localhost:4000/images/`+profile : img1} className=' w-full h-full object-cover rounded-full'/>
       </div>
       <div className='flex flex-col '>
            <div className='flex gap-2'>
            <p className='text-blac font-semibold font-zentry-regular'>{firstname}</p>
            <p className='text-blac font-semibold font-zentry-regular'>{lastname}</p>
                   
            </div>
            <p className='font-thin font-robert-regular text-[0.8rem]'>{email}</p>
        </div>   </div>
       < div className='flex flex-col'>
           <div className='border-2 max-w-[800px] max-h-[300px] flex flex-grow px-2 py-2 rounded-lg
           bg-[#FCFCFD] relative'>
           <textarea 
           type='textarea'
           id='feedDetail'
           value={feedDetail}
           onChange={(e) => setFeedDetail(e.target.value)}
           name="feedDetail" placeholder='What On Your Mind'
          className='outline-none w-full max-h-[250px] min-h-[200px] text-[1.2rem] font-zentry-regular text-black/80 bg-[#FCFCFD]'></textarea>
           </div>
            <div className='absolute bottom-2 right-2 cursor-pointer' onClick={() => setShowEmoji(!showEmoji)}><GrEmoji/>
                       </div>
                       { showEmoji && 
                         <div className='absolute top-52 mt-1 right-0 h-full'><Picker data={data} emojiSize={10} emojiButtonSize={20}
                          onEmojiSelect={addEmoji} 
                          maxFrequentRows={0}/> </div> }
                  </ div>
     <div className='absolute top-2 right-4 bg-gray-100 px-3 py-1 rounded-md cursor-pointer'
     >X</div>
   <div className='flex mt-3 px-2 items-center gap-3 mb-5'>
     <div className='font-zentry-regular text-black/80'>Edit this feed:</div>
     <div className='bg-gray-500/10 px-2 py-[7px] rounded-md text-black/80 cursor-pointer font-zentry-regular'>
     <input type='file'
                 id="feedUrl"
                 // accept='image/*'
                name='feedUrl'
                onChange={(e) =>  setFile(e.target.files[0])}
                
               /> 
               {/* <p>{file}</p> */}
     {/* Upload/images */}
     </div>
     <div className='bg-gray-500/10 px-2 py-[7px] rounded-md text-black/80 cursor-pointer font-semibold font-zentry-regular'># Hashtag</div>
   </div>
    <button type='submit' className='w-full p-2 rounded-lg bg-[#2f71fd] text-white font-zentry-regular font-semibold'>
       {isLoading ? 'Loading...': 'Edit Feed'}
    </button>
   </form>
  )
}

export default EditForm
  