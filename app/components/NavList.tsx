'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Header.module.scss';
import { usePathname, useRouter } from 'next/navigation'
import { IoPersonOutline } from "react-icons/io5";
import { CiMountain1,CiCircleList } from "react-icons/ci";
import Image from 'next/image';
import { UserDBType } from '../util/types';
import { singOut } from '../login/actions';





const MyinfoList =  ({user} : {user : UserDBType}) =>{

  const router = useRouter();

  const handleSignOut = async () => {
    await singOut();
    router.push('/login', {scroll:false});
  };


  return(
    <section
      className={styles.headerPopupWrap}
    >
      <div
        className={styles.popupImage}
      >
        {
          user ? (
            <Link scroll={false} href='/mypage' >
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
            <Link scroll={false} href='/login'>
              <IoPersonOutline />
            </Link>
          )
        }
        <p>
          {
            user ? `${user?.name} 님` :"로그인 필요"
          }
        </p>
      </div>

      <div
        className={styles.linkWrap}
      >
          <Link scroll={false} href='/notice'>공지사항</Link>
          <Link scroll={false} href='/event'>이벤트</Link>
          <Link scroll={false} href='/faq'>FAQ</Link>
      </div>

      <div
        className={styles.popupLogOutWrap}
      >
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </section >
  )
}

const NavList = ({user} :{user : UserDBType |null}) => {
  const [ mypageClicked, setMypagClicked ] = useState<boolean>(false);
  const [ mobileSearchBtn, setMobileSearchBtn ] = useState<boolean>(false);

  const pathname = usePathname();
  const isMypageIncluded = pathname.includes('/mypage');
  const router =useRouter();


  //Logo button function logic
  const handleLogo =() =>{
    if(pathname === "/")
    window.location.reload();

    router.push('/',{scroll:false});
  }


  // mypageClciked when clicked outside of popup
  useEffect(()=>{
    const close = () => setMypagClicked(false);
    if(mypageClicked === true){
      window.addEventListener('click', close)
    }
    return ()=>window.removeEventListener('click', close)

  },[mypageClicked]);
  
  useEffect(()=>{
    const close = () => setMobileSearchBtn(false);
    if(mobileSearchBtn === true){
      window.addEventListener('click', close)
    }
    return ()=>window.removeEventListener('click', close)

  },[mobileSearchBtn]);



  // mypageClicked toggle button
  const handleMypagClicked = (e:React.MouseEvent<SVGElement, MouseEvent>) =>{
    e.stopPropagation();
    setMypagClicked(true)
  };



  const haneldMobileSearch = (e:React.MouseEvent<SVGElement, MouseEvent>) =>{
    e.stopPropagation();
    setMobileSearchBtn(true)
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
        >
        <div
          className={styles.mobileHeaderRight}
          >
          {/* <CiSearch
            onClick={(e)=>haneldMobileSearch(e)}
            className={styles.mobileSearchBtn}
          /> */}
          
          {/* {
            mobileSearchBtn ? (
            <div
              onClick={(e)=>e.stopPropagation()}
              className={styles.mobileSearchBarWrap}
            >
              <SearchForm type='mobile'/>
              <button
                className={styles.mobileCancelBtn}
                onClick={()=>setMobileSearchBtn(false)}
              >
                <MdOutlineCancel />
              </button>
            </div>
          ) : null
          }
           */}
          <CiCircleList 
          className={styles.profile}
          onClick={(e)=>handleMypagClicked(e)}
          />{mypageClicked ? <MyinfoList user={user as UserDBType} /> : null}

        </div>
      </li>

    </ul>

  </nav>
  )
}

export default NavList