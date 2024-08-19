'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/Header.module.scss';
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { useFormState, useFormStatus } from 'react-dom';
import searchFn from '../util/searchFn';
import { AccomDataType } from '../util/types';
import { useSearchStore } from '../util/useSearchStore';
import { FaLaptopCode } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { useRouter } from 'next/navigation';


interface SearchState {
  message: string;
  data?: AccomDataType[];
}


const initialState : SearchState = {
  message : "initial",
  data : []
}


  const SubmitBtn = ({ input,setMypagClicked } : {input : string, setMypagClicked?:(data:boolean)=> void | undefined}) =>{
  const { pending } = useFormStatus();



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


export const SearchForm = ({type} : {type:string}
) => {
  const [state, formAction] = useFormState(searchFn, initialState);
  const searchStore = useSearchStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [ input, setInput ] = useState("")
  const refForm = useRef<HTMLFormElement>(null);
  const refFlyer1 = useRef<HTMLAnchorElement>(null);
  const refFlyer2 = useRef<HTMLAnchorElement>(null);
  const refTitle= useRef<HTMLHeadingElement>(null);
  const refInput= useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Zustand, search data store function
  useEffect(()=>{
    if(state.message === 'initial'){
    }

    if(state.message === 'succeful'){
        searchStore.setSearchResults(state);
        router.push('/search');
      }

    if(state.message === 'null')  {
      searchStore.setSearchResults(state);
      // console.log("SearchForm State Message", state);
      router.push('/search');

    }

    
  },[state]);



  // serch bar trasition
  useEffect(()=>{
    const transitionSearchBar = () =>{
      if(refForm.current){
        if(window.scrollY < 90){
          refForm.current!.style.top = "80px"
        }
  
        if(window.scrollY > 90 ){
          refForm.current!.style.top = "10px"
        }
      }

    };
    window.addEventListener("scroll", transitionSearchBar);
    return ()=>window.removeEventListener('scroll', transitionSearchBar)
    
  },[]);



  
  return ( type === 'mobile' ? 
    (
    <section className={styles.movileSearchFormWrap}>

      <form
        // onClick={() =>handleSearchBar()}
        className={styles.mobileForm}
        action={formAction}
      >

          <input
            name='keyword'
            type='text'
            className={styles.mobileInput}
            onChange={(e)=>setInput(e.target.value)}
          />
          <SubmitBtn input={input}   />

      </form>
    </section>

      ) : 
      (
    <section className={styles.searchFormWrap}>
      <h3
      className={styles.title}
        ref={refTitle}
      >좀쉼쉼</h3>
      <form
        // onClick={() =>handleSearchBar()}
        ref={refForm}
        className={styles.form}
        action={formAction}
      >
        <div
          className={styles.inputBtn}
        >
          <input
            ref={refInput}
            name='keyword'
            type='text'
            onChange={(e)=>setInput(e.target.value)}
          />
          <SubmitBtn input={input}  />

        </div>
      </form>

      {/* <Link
        href='https://sooparkle.xyz'
        className={styles.flyer1}
        target="_blank"
        ref={refFlyer1}
      >
        <Image 
          src="https://img.cgv.co.kr/WingBanner/2023/0208/16758461047540.png"
          alt='sooparkle portfolio'
          width={136}
          height={39}
          />
      </Link>

      <Link
        href='https://github.com/Sooparkle/next-accom'
        className={styles.flyer2}
        target="_blank"
        ref={refFlyer2}

      >
        <FaGithub />
      </Link> */}




    </section>
      )
  )
}

export default SearchForm