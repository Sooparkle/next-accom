'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Header.module.scss';
import { usePathname } from 'next/navigation'
import  { IoPersonOutline } from "react-icons/io5";
import { CiMountain1, CiMenuBurger,CiCircleList } from "react-icons/ci";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserDBType } from '../util/types';
import { singOut } from '../login/actions';




const MyinfoList =  ({user} : {user : UserDBType}) =>{


  return(
    <section
      className={styles.headerPopupWrap}
    >
      <div
        className={styles.popupImage}
      >
        {
          user ? (
            <Link href='/mypage' >
              <div
                className={styles.popupImageWrap}
              >
                <Image 
                src={user?.image || `https://static.vecteezy.com/system/resources/previews/013/360/247/non_2x/default-avatar-photo-icon-social-media-profile-sign-symbol-vector.jpg`}
                fill
                alt='본인 아바타'
                />
              
              </div>
            </Link>
          ) : (
            <Link href='/login'>
              <IoPersonOutline />
            </Link>
          )
        }
        <p>
          {
            user ? "홍길동님" :"로그인 필요"
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

      <div
        className={styles.popupLogOutWrap}
      >
        <form
          action={singOut}
        >
          LogOut
        </form>
      </div>
    </section >
  )
}

const NavList = ({user} :{user : UserDBType |null}) => {
  const [ mypageClicked, setMypagClicked ] = useState<boolean>(false);

  const pathname = usePathname();
  const isMypageIncluded = pathname.includes('/mypage');
  const router =useRouter();


  //Logo button function logic
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
        />{mypageClicked && user ? <MyinfoList user={user as UserDBType} /> : null}
      </li>

    </ul>

  </nav>
  )
}

export default NavList