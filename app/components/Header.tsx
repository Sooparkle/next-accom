'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Header.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { CiMountain1, CiUser, CiMenuBurger } from "react-icons/ci";
import SearchForm from './SearchForm';


export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  console.log("routher", router)
  console.log("pathname", pathname)
  return (
    <header
      className={styles.header}
    >
      <nav
        className={styles.nav}
      >
        <ul >
          <li
            className={`${pathname === "/" ? styles.active : ""}`}
          >
            <Link
            href="/"
            
          >
            <CiMountain1
            className={styles.main}/>
          </Link>
          </li>

          <li
            className={`${pathname === "/sign-in" ? styles.active : ""}`}
          >
            <Link
            href="/sign-in"
            >
            <CiUser 
            className={styles.profile}
            />
          </Link>
          </li>
        </ul>
      </nav>

      {/* 햄버거 메뉴 */}
      {/* <div>
        <CiMenuBurger
          className={styles.mobileMenu}
        />
      </div> */}
      
      {/* 검색 영역 */}
      <SearchForm />
    </header>

  )

}

export default Header