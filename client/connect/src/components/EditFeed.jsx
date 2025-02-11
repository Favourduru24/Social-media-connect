import EditForm from './EditForm'
import { useParams } from 'react-router-dom'
import { useGetFeedsQuery } from '../features/feed/feedsApiSlice'


const EditFeed = () => {
 const {id} = useParams()

 const { feeds} = useGetFeedsQuery("feedsList", {
     selectFromResult: ({ data }) => ({
         feeds: data?.entities[id]
     }),
 })

  
 if (!feeds) return <p>Loading...</p>

 const content =  <>
  <div className='flex justify-center items-center absolute z-[100] h-dvh w-screen overflow-hidden bg-[#FCFCFD]'>
 <div className='bg-white w-[45rem] h-fit mb-20 rounded-xl shadow-2xl'> 
      <EditForm feeds={feeds}/>
  </div>
 </div>
 </>


     return content
}

export default EditFeed