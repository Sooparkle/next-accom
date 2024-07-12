'use client'
import style from "../components/Form.module.scss";
import React from 'react'
import { useFormState, useFormStatus } from "react-dom";
import searchFn from "../utilieis/searchFn";

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
  
  return (
    <section
      className={style.formWrap}
    >
      
      <h1>로그인 페이지</h1>
      <form
        className={style.form} 
        action={formAction}>

          <div
            className={style.emailWrap}
          >
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div
            className={style.passwordWrap}
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