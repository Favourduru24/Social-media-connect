import img from  '/images/splash.jpg'
import img1 from '/images/blank.png'
import EditProfile from './EditProfile'
import { useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
// import { FriendRequest } from './UserDetail'
import { useGetUserQuery } from '../features/user/usersApiSlice'
import { useGetUsersQuery } from '../features/user/usersApiSlice'


const Friends = () => {
    
  const [open, setOpen] = useState(false)

   const handleOpening = () => {
      setOpen((prev) => !prev)
   }
    
   const {id, firstname, lastname, email, password, address, bio, work, school, relationship, birthday, profile, Cover} = useAuth()

   

    

  const {data} = useGetUserQuery(id)

   console.log({data})
   
   const navigate = useNavigate()

  const handleEdit = () => navigate(`/friends/:id`)

     

  return (
    <>
          
    <div className="flex flex-col col-span-5 mb-80">
        <div className='flex flex-col gap-2'>
           <p className='font-zentry-regular text-2xl text-white font-semibold  mb-4'>Friends</p>
            <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col '>
            {data?.friendRequest.map((friend) => (              
       <div className='flex items-center gap-2 border-2 p-2 rounded-md cursor-pointer'>
        <div className='w-10 h-10'>
       <img src={friend?.profile ? `http://localhost:4000/images/`+ friend?.profile : img1} className='w-full h-full object- rounded-full'/>
        </div>
        <div className='flex-col'>
             <p className='font-semibold font-zentry-regular'>{friend?.firstname} {friend?.lastname}</p>
              <p className='text-[12px]'>{friend?.email}</p>
        </div>
       </div> 
      ))}                 
                </div>

                 
                
            </div>
        </div>
     </div>

    <div className='col-span-4  p-2 rounded-md  mb-80 flex flex-col bg-black text-white' >
       <div className='flex flex-col '>
         <div className='flex justify-between'>
           <p className='font-semibold'>Request</p>
           <p className='font-medium underline-offset-4 text-[#2f71fd] underline'>Veiw All</p>
         </div>
         <div className='mt-5 flex flex-col gap-2'>
          {/* <FriendRequest/> */}
         </div>
       </div>
    </div>
    </>
  )
}

export default Friends

