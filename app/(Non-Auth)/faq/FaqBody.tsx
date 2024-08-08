'use client'

import React, { useState } from 'react';
import styles from '@/app/styles/Boards.module.scss';
import { contentsType } from '@/app/data/faq';
import { formatDescription } from '@/app/util/format';


const FaqBody = ({data} : {data : contentsType[]}) => {
  const [ filtered, setFiltered ] = useState<contentsType[]| undefined>([]);

    // extract categories function
    const categories = data.reduce((acc, item) =>{
      if(!acc.includes(item.category)){
        acc.push(item.category)
      }
      return acc
  },[] as string[]);
  

  const handleFilter = (i:string) =>{
    if(i.length > 0){
      const filtedItem = data.filter(item => item.category === i)
      setFiltered(filtedItem)
      return
    } else{
      const life = data
      setFiltered(life)

    }
  }

  let dataShowed= filtered?.length ? filtered : data

  return (
    <article
    className={styles.faqWrap}
  >        
    <div
      className={styles.categoryWrap}
    >
      {/* <h4>질문 분류</h4> */}
      <ul>
        <li 
          className={`${styles.category} ${styles.categoryAll}`}
          onClick={()=> handleFilter('')}
        >
          전체
        </li>
        {categories.map((category, index) => (
          <li
            key={`${category} + ${index}`}
            className={styles.category}
            onClick={() => handleFilter(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>

    {/* faq body area */}
    <div
      className={styles.faqBodyWrap}
    >
      {
        dataShowed.map((item, index)=>(

          <details 
            key={`${index}-${item.id} `} 
            open={0 === index} 
            className={styles.faqBodyContentWrap} 
          >
            <summary>{item.title}</summary>
            <div 
              className={styles.contents}
            >{formatDescription(item.contents)()}</div>
          </details>
        ))
      }
    </div>

  </article>
  )
}

export default FaqBody