import React from 'react';
import styles from '../styles/Header.module.scss';
import SearchForm from './SearchForm';
import NotSearchForm from './NotSearchForm';
import NavList from './NavList';


interface HeaderProps{
  type:string
}


export const Header = ({type}:HeaderProps)  => {

  return (
    <header
      className={styles.header}
    >
      <NavList />

      {
        type === "mypage" && <NotSearchForm />
      }
      
      {
        type === 'main' &&  <SearchForm />
      }
      

    </header>

  )

}

export default Header