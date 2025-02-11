import {Routes, Route} from 'react-router-dom'
import Layout from './components/Layout'
import Post from './components/Post'
import Events from './components/Events'
import Friends from './components/Friends'
import Files from './components/Files'
import Videos from './components/Videos'
import Profile from './components/Profile'
import SignUp from './features/user/SignUp'
import Practice from './components/Practice'
import Prefetch from   './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import Open from './components/Open'
import Feed from './components/Feed'
import EditFeed from './components/EditFeed'
import EditProfile from './components/EditProfile'
import FeedDetail from './components/FeedDetail'
import UserDetail from './components/UserDetail'


  const App = () => {
     

       return (
          <>
          <main className='dark:bg-black/50'>
            <Routes>
            <Route path='/welcome'>
                <Route index element={<SignUp/>}/>
                <Route path='open' element={<Open/>}/>
              </Route>
              
               <Route element={<PersistLogin/>}>
             <Route element={<Prefetch/>}>
              
              <Route path='/' element={<Layout/>}> 
               <Route index element={<Post/>}/>   
               {/* <Route path='/feed' element={<Feed/>}/>        */}
               <Route path='/events' element={<Events/>}/>       
               {/* <Route path='/friends' element={<Friends/>}/>        */}
               <Route path='/files' element={<Files/>}/>       
               <Route path='/videos' element={<Videos/>}/>       
               <Route path='/profile' element={<Profile/>}/>  
               <Route path='/users' element={< Practice/>}/>  

                <Route path="/feed">
                     <Route index element={<Feed />} />
                     <Route path=":id" element={<EditFeed/>} />
                   </Route> 
                <Route path="/friends">
                     <Route index element={<Friends />} />
                     <Route path=":id" element={<EditProfile/>} />
                   </Route> 
                   <Route path="/post/:id" element={<FeedDetail/>} />
                   <Route path="/user/:id" element={<UserDetail/>} />

            </Route>

             </Route>
            </Route> 
              
            </Routes>

            {/* <section className='mb-96'/> */}
          </main>
          {/* <section className='mb-[100rem] bg-gray-500'/> */}

          </>
     //    <>
     // <div className='h-20 w-20 text-[#2f71fd] font-bold text-2xl mb-10'>
     //  f
     // </div>

     // <div className='w-20 h-8 bg-[#2f71fd] rounded-lg  text-white flex items-center justify-center ml-2'>
     //      Connect
     // </div>
     // <div className='w-20 h-8 bg-[#FF5A5F] rounded-lg  text-white flex items-center justify-center ml-2'>
     //      Connect
     // </div>
     // <div className='w-20 h-8 text-[#404040] rounded-lg  text-2xl flex items-center justify-center ml-2'>
     //      Connect
     // </div>
     // <div className='w-20 h-8 text-[#808080] rounded-lg  text flex items-center justify-center ml-2'>
     //      Adventure Drone
     // </div>
     // </>

   )

 }
 
 export default App