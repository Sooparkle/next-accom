"use client"
import React, { useState } from 'react';
import styles from "../styles/Edit.module.scss";
import Image from 'next/image';
import  { IoPersonOutline } from "react-icons/io5";


const EditPart = () => {


  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setName(e.target.value)
  }
  const handletextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
    setText(e.target.value)
  }

  const handleSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    e.preventDefault();
  }

  const handleSubmitEmail = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{

  }

  const mainImage = true ;
  return (
    <>
      <section
        className={styles.imageNameWrap}
      >
        <fieldset>
          <legend>이미지 변경</legend>
          <form
          className={styles.editForm}
        >
          <div
            className={styles.editImageWrap}
          >
            {
              mainImage ? (
                <Image 
                src='https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                fill
                alt='본인 아바타'
                />
              ) : (
                <IoPersonOutline />
              )
            }

          </div>
          <div>
            {
              mainImage ? (
                <button
                  className={styles.mainImageDelete}
                >삭제</button>
              ) : (
                <>
                  <label >
                    <input 
                      type="file" 
                      name='profile_image'
                      accept='image/png, image/jpg, image/jpeg'
                      />
                  </label>
                  <p>확장자: png, jpg, jpeg / 용량: 1MB 이하</p>
                </>
              )
            }

          </div>

        </form>
        </fieldset>


        {/* nick name area */}
        <div
          className={styles.editNameChange}
        >
          <h4><label htmlFor='nick' >닉네임 변경</label></h4>
            <div
              className={styles.editNameWrap}
            >
              <p>한글, 영문(대소문자), 숫자 조합 / 2~18자 이하</p>
              <input 
              className={styles.editInput}
                type="text"
                id='nick'
                value={name}
                onChange={handleNameChange}
              />
            </div>
        </div>


        {/* Self-introduction area */}

        <div
          className={styles.selfIntroduce}
        >
          <h4><label htmlFor='introduce'>자기소개</label></h4>
          <div>
            <textarea
            className={styles.editInput}
              id='introduce'
              value={text}
              onChange={handletextChange}
              maxLength={100}
            />
          </div>


        </div>
        <button
          className={styles.editPageBtn}
          type='submit'
          onClick={(e)=>handleSubmit(e)}
        >
          저장하기
        </button>
      </section>

      {/* eamil area */}
      <section
        className={styles.editEmail}
      >
        <h4><label htmlFor='email'>이메일</label></h4>
            <input
              className={styles.editInput}
              type="email"
              id='email'
              value="hong@gmail.com"
            />

        <button
          className={styles.editPageBtn}
          type='submit'
          onClick={(e)=>handleSubmitEmail(e)}
          >
          저장하기
        </button>
      </section>


      {/* password area */}
      <section
        className={styles.editPassword}
      >
        <h4><label htmlFor='pwd1'>비밀번호</label></h4>
        <div
          className={styles.passwordWrap}
        >
          <input 
            className={styles.editInput}
            type="password"
            id='pwd1'
            placeholder='현재 비밀번호'
          />
          <label htmlFor='pwd2' className={styles.visualHidden} >새 비밀번호</label>
          <input 
            className={styles.editInput}
            type="password"
            id='pwd2'
            placeholder='새 비밀번호'
          />
          <label htmlFor='pwd3' className={styles.visualHidden} >새 비밀번호</label>
          <input 
            className={styles.editInput}
            type="password"
            id='pwd2'
            placeholder='새 비밀번호 확인'
          />
        </div>
        <button
          className={styles.editPageBtn}
          type='submit'
          onClick={(e)=>handleSubmit(e)}
        >
          저장하기
        </button>

      </section>

      <section>
        <button
          className={styles.editResign}
        >회원탈퇴
        </button>
        </section>
    </>
  )
}

export default EditPart