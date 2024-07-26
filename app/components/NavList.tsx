'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Header.module.scss';
import { usePathname } from 'next/navigation'
import  { IoPersonOutline } from "react-icons/io5";
import { CiMountain1, CiMenuBurger,CiCircleList } from "react-icons/ci";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const MyinfoList = () =>{

  const loginInfo = false
  return(
    <section
      className={styles.headerPopupWrap}
    >
      <div
        className={styles.popupImage}
      >
        {
          loginInfo ? (
            <Link href='/maypge' >
              <Image 
              src='https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              fill
              alt='본인 아바타'
              
              />
            </Link>
          ) : (
            <Link href='/login'>
              <IoPersonOutline />
            </Link>
          )
        }
        <p>
          {
            loginInfo ? "홍길동님" :"로그인 필요"
          }
        </p>
      </div>

      <ul>
        <li>
          <Link href='/notice'>공지사항</Link>
        </li>
        <li>
          <Link href='/event'>이벤트</Link>
        </li>
        <li>
          <Link href='/faq'>FAQ</Link>
        </li>
      </ul>

      <div>
        
      </div>
    </section >
  )
}

const NavList = () => {
  const [ mypageClicked, setMypagClicked ] = useState<boolean>(false)

  const pathname = usePathname();
  const isMypageIncluded = pathname.includes('/mypage');
  const router =useRouter();

  console.log("pathname", pathname)
  const handleLogo =() =>{
    if(pathname === "/")
    window.location.reload();

    router.push('/');
  }
  
  return (
    <nav
    className={styles.nav}
  >
    <ul >
      <li>

        <button
          onClick={handleLogo}
          className={`${pathname === "/" ? styles.active : ""} ${styles.logoBtn}`}
        >
                  <CiMountain1
        className={styles.main}/>
        </button>
      </li>

      <li
        className={`${styles.headerMypageIcon} ${isMypageIncluded ? styles.active : ""}`}
        onClick={()=>setMypagClicked(true)}
      >
        <CiCircleList 
        className={styles.profile}
        />{mypageClicked && <MyinfoList />}
      </li>

    </ul>

  </nav>
  )
}

export default NavList