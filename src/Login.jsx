import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverRoute } from './App'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [error,setError] = useState()
    const navigate = useNavigate()
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
          if(email && password){
            const result = await axios.post(serverRoute+'/auth/login',{email,password,type:'admin'})
            if(result.status === 200){
              setError(undefined)
              localStorage.setItem('token',result.data.token)
              navigate('/')
            }
          }
        } catch (error) {
          setError(error.response.data)
        }
      
      }
      useEffect(()=>{
        if(localStorage.getItem('token')){
            window.location.href = '/'
        }
    },[])
  return (
    <div className="flex  justify-center items-center w-full h-screen">
    <div className='bg-gray-200 w-2/3 flex flex-col items-center justify-center rounded-lg py-5'>
      <img src='/individual 1.png'/> 
      <form className='flex flex-col gap-y-5 my-2 p-2 w-2/3 justify-center items-center' onSubmit={handleSubmit}>
        <input type='email' className='text-lg rounded-lg outline-none px-2 py-1 w-10/12' placeholder='Email' required onChange={(e)=>setEmail(e.target.value)}/>
        <input type='password' className='text-lg rounded-lg outline-none px-2 py-1 w-10/12' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)}/>
        <button className='bg-green-500 text-white py-2 px-5 rounded-xl w-10/12'>Login</button>
        {error && <span style={{color:'red'}}>{error}</span>}
      </form>
    </div>
  </div>
  )
}

export default Login