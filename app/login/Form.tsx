'use client'
import React from 'react'
import { useFormState, useFormStatus } from "react-dom";
import searchFn from "../util/searchFn";
import styles from "../styles/Form.module.scss";
import { emailLogin } from './actions';
import { useSearchParams } from 'next/navigation';


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
      
      <h1>로그인 페이지</h1>
      <form
        className={styles.form} 
        >

          <div
            className={styles.emailWrap}
          >
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div
            className={styles.passwordWrap}
          >
            <label htmlFor="password">비밀번호</label>
            <input type="password" name="password" id="password" autoComplete="off" />
          </div>
          <p>{message}</p>
        <SubmitBtn />
      </form>

    </section>

  )
}

export default Form