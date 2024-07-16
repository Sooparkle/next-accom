'use client'

import React, {useState} from 'react'
import styles from '../styles/Setting.module.scss'
import faq from '../data/faq';

type contentsType = {
  id : number,
  category : string,
  title : string,
  contents : string,
}

const FaqFilter = () => {
const [ filtered, setFiltered ] = useState<contentsType[]| undefined>([])
  const categories = faq.reduce((acc, item) =>{
    if(!acc.includes(item.category)){
      acc.push(item.category)
    }
    return acc
},[] as string[])



const handleFilter = (i:string) =>{
  const filtedData = faq.filter(item => item.category === i)
  setFiltered(filtedData);
}


  return (
    <>
      {
        categories.map((i, index) => (
        <li 
          key={`${i} + ${index}`} 
          className={styles.category}
          onClick={()=>handleFilter(i)}
        >
          {i}
        </li>
      ))
  }
    </>
  )
}

export default FaqFilter