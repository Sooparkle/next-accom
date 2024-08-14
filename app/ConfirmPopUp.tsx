'use client'
import React, { useEffect, useState } from 'react';
import styles from '@/app/styles/Main.module.scss';

interface MessageType {
  searchParams :{
    message : string
  }
}

const ConfirmPopUp = ({searchParams} : MessageType) =>{
  const [ confirmMessage, setConfirmMessage ] = useState(false)
  
  
  useEffect(()=>{
    if(searchParams.message){
      setConfirmMessage(true)
    }
  },[searchParams.message]);


  return(
    <>
      {
        confirmMessage && (
        <div
        className={styles.confirmPopupWrap}
      >
        <div>
          <h3>예약 성공</h3>
          <p>예약이 완료 됐습니다.<span>Mypage &gt; 예약한 숙소</span>에서 확인 가능합니다.</p>
          <button
            onClick={() => setConfirmMessage(false)}
          >확인</button>
        </div>
      </div>
        )
      }
    </>
  )
}

export default ConfirmPopUp