 import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import {sideBar} from '../constant/index'
import useAuth from '../hooks/useAuth'
import img1 from '/images/blank.png'


 
 const Navbar = () => {
    const pathname = useLocation()

    const {id, firstname, lastname, email, address, bio, work, school, relationship, birthday, profile, Cover} = useAuth()

      
 
   return (
     <div className='h-screen flex flex-col px-4 py- sticky lg:relative top-0 gap-5 dark:bg-black/50 rounded-lg p-1'>
          <div className='flex flex-col  px-5 bg-white rounded-xl  shadow-lg gap-1 py-2 dark:bg-black/5'>
            <div className='bg-[#FCFCFD] p-2 rounded-lg dark:bg-black/5 dark:text-white'>
              <div className='flex gap-3  items-center py-2 '>
                <div className='w-10 h-10'>
                <img src={profile ? `http://localhost:4000/images/`+profile : img1} className=' w-full h-full object-cover rounded-full'/>
                </div>
                <div className='flex flex-col '>
                  <div className='flex items-center gap-2'>
               <p className='font-semibold font-zentry-regular'>{firstname}</p>
               <p className='font-semibold font-zentry-regular'>{lastname}</p>
               </div>
               <p className='font-thin font-robert-regular text-[0.8rem]'>{email}</p>
               <p></p>
                </div>

             </div>
             <p className='text-sm text-justify px-2 font-zentry-regular leading-5 truncate'><i>{bio} </i></p> 
              <div>
                <p className='px-2 mt-1 text-sm font-zentry-regular'>Address: <span className='font-semibold'>{address}</span></p>
              </div>
              <div>
                <p className='px-2 mt-1 text-sm font-zentry-regular'>Work status: <span className='font-semibold'>{work}</span></p>
              </div>
              <div>
                <p className='px-2 mt-1 text-sm font-zentry-regular'>School: <span className='font-semibold'>{school}</span></p>
              </div>
              </div>
             {/* //to build and solve real life problem with my skills as a developer */}
            
                    <button className='bg-[#2f71fd] p-2 rounded-lg text-[1rem] font-semibold text-white mt-2 cursor-pointer'>
                    <Link to='/friends' className='w-full'>See More
                    </Link>
                    
                    </button>
             </div>
      <div className='flex flex-col gap-4 bg-white rounded-xl py-2 shadow-lg dark:bg-black/10 '> 
           {sideBar.map((nav) => (
           <Link to={nav.href} key={nav.id}>
            <div className={`${pathname.pathname === nav.href ? 'flex  items-center gap-2 text-white p-2 rounded-md bg-[#2f71fd] mx-2 font-robert-regular ' : 'flex  items-center gap-2 text-black/50 p-2 rounded-md mx-2 font-zentry-regular dark:text-white dark:border-[#2f71fd]'}`}>
              <div className='w-5 h-5'><img src={nav.images} alt="icon/images" className='w-full h-full text-white ' /></div>
            <h2 >{nav.label}</h2> 
            </div>
            </Link>
           ))}
      </div>
     </div>
   )
 }
 
 export default Navbar