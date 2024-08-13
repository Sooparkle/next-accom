'use client'
import React from 'react'
import { useFormState, useFormStatus } from "react-dom";
import searchFn from "../util/searchFn";
import styles from "../styles/Form.module.scss";
import { emailLogin } from './actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';


const initialState = {
  message : "",
}


  const SubmitBtn = () =>{
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit"
      aria-disabled={pending}
      formAction={emailLogin}
      
    >
      { pending ? "로그인 진행중" : " 로그인"}
    </button>
  )
}

const Form = () => {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')
  console.log("message from login", message)
  
  return (
    <section
      className={styles.formWrap}
    >
      <Link 
        href={'/'}
        
      >
        <h1 className={styles.logo}>좀쉼쉼</h1>
      </Link>
      
      <form
        className={styles.form} 
        >

          <div
            className={styles.emailWrap}
          >
            <input type="email" name="email" id="email" value='bamyanggang@gmail.com' />
            <label htmlFor="email">Email</label>
          </div>
          <div
            className={styles.passwordWrap}
          >
            <input type="password" name="password" id="password" autoComplete='off' value='BIBI123' />
            <label htmlFor="password">비밀번호</label>
          </div>
          <p>{message}</p>
        <SubmitBtn />
      </form>

    </section>

  )
}

export default Form