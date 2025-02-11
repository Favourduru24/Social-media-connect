import { useState, useEffect} from "react"
import { useUpdateUserMutation } from "../features/user/usersApiSlice"
import { useNavigate, useParams } from "react-router-dom"
import { updateRequest } from "../app/axios"
import  useAuth from '../hooks/useAuth'

const EditProfile = () => {
  // Functionality for editing User Profile
   
   
  const {id, firstname, lastname, email, password, address, bio, work, school, relationship, birthday, profile, Cover} = useAuth()

   console.log({Cover}) 
  //  console.log({profile, lastname})
  
    const [updateUser,{
        isSuccess,
         isLoading,
          isError,
           error
        }] = useUpdateUserMutation()
    
    const [first, setFirst] = useState(firstname)
    const [last, setLast] = useState(lastname)
    const [emailAddress, setEmailAddress] = useState(email)
    const [userBio, setUserBio] = useState(bio)
    const [workStatus, setWorkStatus] = useState(work)
    const [userRelationship, setUserRelationship] = useState(relationship)
    const [userAddress, setUserAddress] = useState(address)
    const [userBirthday, setUserBirthday] = useState(birthday)
    const [userSchool, setUserSchool] = useState(school)
    const [userProfile, setUserProfile] = useState(profile)
    const [userCover, setUserCover] = useState(Cover)

    const navigate = useNavigate()

    useEffect(() => {
        if(isSuccess){
                 setFirst('')
                 setLast('')
                 setEmailAddress('')
                 setUserBio('')
                 setWorkStatus('')
                 setUserRelationship('')
                 setUserAddress('')
                 setUserBirthday('')
                 setUserSchool('')
                 navigate('/friends')
              }
    },[isSuccess, navigate])

      console.log({userProfile})
      console.log({userCover})
      
     const uploadProfile = async () => {
        try{
          const formData = new FormData()
          formData.append('file', userProfile) 
           const res = await updateRequest.patch("/upload", formData)   
            return res.data
        } catch(err){
       console.log(err)
        }
        }

     const uploadCover = async ( ) => {
        try{
          const formData = new FormData()
          formData.append('file', userCover) 
           const res = await updateRequest.patch("/upload", formData)   
            return res.data
        } catch(err){
       console.log(err)
        }
        }


      const handleEditUser = async(e) => {

        e.preventDefault()
         let imgProfile = ''
         let imgCover = ''
         
          if(userProfile) imgProfile = await uploadProfile()
          if(userCover) imgCover = await uploadCover()

       await updateUser({
        id:id, firstname:first, lastname: last, email: emailAddress, address: userAddress, bio: userBio, work: workStatus, relationship: userRelationship, address: userAddress, birthday: userBirthday, school: userSchool, profile: imgProfile, Cover: imgCover  
    })
   }

const errClass = isError ? <p className='errmsg'>{error?.data?.message}</p> : null 
    
//     //The End..
    



  return (
      <div className=" col-span-6 mb-80 place-content-center border-2 rounded-md bg-[#FCFCFD] shadow-xl">
        <p className="text-center my-4 italic font-semibold font-zentry-regular">Edit Your Profile</p>
     <form  className="flex flex-col relative rounded-xl p-2" onSubmit={handleEditUser}>
      
        <div className="flex flex-col  gap-5 ">
             
           <div className="flex justify-between ">
                <div className="w-[16rem]">
                    <input placeholder="Fistname" className="w-full outline-none border-2 p-2 rounded-md font-zentry-regular text-black/60"
                    required
                    autoComplete="on"
                    type="text"
                    name="firstname"
                    value={first}
                    onChange={(e) => setFirst(e.target.value)}
                    />
                </div>
                 <div className="w-[16rem] rounded-md">
                    <input placeholder="Lastname" className="w-full outline-none border-2 p-2 rounded-md font-zentry-regular text-black/60"
                     required
                     autoComplete="on"
                     type="text"
                     value={last}
                     onChange={(e) => setLast(e.target.value)}
                    />
                </div>
              
           </div>
           <div className="w-full ">
                    <input placeholder="name@gmail.com" className="w-full outline-none border-2 p-2 rounded-md font-zentry-regular text-black/60"
                    required
                    autoComplete="on"
                    type="email"
                    name="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    />
                </div>
           <div className="w-full ">
                    <input placeholder="Address: "
                     className="w-full outline-none border-2 p-2 rounded-md font-zentry-regular text-black/60"
                      name="address"
                      value={userAddress}
                      onChange={(e) => setUserAddress(e.target.value)}
                     />
                </div>
                <div>
                <div className='border-2 max-w-[800px] max-h-[300px] flex flex-grow px-2 py-2 rounded-lg
            bg-[#FCFCFD] '>
            <textarea 
            type='textarea'
            id='bio'
            name="bio"
             placeholder='Write Your Bio'
             value={userBio}
             onChange={(e) => setUserBio(e.target.value)}
           className='outline-none w-full max-h-[250px] min-h-[200px] text-[1.2rem] font-zentry-regular text-black/60 bg-[#FCFCFD] '></textarea>
            </div>
          </div>
          <div className="flex justify-between">
                <div className="w-[16rem]">
                    <input placeholder="Work Status"
                     className="w-full outline-none border-2 p-2 rounded-md font-zentry-regular text-black/60"
                      value={workStatus}
                      onChange={(e) => setWorkStatus(e.target.value)}
                      name="bio"
                    />
                </div>
                <div className="w-[16rem] rounded-md">
                    <input placeholder="School" className="w-full outline-none border-2 p-2 rounded-md font-zentry-regular text-black/60"
                      value={userSchool}
                      onChange={(e) => setUserSchool(e.target.value)}
                    />
                </div>
           </div>
           <div className="flex justify-between">
                <div className="w-[16rem]">
                    <input placeholder="Relationship"
                     className="w-full outline-none border-2 p-2 rounded-md font-zentry-regular text-black/60"
                     type="text"
                      value={userRelationship}
                      onChange={(e) => setUserRelationship(e.target.value)}
                     />
                </div>
                <div className="w-[16rem] rounded-md">
                    <input placeholder="Birthday" className="w-full outline-none border-2 p-2 rounded-md font-zentry-regular text-black/60"
                    type="text"
                    name="birthday"
                    value={userBirthday}
                    onChange={(e) => setUserBirthday(e.target.value)}
                    />
                </div>
           </div>
                 <div className="flex flex-col h-fit">
           <div className="flex justify-between">
                <div className="w-[16rem] h-[5rem]" >
                <input type="file" accept="image/*" 
               name='userProfile'
                id="input-field"
                hidden
                onChange={(e) => setUserProfile(e.target.files[0] ? e.target.files[0] : profile)}/>
                 <div className="bg-slate-400 p-2 text-white font-zentry-regular font-semibold rounded-md cursor-pointer w-[16rem] h-[5rem]"
                   onClick={() => document.querySelector('#input-field').click()}
                 >{userProfile? <p>Images Added</p> : 'Upload ur Profile'}</div>
                {/* <img src={URL.createObjectURL(userProfile)} className="w-full h-full rounded-lg object-cover"/> */}
                </div>
                <div className="w-[16rem] h-[5rem]">
                <input type="file" accept="image/*" 
               name='userCover'
                id="input"
                hidden
                onChange={(e) => setUserCover(e.target.files[0] ? e.target.files[0] : Cover)}/>
                 <div className="bg-slate-400 p-2 text-white font-zentry-regular font-semibold rounded-md cursor-pointer w-[16rem] h-[5rem]"
                   onClick={() => document.querySelector('#input').click()}
                 >{userCover? <p>Image Added</p> : 'Upload ur Cover'}</div>
                </div>
                 {/* <img src={URL.createObjectURL(userCover)} className="w-full h-full rounded-lg object-cover"/> */}
                </div> 
                <button type='submit' className='w-full px-2 py-3 rounded-lg bg-[#2f71fd] text-white font-zentry-regular font-semibold mt-5'>
                    {isLoading ? 'Loading...' : 'Edit Your Profile'}
     </button>
                  </div>
                 
             </div>
             
     </form>
     </div>
  )
}

export default EditProfile