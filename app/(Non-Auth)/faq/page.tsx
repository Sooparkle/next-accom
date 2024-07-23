'use client'

import React , {useState} from 'react'
import styles from '../../styles/Boards.module.scss';
import faq from '../../data/faq';
import BackButton from '@/app/components/BackButton';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { formatDescription } from '@/app/util/format';

type contentsType = {
  id : number,
  category : string,
  title : string,
  contents : string,
}

const page = () => {
  const [ filtered, setFiltered ] = useState<contentsType[]| undefined>([])
  const categories = faq.reduce((acc, item) =>{
    if(!acc.includes(item.category)){
      acc.push(item.category)
    }
    return acc
},[] as string[]);


const handleFilter = (i:string) =>{
  if(i.length > 0){
    const filtedItem = faq.filter(item => item.category === i)
    setFiltered(filtedItem)
    return
  }
  const life = faq
  setFiltered(life)
}

let dataShowed= filtered?.length ? filtered : faq

  return (
    <>
    <Header type=''/>
    <main
      className={styles.mypageMain}
    >
      {/* head */}

      <section
        className={styles.head}
      >
        <h3>자주하는 질문</h3>
      </section>


      {/* faq content area */}
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
            >전체</li>
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
                >{formatDescription(item.contents)}</div>
              </details>
            ))
          }
        </div>

      </article>
      <BackButton href='/mypage' />
    </main>
  <Footer />
  </>
  )
}

export default page