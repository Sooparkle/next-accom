'use client'
import React, {useState} from 'react';
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import styles from '../../../styles/AccommmodationDetail.module.scss';

interface type{
  type : string;
  max : number;
  min :number;
  total : number;
  totalSet : (value : number) => void;
}

  const StayingNumberBtn = ({type, max, min, total, totalSet}: type ) => {
    const [ stayingNumber, setStayingNumber ] = useState<number>(0);



  const handle = (buttonType : string) =>{

  if(buttonType ==='plus'){
    if(total < max ){
      totalSet(total + 1);
      setStayingNumber(prev => prev + 1)
      return
    }

  }


  if(buttonType === 'minus'){

    if(stayingNumber >= 0 ){
      totalSet(total - 1);
      setStayingNumber(prev => prev - 1)
      return
    }
  }
}

if(type==='adult'){
  console.log("adult total", total)
}

if(type==='child'){
  console.log("childtotal", total)
}


  return (
    <>
      <p>{type ==='adult' ? '성인' : "어린이"}</p>
      <div
        className={styles.accomAsideNumberSetBtns}
      >
        <button
          disabled={total === max}
          onClick={()=>handle('plus')}
        >
          <CiCirclePlus />
        </button>

        {stayingNumber}

        <button
          disabled={stayingNumber === 0}
          onClick={()=>handle('minus')}
        >
          <CiCircleMinus />
        </button>
      </div>

    </>
  )
}

export default StayingNumberBtn