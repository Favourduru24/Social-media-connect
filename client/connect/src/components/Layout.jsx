 import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Header from "./Header"

 
 const Layout = () => {
  
   return (
      <>
      <main className="bg-[#FCFCFD] dark:bg-black/30">
                 <Header/>
       <div className="grid grid-cols-12 sm:px-10 py-8 px- gap-2">
               <div className="col-span-3 rounded-md   ">
              <Navbar/>
                </div>
              <Outlet/>
       </div>
    </main>
     </>
  )
 }
 
 export default Layout