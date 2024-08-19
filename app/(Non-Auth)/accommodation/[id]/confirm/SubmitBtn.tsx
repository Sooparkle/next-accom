'use client'
import React, { useEffect, useState } from 'react';
import styles from '../../../../styles/Confirm.module.scss';
import { useStore } from 'zustand'
import useAccommodationStore from "@/app/util/useAccommodationStore";
import { useFormState, useFormStatus } from 'react-dom';
import { ConfirmDataType, UserType } from '@/app/util/types';
import {confirmSumbitFn} from '@/app/util/submitFn';
import CalendarArea from '../CalendarArea';
import { formatCurrency } from '@/app/util/currencyFormat';
import { AccomDataType } from "@/app/util/types";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { useRouter } from 'next/navigation'

const initialState = {
  message : "",
}

const SubmitButton = ({preConfirmData} : {preConfirmData : ConfirmDataType | null}) =>{
  const { pending } = useFormStatus();

  return(
    <button
    type="submit"
    aria-disabled={pending}
    disabled={pending}
    className={styles.confirmSubmitBtn}
  >
    {pending ? "예약 전송중": "예약하기"}
  </button>

  )
}

const SubmitBtn = ({
  accommodation,
  user,
  params
} : {
  accommodation : AccomDataType,
  user : UserType | null
  params : string
}) => {
  const [ state, formAction ] = useFormState(confirmSumbitFn, initialState); 
  const accoms = useStore(useAccommodationStore, (state) => state.accomData) ;
  const router = useRouter();
  const start = accoms?.start_date?.toISOString().split('T');
  const end = accoms?.end_date?.toISOString().split('T');
  let total = accommodation ?  accommodation.extra_adult + accommodation.extra_child : 0;
  
  const [ startDate, setStart ] = useState(start ? start[0] : undefined);
  const [ endDate, setEnd ] = useState(end ? end[0] : undefined);

  const [ adult, setAdult ] = useState<number>(accoms?.extra_adult || 0);
  const [ child, setChild ] = useState<number>(accoms?.extra_child || 0);
  const [ totalStayingNumbers, setTotalStayingNumbers ] = useState<number>(0);
  const [ totalStayingNights, setTotalStayingNights ] = useState<number>(0);
  const [ totalStayingPrice, setTotalStayingPrice ] = useState<number>(accoms?.total_price || 0);

  if(!accoms){
    router.push(`/accommodation/${params}`);
  }
  
    const basicPrice = Number(accommodation ? accommodation?.price.replace(",", "") : 0);
    const extraAdultPrice = accommodation?.extra_adult * adult;
    const extraChildPrice = accommodation?.extra_child * child;
    const totalStayingNightsPrice = basicPrice * totalStayingNights
    let totalPrice = extraAdultPrice + extraChildPrice + totalStayingNightsPrice
    console.log("------------------");
    console.log("basic", basicPrice)
    console.log("extraAdultPrice", extraAdultPrice)
    console.log("extraChildPrice", extraChildPrice)
    console.log("basic", totalStayingNightsPrice)




  useEffect(()=>{
    const calculateStayingNights = () =>{ 
      const oneDayMs = 24 * 60 * 60 * 1000;
      const startMs =  startDate ?  Date.parse(startDate) : 0;
      const endMs = endDate ? Date.parse(endDate) : 0 ;
      const timeGap = endMs - startMs;

      const numberOfDays = Math.ceil(timeGap/oneDayMs);
      setTotalStayingNights(numberOfDays -1);
    }
    calculateStayingNights();
  },[startDate,endDate])



  console.log("CONFIRM Zustand", accoms)

  const handleDate = (date : string, e:React.ChangeEvent<HTMLInputElement>) =>{

    if(date === 'start'){
      setStart(e.target.value)
    }
    if(date==='end'){
      setEnd(e.target.value)
    }

  }






  const handleTotalExtraNumber = (data : string ,e:React.ChangeEvent<HTMLInputElement>) =>{
    const newNumber = Number(e.target.value)
    console.log("work")
    if(newNumber < 0 ) return window.alert("인원을 축소할 수는 없어요...")

    if(child == undefined || adult === undefined){
      console.log("데이터가 없어요.")
      return
    }


    if(data ==='child'){
      if( child >= 0){
        setChild(newNumber);
      } 
    } 
    
    if(data ==='adult'){
      if(adult >= 0 ){
        setAdult(newNumber);
      }
    }
  }


  const handleAdultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAdult = Number(e.target.value);
    if (newAdult >= 0 && totalStayingNumbers > 0) {
      setAdult(newAdult);
    }
  };


  const handleChildChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChild = Number(e.target.value);
    if (newChild >= 0 && totalStayingNumbers > 0) {
      setChild(newChild);
    }
  };


  //adult counter number
  const handleAdultdNumber = (buttonType : string) =>{
    if(buttonType ==='plus'){
      if(totalStayingNumbers < accommodation?.max_occupancy ){
        setTotalStayingNumbers(prev => prev + 1);
        setAdult(prev => prev + 1)
        return
      }
    }

    if(buttonType === 'minus'){
      if(adult > 0 ){
        setTotalStayingNumbers(prev => prev - 1);
        setAdult(prev => prev - 1)
        return
      }
    }
  }

  // childern counter number
  const handleChildNumber = (buttonType : string) =>{
    if(buttonType ==='plus'){
      if(totalStayingNumbers < accommodation?.max_occupancy ){
        setTotalStayingNumbers(prev => prev + 1);
        setChild(prev => prev + 1)
        return
      }
    }

    if(buttonType === 'minus'){
      if(child > 0 ){
        setTotalStayingNumbers(prev => prev - 1);
        setChild(prev => prev - 1)
        return
      }
    }
  }


  const totalLocalFormatCurrency = formatCurrency(totalPrice) || formatCurrency(accoms ? accoms?.total_price : 0 );

  
  return (
    <>

      <section
        className={styles.confirmPersonalInfo}
      >
        <h3>예약자 정보</h3>
        <form
        action={formAction}
        >
          <div>
            <label htmlFor="name">
              예약자 이름
              <input 
                type="text" 
                id="name" 
                name='name'
              />
            </label>
          </div>
          <div>
            <label htmlFor="tel">
              연락처
              <input
                type="tel"
                id="tel"
                name='tel'
                placeholder="010-1234-1234"
                pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                
              />
            </label>
          </div>
          <div>
            <label htmlFor="email">
              이메일
              <input
                type="email"
                id="email"
                name='email'
                value={user?.email}
                required
              />
            </label>
          </div>


        <h3
          style={{
            marginTop : "1rem"
          }}
        >예약 정보</h3>
        <p>숙박 일정</p>
        <div
          className={styles.stayingDaysWrap}
        >
          <div>
            <label 
            htmlFor="start" 
            >시작일
              <input 
                type="date"
                value={startDate}
                onChange={(e)=>handleDate('start', e)}
                name='start'
                id='start'
              />
            </label>
          </div>
          <div>
            <label 
            htmlFor="end" 
            >종료일
              <input 
                type="date"
                value={endDate}
                onChange={(e)=>handleDate('end',e)}
                name='end'
                id='end'
              />
            </label>
          </div>
        </div>



          <p>숙박 인원</p>
          <div
            className={styles.stayingCounterNumbersWrap}
          >
            <div
            className={styles.numberBtn}
            >
              <label htmlFor="adult">
                <input 
                  value={adult}
                  // onChange={handleAdultChange}
                  // onChange={(e)=>setAdult(Number(e.target.value))}
                  type="text" 
                  name="adult" 
                  id="audlt"
                  disabled={adult === total}
                />
              </label>
              <div
                aria-disabled={totalStayingNumbers === accommodation?.max_occupancy}
                onClick={()=>handleAdultdNumber('plus')}
              >
                <CiCirclePlus />
              </div>
              <div
                aria-disabled={adult === 0}
                onClick={()=>handleAdultdNumber('minus')}
              >
                <CiCircleMinus />
              </div>
            </div>


            <div
              className={styles.numberBtn}
            >
              <label htmlFor="child">
                <input 
                  value={child}
                  // onChange={handleChildChange}
                  type="text"
                  name="child" 
                  id="child"
                />
              </label>
              <div
                aria-disabled={totalStayingNumbers === accommodation?.max_occupancy}
                onClick={()=>handleChildNumber('plus')}
              >
                <CiCirclePlus />
              </div>
              <div
                aria-disabled={child === 0}
                onClick={()=>handleChildNumber('minus')}
              >
                <CiCircleMinus />
              </div>
            </div>

          </div>
          
          <div>
            <p
              style={{
                fontSize:"2rem",
                marginTop:"1rem",
                textAlign:"right",
                paddingTop: "1rem",
                borderTop: "1px solid #ccc"
              }}
            >{totalLocalFormatCurrency}</p>
            <label
              className='hide'
            >
              <input 
                type="number" 
                name="totalprice" 
                id="totalprice" 
                value={totalPrice}
              />

            </label>
          </div>

          {
          state &&
          <p
            className={styles.wornMessage}
          >{state.message}</p>
          }
        <SubmitButton preConfirmData={accoms} />

        </form>

      </section>
  



    </>
  )
}

export default SubmitBtn