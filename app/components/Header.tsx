'use server'
import React from 'react';
import styles from '../styles/Header.module.scss';
import SearchForm from './SearchForm';
import NotSearchForm from './NotSearchForm';
import NavList from './NavList';
import { createClient } from '@/utils/supabase/server';
import { UserType,UserDBType } from '../util/types';
import { createClient as DB } from '@/supabase/clientt';

interface HeaderProps{
  type:string
}


export const Header = async ({type}:HeaderProps)  => {
  const supabase = await createClient();
  const DB = await createClient();
  let userDB : UserDBType | null = null;

  // user call function
  const {data : {user} } = await supabase.auth.getUser();

  // synchronize user and userDB
  if(user && userDB == null){
    const { data, error } = await DB
    .from('users')
    .select()
    .eq('email', user?.email)

    if(error){
      console.log("사용자를 불러 올 수 없습니다.");
    }

    if(data && data.length > 0 ){
      userDB = data[0]
    }
    
  }


  return (
    <header
      className={styles.header}
    >
      <NavList user={userDB} />
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