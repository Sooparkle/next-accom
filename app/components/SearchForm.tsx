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

interface SearchStoreType {
  searchResults: AccomsDataType[];
  setSearchResults: (data: AccomsDataType[]) => void;

}

export const useSearchStore = create<SearchStoreType>((set) =>({
  searchResults: [],
  setSearchResults: (data: AccomsDataType[]) => set({ searchResults: data }),
}))

const initialState = {
  message : "",
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
    if (Array.isArray(state)) {
      const accommodations: AccomsDataType[] = state;
      searchStore.setSearchResults(accommodations);   
    } else {
      console.log("SearchForm State Message", state.message);
      window.alert(`${state.message}`);
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