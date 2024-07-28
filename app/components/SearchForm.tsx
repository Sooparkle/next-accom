'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/Header.module.scss';
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { useFormState, useFormStatus } from 'react-dom';
import searchFn from '../util/searchFn';
import { AccomDataType } from '../util/types';
import { useSearchStore } from '../util/useSearchStore';

interface SearchState {
  message: string;
  data?: AccomDataType[];
}


const initialState : SearchState = {
  message : "initial",
  data : []
}


  const SubmitBtn = ({ input } : {input : string}) =>{
  const { pending } = useFormStatus();

console.log("dd", input)

  return (
    <button 
      type="submit"
      aria-disabled={input.length === 0 || pending}
      disabled={input.length === 0 || pending}
    >
      <CiSearch />
    </button>
  )
}


export const SearchForm = () => {
  const [state, formAction] = useFormState(searchFn, initialState);
  const searchStore = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [ input, setInput ] = useState("")

  useEffect(()=>{
    console.log("state", state)

    if (state) {
      searchStore.setSearchResults(state);   
    } else {
      console.log("SearchForm State Message", state);
    }
  },[state])

  
  return (
    <section className={styles.searchFormWrap}>
      <form
        className={styles.form}
        action={formAction}
      >
        <div
          className={styles.inputBtn}
        >
          <input
            name='keyword'
            type='text'
            onChange={(e)=>setInput(e.target.value)}
          />
          <SubmitBtn input={input}/>

        </div>
      </form>


      {/* <button
        className={styles.mobileMenu}
      >
        <CiMenuBurger
          />
      </button> */}

    </section>
  )
}

export default SearchForm