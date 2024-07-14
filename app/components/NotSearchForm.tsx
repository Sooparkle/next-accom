'use client'
import React, { useState } from 'react'
import styles from '../styles/Header.module.scss';
import { CiMenuBurger } from "react-icons/ci";
import Link from 'next/link';

export const NotSearchForm = () => {
  const [ isClicked, setIsClicked ] = useState(false);


  const handlePopup = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.stopPropagation();
    setIsClicked(!isClicked)

  }
  return (
    <section className={styles.NotSearchFormWrap}>
      <h2
        style={{
          placeSelf:"center"
        }}
      ><i>좀쉼쉼</i></h2>
      <button
        className={styles.NotMobileMenu}
        onClick={(e)=>handlePopup(e)}
        
      >
        <CiMenuBurger
          />
          { isClicked && 
            <div
              className={styles.notMobilePop}
            >
              <ul>
                <li><Link href="/" >메인</Link></li>
                <li><Link href="/mypage" >마이페이지</Link></li>
              </ul>
            </div> 
          }
      </button>

    </section>
  )
}

export default NotSearchForm