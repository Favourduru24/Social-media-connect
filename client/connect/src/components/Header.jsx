import { Link, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useSendLogoutMutation} from '../features/auth/authApiSlice.js'
import { MdLogout } from "react-icons/md";
import useAuth from "../hooks/useAuth"
import { updateSearchTerm } from '../app/api/searchSlice.js';
import { useDispatch } from 'react-redux';
import { IoMdNotificationsOutline } from "react-icons/io"
import { IoSunnyOutline } from "react-icons/io5";
import img1 from '/images/blank.png'





const Header = () => {

  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme"): "system")
  const element = document.documentElement

  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

  
 function onWindowMatch () {
   if(localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches)) {
       element.classList.add('dark')
   } else {
       element.classList.remove('dark')
   
 }

   
 }
 
 onWindowMatch()

 useEffect(() => {
switch (theme) {
   case "dark":
       element.classList.add("dark")
       localStorage.setItem("theme", "dark")
       break;
       case "light": 
        element.classList.remove("dark")
       localStorage.setItem("theme", "light")

        break;
   default:
       localStorage.removeItem("theme")
          onWindowMatch()
       break;
}
 },[theme])

 darkQuery.addEventListener("change", (e) => {
   if(!("theme" in localStorage)) {
       if(e.matches){
           element.classList.add("dark")
       }else {
           element.classList.remove("dark")
       }
   }
 })



  const handleMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

   const handle = () => {
     setTheme(theme === 'system') 
   }


  const {id, firstname, lastname,  profile} = useAuth()

   

 const navigate = useNavigate()
 const [sendLogout, {
    isSuccess,
   isLoading,
   isError,
   error
 }] = useSendLogoutMutation()
      
 useEffect(() => {
     if(isSuccess) navigate('/welcome')
 }, [isSuccess, navigate])

   const onLogoutClicked = () => sendLogout()
     
     if(isLoading) return <p>Logging Out...</p>

    if(isError) return <p>Error: {error.data?.message}</p>

     const logoutButton = (
      <button 
      className='cursor-pointer bg-slate-100 p-1 rounded-sm ' 
      title='Logout'
      onClick={onLogoutClicked}
      >
           <MdLogout/>     
      </button>
     )

        //Search Logic

         const [searchTerm, setSearchTerm] = useState('')

         const dispatch = useDispatch()

          const handleSearch = (e) => {
            e.preventDefault()
            dispatch(updateSearchTerm(searchTerm))
             
          }
          
  return (
     <header className='flex justify-between items-center py-2 sm:py-4 bg-white mt-2 rounded-md sm:px-10 px-5 dark:bg-black/50'>
           <div className='flex items-center gap-2 '>
            <div className='bg-[#2f71fd]
             rounded-sm'>
                <p className='text-white my-1 mx-3'>H</p>
            </div>
            <p className='font-semibold text-black font-zentry-regular dark:text-white'
            >C{' '}o{' '} n{' '}n{' '}e{' '}c{' '}t</p>
            </div>
            <form className='border- flex-grow max-w-[400px] items-center justify-center' onSubmit={handleSearch}>
                <div className='flex flex-grow border-2 rounded-md '>
                <input type='text'
            placeholder='Search...'
            className='outline-none w-full h-8 px-2 rounded-md placeholder:font-zentry-regular bg-[#FCFCFD]'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
                {/* <button type='submit'>Search</button> */}
           </form>


           
         <nav className='flex items-center gap-5'>
          
          <div className='flex items-center gap-2'>
          {logoutButton}
          <div className='cursor-pointer bg-slate-100 p-1 rounded-sm'><IoMdNotificationsOutline/></div>
          <div className='cursor-pointer bg-slate-100 p-1 rounded-sm'><IoSunnyOutline onClick={handleMode}/></div>
          </div>
          {profile || img1 ?  <div className='w-10 h-10'>
           <Link 
            to={`/user/${id}`}>
                          <img src={profile ? `http://localhost:4000/images/`+profile : img1} className=' w-full h-full object-cover rounded-full'/>
                          </Link>
                          </div> 
                          :
          <Link to='/welcome'><div className='bg-[#2f71fd] py-2 px-4 rounded-full cursor-pointer'>
           <p className='text-white font-zentry-regular font-semibold dark:text-red-2'>SignUp</p></div></Link>
          }
          <div className='flex gap-2 items-center'>
          <div className='font-zentry-regular font-semibold dark:text-white'>{firstname}</div>
          <div className='font-zentry-regular font-semibold dark:text-white'>{lastname}</div>
          </div>
</nav>

     </header>
  )
}

export default Header
  