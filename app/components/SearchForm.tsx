'use client'
import React, { useEffect } from 'react'
import styles from '../styles/Header.module.scss';
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { useFormState, useFormStatus } from 'react-dom';
import searchFn from '../util/searchFn';
import { create } from 'zustand';

interface AccomsDataType {
  id: number;
  accom_name: string;
  accom_type: string;
  accom_info: string;
  accom_benefit: string;
  description: string;
  img_url: string;
  price: string;
  score: number;
  min_occupancy: number;
  max_occupancy: number;
  extra_adult: number;
  extra_child: number;
  city: string;
  cityGu: string;
  province: string;
  phone: string;
  cancel: string;
  availavility: null | boolean;
  event: boolean;
  created_at: string;
  updated_at: string; 

}


interface SearchState {
  message: string;
  data?: AccomsDataType[];
}

interface SearchStoreType {
  searchResults:SearchState
  setSearchResults: (state:SearchState) => void;

}



// Zustand 
export const useSearchStore = create<SearchStoreType>((set) => ({
  searchResults: { message: "initial", data: [] },
  setSearchResults: (state: SearchState) => set({ searchResults: state }),
}));

const initialState : SearchState = {
  message : "initial",
  data : []
}


  const SubmitBtn = () =>{
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit"
      aria-disabled={pending}
    >
      { pending ? "로그인 진행중" : " 로그인"}
    </button>
  )
}


export const SearchForm = () => {
  const [state, formAction] = useFormState(searchFn, initialState);
  const searchStore = useSearchStore();

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