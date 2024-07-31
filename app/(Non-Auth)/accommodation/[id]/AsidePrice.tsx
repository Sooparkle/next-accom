"use client";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { AccomDataType } from "@/app/util/types";
import styles from '../../../styles/AccommmodationDetail.module.scss';
import CalendarArea from "./CalendarArea";
import { formatCurrency } from "@/app/util/currencyFormat";
import { FiPlus } from "react-icons/fi";
import StayingNumberBtn from "./StayingNumber";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";


const AsidePrice = ({ accomData }: { accomData: AccomDataType }) => {
  const asideRef = useRef<HTMLElement>(null);
  const [isCalendarOn, setIsCalendarOn ] = useState(false);
  const [isNumbersOn, setIsNumbersOn ] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [ isOpenId, setIsOpenId ] = useState<number | null>(null);
  const [ isOpen, setIsOpen ] = useState<boolean>(false);

  const [ startDate, setStartDate] =  useState<Date | null>(null);
  const [ endDate, setEndtDate] =  useState<Date | null>(null);
  const [ totalNights, setTotalNights ] = useState<number | null>(null) 

  const [ totalNumbers, setTotalNumbers ] = useState<number>(0);
  const [ adult, setAdult ] = useState<number>(0);
  const [ child, setChild ] = useState<number>(0);


  const todayDate = new Date().toLocaleDateString('ko-KR');

  // useEffect(() => {
  //   if (!asideRef.current) return;

  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       setIsSticky(!entry.isIntersecting);
  //     },
  //     {
  //       root: null, // use the viewport as the root
  //       rootMargin: '0px',
  //       threshold: 0 // trigger when the element is not in view
  //     }
  //   );

  //   observer.observe(asideRef.current);

  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  // calendar popup shutdown logic
  useEffect(()=>{
    const closeCalendar = () => setIsOpen(false);

    if(isOpen){
      window.addEventListener('click', closeCalendar)
    }

    return () => window.removeEventListener('click', closeCalendar);

  },[isOpen]);

  const handleCalendar = (e:SyntheticEvent) =>{
    e.stopPropagation();
    setIsCalendarOn(p => !p);
  }

  useEffect(()=>{
    const closeNumber = () => setIsNumbersOn(false);
    if(isNumbersOn){
      window.addEventListener('click', closeNumber);
    }
    return () =>window.removeEventListener('click', closeNumber)
  },[isNumbersOn])

  const handleNumberPopup = (e:SyntheticEvent) =>{
    e.stopPropagation();
    setIsNumbersOn(true)
  }

  const handlePopupOpen = (id:number) =>  (e: React.MouseEvent) =>{
    e.stopPropagation();
    if(isOpenId === id ) setIsOpen(false)
    if(isOpenId !== id ) setIsOpen(true)
    setIsOpenId(prev => prev === id ? null : id);
  }



  // counter total staying night
  // useEffect(()=>{
    const calculateStayingNights = () =>{
      if(!(startDate === null) && !(endDate === null)){
        if(startDate >= endDate) {
          throw new Error("일자 선택 오류 입니다. 체크인과 체크아웃을 다시 선택해 주세요.")
      }
      
      const oneDayMS = 24 * 60 * 60 * 1000;
      const timeGap = endDate.getTime() - startDate.getTime();
      const numberOfDays = Math.ceil(timeGap / oneDayMS);
      setTotalNights(numberOfDays -1);
      }
    }

    // },[endDate])
    
    
    
    //
    const handleStayingNightSet = () =>{
    calculateStayingNights();
    setIsOpenId(null);
  }



  // for browser display information
  const setUpStartDate = startDate?.toLocaleDateString();
  const setUpEndtDate = endDate?.toLocaleDateString();

// console.log("start Data", startDate , typeof startDate);
// console.log("ssetUpStartDate", setUpStartDate , typeof setUpStartDate);

const stringToNumber = accomData?.price.replace(",", "");
const totalPrice = totalNights !== null || totalNights !== null && totalNumbers > 0  ?
(Number(stringToNumber) * totalNights + ( (adult*accomData.extra_adult) + (child*accomData.extra_child)) )
  : 0;


// Currentcy Localization function
let totalLocalFormatCurrency = formatCurrency(totalPrice);


// counder for adult
const handleAdult = (buttonType : string) =>{
  if(buttonType ==='plus'){
    if(totalNumbers < accomData.max_occupancy ){
      setTotalNumbers(prev => prev + 1);
      setAdult(prev => prev + 1)
      return
    }
  }

  if(buttonType === 'minus'){
    if(adult >= 0 ){
      setTotalNumbers(prev => prev - 1);
      setAdult(prev => prev - 1)
      return
    }
  }
}

//counter for child
const handleChild = (buttonType : string) =>{
  if(buttonType ==='plus'){
    if(totalNumbers < accomData.max_occupancy ){
      setTotalNumbers(prev => prev + 1);
      setChild(prev => prev + 1)
      return
    }
  }

  if(buttonType === 'minus'){
    if(child >= 0 ){
      setTotalNumbers(prev => prev - 1);
      setChild(prev => prev - 1)
      return
    }
  }
}


  return (
    <aside
      ref={asideRef}

    >
      {accomData ? (
        <section
        className={`${styles.accommodationRightBodyWrap} ${
          isSticky ? styles.sticky : ''
      }`}
        >
          <h3>₩ {accomData.price}</h3>
            <div
              className={styles.accomAsideDateNumberBox}
              >
              <div
                onClick={handlePopupOpen(2)}
              >
                <div>
                  <p>체크인</p>
                  {startDate ? setUpStartDate : todayDate}
                </div>
                <div>
                  <p>체크아웃</p>
                  {endDate ? setUpEndtDate : "일정이 없어요."}
                </div>
              </div>


              {
                isOpen && isOpenId === 2 &&
                <section
                  className={styles.popupCalendarWrap}
                  onClick={(e)=>e.stopPropagation()}
                >
                  <h3>날짜 선택</h3>
                  <p>여행 날짜를 입력하여 정확한 요금을 확인하세요.</p>

                    <CalendarArea start={setStartDate} end={setEndtDate} />

                  <button
                  className={styles.calendarConfirmBtn}
                    onClick={()=>handleStayingNightSet()}
                  >확인</button>
                </section>
              }

              {accomData.rooms &&
              <div
                onClick={handlePopupOpen(1)}
                className={styles.accomAsideNumbersWrap}
                tabIndex={0}
                role="button"
              >
                {
                  totalNumbers>0 ? (
                    <>
                    <span>성인 : {adult}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>어린이 : {child}</span>
                    </>
                  ) :(
                    <>
                      <FiPlus />
                      인원수
                    </>
                  )
                }

              </div>
              }
              {accomData.rooms && 
              isOpen && isOpenId === 1 &&
              <section
                onClick={(e)=>e.stopPropagation()}
                className={styles.accomAsideNumbers}
              >
                <h4>숙박 인원</h4>
                <p>추가 가능 인원 : {accomData?.max_occupancy - totalNumbers}</p>
                <ul>

                  <li>
                    <p>성인</p>
                    <div
                      className={styles.accomAsideNumberSetBtns}
                    >
                      <button
                        disabled={totalNumbers === accomData.max_occupancy}
                        onClick={()=>handleAdult('plus')}
                      >
                        <CiCirclePlus />
                      </button>
                      {adult}
                      <button
                        disabled={adult === 0}
                        onClick={()=>handleAdult('minus')}
                      >
                        <CiCircleMinus />
                      </button>
                    </div>
                  </li>


                  <li>
                    <p>어린이</p>
                    <div
                      className={styles.accomAsideNumberSetBtns}
                    >
                      <button
                        disabled={totalNumbers === accomData.max_occupancy}
                        onClick={()=>handleChild('plus')}
                      >
                        <CiCirclePlus />
                      </button>
                      {child}
                      <button
                        disabled={child === 0}
                        onClick={()=>handleChild('minus')}
                      >
                        <CiCircleMinus />
                      </button>
                    </div>
                  </li>

                </ul>
                
                <div
                  className={styles.accomTotalNumberCounter}
                >
                  총 인원 :  {accomData.min_occupancy + totalNumbers}
                </div>
                </section>
              }


              <button
                onClick={handleCalendar}
              >
                예약하기
              </button>
            </div>

          <p className={styles.accommodationPriceWrap}>
            <span>₩ {accomData.price}</span>
            x
            <span>{totalNights ? totalNights : "숙박일 수"}</span>
          </p> 

          <div
            className={`${styles.accommodationPriceWrap} ${styles.accommodationTotalPriceWrap}`}
          >
            {totalLocalFormatCurrency}
            </div>
        </section>
      ) : (
        "현재 불러올 수 있는 데이터가 없습니다."
      )}
    </aside>
  );
};

export default AsidePrice;
