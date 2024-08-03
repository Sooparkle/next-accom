import React from 'react';
import styles from '../styles/Header.module.scss';
import SearchForm from './SearchForm';
import NotSearchForm from './NotSearchForm';
import NavList from './NavList';
import { createClient } from '@/utils/supabase/server';
import { UserType } from '../util/types';

interface HeaderProps{
  type:string
}


export const Header = async ({type}:HeaderProps)  => {
  const supabase = createClient();

  const {data : {user} } = await supabase.auth.getUser();

  console.log("login User", user)

  return (
    <header
      className={styles.header}
    >
      {user? <NavList user={user as UserType} /> : null}
      {
        // type === "mypage" && <NotSearchForm />
      }
      
      {
        type === 'main' &&  <SearchForm />
      }
      

    </header>

  )

}

export default Header