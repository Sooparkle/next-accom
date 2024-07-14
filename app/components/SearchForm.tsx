import React from 'react'
import styles from '../styles/Header.module.scss';
import { CiSearch, CiMenuBurger } from "react-icons/ci";

export const SearchForm = () => {

  const handleAction = () =>{

  }
  return (
    <section className={styles.searchFormWrap}>
      <form
      className={styles.form}
        action={handleAction}
      >
        <div
          className={styles.inputBtn}
        >
          <input 
            type='text'
          />
          <button>
            <CiSearch />
          </button>

        </div>
      </form>

      <button
        className={styles.mobileMenu}
      >
        <CiMenuBurger
          />
      </button>

    </section>
  )
}

export default SearchForm