import img1 from '/images/blank.png'
import { GrEmoji } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import {useState} from 'react'
import {useAddNewFeedMutation} from '../features/feed/feedsApiSlice'
import {makeRequest} from '../app/axios'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import useAuth from '../hooks/useAuth'

const CreateFeed = ({handleOpening}) => {
      
  const {firstname, lastname, profile, email, id} = useAuth()

    const [feedDetail, setFeedDetail] = useState('')
       const [file, setFile] = useState(null)
        // const [userId, setUserId] = useState(feeds[0].id)


       const [addFeed,{
        isLoading,
            isError,
            isSuccess,
            error
      }] = useAddNewFeedMutation()

      const upload = async ( ) => {
        try{
          const formData = new FormData()
          formData.append('file', file)
           const res = await makeRequest.post("/upload", formData)   
            return res.data
        } catch(err){
       console.log(err)
        }
        }


      const handleSubmitFeed = async(e) => {
        e.preventDefault()
         let imgUrl = ''
         if(file) imgUrl = await upload()

       await addFeed({feedUrl: imgUrl, feedDetail, firstName:firstname, lastName: lastname, userProfile: profile, userId: id})
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
    < form className="flex flex-col px-5 py-2 z-[150] relative border-[0.1px] rounded-lg"  onSubmit={handleSubmitFeed}>
     <div className='flex items-center gap-3 mb-10'>
        <div className='w-10 h-10 rounded-full'>
             <img src={profile ? `http://localhost:4000/images/`+profile : img1} className=' w-full h-full object-cover rounded-full'/>
                     </div>
        <div className='flex flex-col '>
            <div className='flex gap-2'>
            <p className='dark:text-white font-semibold font-zentry-regular'>{firstname}</p>
            <p className='dark:text-white font-semibold font-zentry-regular'>{lastname}</p>
                   
            </div>
            <p className='font-thin font-robert-regular text-[0.8rem] dark:text-white'>{email}</p>
        </div>
     </div>
        < div className='flex flex-col'>
      <p className={`${errClass}`}>{error?.data?.message}</p>   
            <div className='border-[0.1px] max-w-[800px] max-h-[300px] flex flex-grow px-2 py-2 rounded-lg
            bg-[#FCFCFD] relative dark:bg-black/50 '>
            <textarea 
            type='textarea'
            onChange={(e) => setFeedDetail(e.target.value)}
            value={feedDetail}
            id='feedDetail'
            name="feedDetail" placeholder='What On Your Mind'
           className='outline-none w-full max-h-[250px] min-h-[200px] text-[1.2rem] font-zentry-regular text-black/80 bg-[#FCFCFD] dark:bg-black/5 rounded-md dark:text-white'></textarea>
            <div className='absolute bottom-2 right-2 cursor-pointer' onClick={() => setShowEmoji(!showEmoji)}><GrEmoji className='dark:text-white'/>
            </div>
            { showEmoji && 
              <div className='absolute top-52 mt-1 right-0 h-full'><Picker data={data} emojiSize={10} emojiButtonSize={20}
               onEmojiSelect={addEmoji} 
               maxFrequentRows={0}/> </div> }
            </div>
                   </ div>
      <div className='absolute top-2 right-4 bg-gray-100 px-3 py-1 rounded-md cursor-pointer'
          onClick={handleOpening}
      ><RxCross2 className="font-robert-regular size-5"/></div>
    <div className='flex mt-3 px-2 items-center gap-3 mb-5'>
      <div className='font-zentry-regular text-black/80 dark:text-white '>Add to your post :</div>
      <div className='bg-gray-500/10 px-2 py-[7px] rounded-md text-black/80 cursor-pointer font-zentry-regular dark:bg-white'>
      <input type='file'
                  id="feedUrl"
                  accept='image/*'
                 name='feedUrl'
                 className='cursor-pointer'
                onChange={(e) =>  setFile(e.target.files[0])}
                /> 
      {/* Upload/images */}
      </div>
      <div className='bg-gray-500/10 px-2 py-[7px] rounded-md text-black/80 cursor-pointer font-semibold font-zentry-regular dark:bg-white'># Hashtag</div>
    </div>
     <button type='submit' className='w-full p-2 rounded-lg bg-[#2f71fd] text-white font-zentry-regular font-semibold'>
     {isLoading ? 'Loading...': 'Share'}
     </button>
    </form>
  )
}

export default CreateFeed



 