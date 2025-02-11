 import img from  '/images/splash.jpg'
 import img1 from '/images/smiley.webp'
 import Form from '../../components/Form'
import { useState, useEffect} from 'react'
import { useRef } from 'react'
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import {useAddNewUserMutation} from './usersApiSlice'
import { useNavigate } from 'react-router-dom'
import { IoMdNotificationsOutline } from "react-icons/io"



// Login
import { useDispatch } from 'react-redux';
import { setCredentials } from '../auth/authSlice'
import {useLoginMutation} from '../auth/authApiSlice'
import usePersist from '../../hooks/usePersist'

const SignUp = () => {

       const icons = IoMdNotificationsOutline    
      // SignUp Function && Authentication 
      const [signNewUser, {
        isLoading,
        isError,
        isSuccess,
         error
      }] = useAddNewUserMutation()
      
         const navigate = useNavigate()
         const navigation = useNavigate()
          
         const [firstname, setFirstname] = useState('')
         const [lastname, setLastname] = useState('')
         const [password, setPassword] = useState('')
         const [email, setEmail] = useState('')

         useEffect(() => {
           if(isSuccess){
            setFirstname('')
            setLastname('')
            setEmail('')
            setPassword('')
            navigation('/welcome')
           }
         },[isSuccess, navigation])
         
        const handleFirstname = e => setFirstname(e.target.value)
        const handleLastname = e => setLastname(e.target.value)
        const handlePasswords = e => setPassword(e.target.value)
        const handleEmail = e => setEmail(e.target.value)

        const handleSignIn = async (e) => {
           e.preventDefault()
               await signNewUser({firstname, lastname, email, password})
        }
         
        const errClass = isError ? <p className='errmsg'>{error?.data?.message}</p> : null 
       // End SignUp Authentication
           
       //Login User && Authntication.
    const [loginPassword, setLoginPassword] = useState('')
    const [loginEmail, setLoginEmail] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const dispatch = useDispatch()

    const [login, {
       isLoading: loginLoading,
       isSuccess :loginSuccess,
       isError: loginIsError,
       error:  loginError      
     }] = useLoginMutation()

    useEffect(() => {
  if(loginSuccess){
    setLoginEmail('')
    setLoginPassword('')
    navigate('/users')
    }
    },[loginSuccess, navigate])

    useEffect(() => {
     if(errMsg) return setErrMsg(' ') 
    },[loginEmail, loginPassword])

  //  const errClass = loginIsError ? <p className='text-red-600'>{isError?.data?.message}</p> : null 

       const handleEmailLogin = (e) => setLoginEmail(e.target.value)
       const handlePasswordLogin = (e) => setLoginPassword(e.target.value)
       const handlePersist = () => setPersist(prev => !prev)
       
       const handleLogin = async (e) => {
        e.preventDefault()
        try {
        const  {accessToken } = await login({email: loginEmail, password:loginPassword}).unwrap()
        dispatch(setCredentials({ accessToken }))
        
      } 
     catch(err){
      if (!err.status) {
        setErrMsg('No Server Response`');
    } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
    } else if (err.status === 401) {
        setErrMsg('Unauthorized');
    } else if(loginIsError){
        setErrMsg(loginError.data?.message);
    }else{
         setErrMsg(err.data?.message)
        //  null
    }
    // errRef.current.focus();
      } 
    }
        //  End Login && Authentication.

  // Interaction in the form State
   const [allow, setAllow] = useState(false)
   const [lightMode, setLightMode] = useState(true)
   const [open, setOpen] = useState(false)
   const [show, setShow] = useState('password')
   
    //Interaction in the form
    const handleAllowance = () => {
      setAllow((prev) => !prev)
    }
    const handleOpen = () => {
      setOpen((prev) => !prev)
    }

   const handlePassword = () => {
      setShow((prev) => !prev)
    }




    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme"): "system")
       const element = document.documentElement

       const darkQuery = window.matchMedia("(prefers-color-scheme: dark)")

     const options =  [
        {
            icon:"sunny",
            text:"light",
            i:'L'
        },
        {
            icon:"moon",
            text:"dark",
            i:'D'
        },
        {
            icon:"desktop-outline",
            text:"system",
            i:'L'
        }
     ]
      
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

    //End


     

  const content = (
     <>
     <div className="fixed top-2 right-10 duration-100 dark:bg-slate-700 bg-gray-100 rounded-full">
    {options.map((opt) => (
  <button className={`w-8 h-8 leading-9 text-xl rounded-full m-1 ${theme === opt.text && 'text-sky-600'}`} name={opt.icon} key={opt.text}
    onClick={() => setTheme(opt.text)}
  >{opt.i}</button>
    ))}
</div>

  <section className='dark:bg-zinc-800 h-screen flex justify-center items-center bg-black dark:text-white text-black'>
       <div className='w-[45rem] dark:bg-zinc-800 border-2 h-[28rem] flex p-2 rounded-md bg-white'>
        <div className='w-[22rem] rounded-md h-full relative'>
      {allow ? <img src={img} className='w-full object-cover object-center h-full rounded-md'/> 
             : <img src={img1} className='w-full object-cover object-center h-full rounded-md'/> }
        
        </div>
        <div className='flex  flex-col ml-10'>
            <div className='flex flex-col'>
              <p className= 'text-3xl d  font-robert-regular mt-4 '>{allow 
                ? 'Create an Account'
                : 'Login'}</p>
                 
               {allow ? <p className=' text-start font-robert-regular mt-2 ml-2 text-[12px]'> Already have an account? <span className='underline cursor-pointer' onClick={handleAllowance}>Login</span> </p> : <p className='text-start font-robert-regular mt-2 ml- text-[12px]'>Dont have an Account? <span className='underline cursor-pointer' onClick={handleAllowance}>SignUp</span></p>}
       {allow && isError && <p className='font-zentry-regular bg-red-500 text-white rounded-lg p-2 max-w-[15rem]'>{error?.data?.message}</p>}
      <p className={`${errClass}`}>{error?.data?.message}</p>   

           {!allow && <p  className='text-red-500 font-robert-regular font-semibold' aria-live='assertive'>{errMsg}</p>}
           
                <form className='flex flex-col mt-8' onSubmit={allow ? handleSignIn : handleLogin}>
                    {allow && <div className=' flex gap-2'>
                      <Form 
                      type="text" 
                      placeholder='First name'
                      name="firstname"
                      id="firstname"
                       className='w-[9rem] h-[37px] bg-[#2f71fd] rounded-md p-2 text-white outline-none  placeholder:font-robert-regular placeholder:text-black/50'handleChangeValue={handleFirstname} value={firstname}/>
                      <Form type="text" placeholder='Last name'
                      name="lastname"
                      id="lastname"
                       className='w-[9rem] h-[37px] bg-[#2f71fd] rounded-md p-2 text-white outline-none placeholder:text-black/50' handleChangeValue={handleLastname} value={lastname}/>
                    </div>}
                    {!allow && loginIsError && <p className='text-red-500 font-robert-regular font-semibold' aria-live='assertive'>{loginError?.data?.message}</p>}
                    <div className='flex flex-col mt-5 gap-2'>
                    <Form 
                    type="email" 
                    placeholder='name@gmail.com'
                    name="email"
                      id="email" 
                    className='w-[300
                    px] h-[37px] bg-[#2f71fd] rounded-md p-2 text-white outline-none placeholder:text-black/50' 
                    required 
                    handleChangeValue={allow ? handleEmail : handleEmailLogin} value={allow ? email : loginEmail}
                    />

                    <div className='relative'>
                    <Form 
                    type={show} 
                    placeholder='**********' 
                    name="password"
                      id="password"
                    className='w-[300px] h-[37px] bg-[#2f71fd] rounded-md p-2 text-white outline-none placeholder:text-black/50' 
                    handleChangeValue={ allow ? handlePasswords : handlePasswordLogin} value={allow ? password : loginPassword } autoComplete='off' />
                    { show === 'password' ?
                    <div className='absolute top-3 right-2' >
                    <FaEyeSlash size='15' className='text-black/50 cursor-pointer' onClick={() => setShow('text')}/>
                    </div> 
                    : <div className='absolute top-3 right-2' >
                    <FaEye size='15' className='text-black/50 cursor-pointer' onClick={() => setShow('password')}
                    />
                    </div> }
                    </div>
                    </div>

                   {!allow && <div className='flex gap-2 ml-1 mt-5 items-center' >
                        <Form type='checkbox'
                        name="checkbox"
                         id="checkbox"
                         handleChangeValue={handlePersist}
                         checked={persist}
                         className='cursor-pointer'
                         />

                        <p className=' text-start font-robert-regular  ml-2 text-[12px]'>i Agree to the terms and condition</p>
                        </div>}
                    { isLoading || loginLoading ?
                     <button type="submit" className=
                       'h-[2.5rem]  bg-zinc-800 text-white rounded-md w-[300px] mt-5 font-semibold font-robert-regular'>Loading...</button> 
                        :<button type="submit" className='h-[2.5rem] bg-black dark:bg-white dark:text-black rounded-md w-[300px] mt-5 font-semibold font-robert-regular text-white'>{allow ? 'Create Account': 'Login' } </button> 
                        }
                        <div className='mt-5 flex items-center gap-2 ml-5'>
                        <div className='w-16 h-[0.1px] bg-black dark:bg-white'/>
                         <div className='font-robert-regular text-[12px]'>or register with google</div>
                         <div className='w-16 h-[0.1px] bg-black dark:bg-white'/>
                         </div> 
                   </form>

                </div>
                </div>
                </div>
         </section>
     </>
  )
   return content
}

export default SignUp