'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Header.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { CiMountain1, CiUser, CiMenuBurger } from "react-icons/ci";
import SearchForm from './SearchForm';
import NotSearchForm from './NotSearchForm';


export const Header = () => {
  const pathname = usePathname();
  const isMypageIncluded = pathname.includes('/mypage');
  
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
            className={`${isMypageIncluded ? styles.active : ""}`}
          >
            <Link
            href="/mypage"
            >
            <CiUser 
            className={styles.profile}
            />
          </Link>
          </li>
        </ul>

      </nav>

      {
        !(pathname === "/") && <NotSearchForm />
      }

      
      {pathname === '/' &&  <SearchForm />}
      

    </header>

  )

}

export default Header