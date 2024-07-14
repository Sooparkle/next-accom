'use client'
import React from 'react'
import { useFormState, useFormStatus } from "react-dom";
import searchFn from "../util/searchFn";
import styles from "../styles/Form.module.scss";


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

const Form = () => {
  const [state, formAction ] = useFormState(searchFn, initialState)
  const isLogin = true
  
  return (
    <section
      className={styles.formWrap}
    >
      
      <h1>로그인 페이지</h1>
      <form
        className={styles.form} 
        action={formAction}>

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

        <SubmitBtn />
      </form>

    </section>

  )
}

export default Form