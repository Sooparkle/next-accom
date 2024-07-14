import React from 'react'
import styles from '../../styles/Mypage.module.scss';
import { BsChevronRight, BsHeadphones, BsPencilFill } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <main
      className={styles.mypageMain}
    >
      {/* header area */}
      <section
        className={styles.head}
      >
        <div
          className={styles.imageWrap}
        >
          <Image 
            src='https://images.unsplash.com/photo-1599687351724-dfa3c4ff81b1?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            fill
            alt='본인 아바타'
            className={styles.avatar}
          />
          <button
            className={styles.edit}
          >
            <BsPencilFill />
          </button>
        </div>

        <p className={styles.name} >로그인 이름</p>
      </section>

      {/* content body area */}
      <section
        className={styles.infoWrap}
      >
        <ul
          className={styles.accomInfo}
        >
          <li>
            <p>예약한 숙소</p>
            <p>9</p>
          </li>
          <li>
            <p>찜한 숙소</p>
            <p>9</p>
          </li>

        </ul>



        {/* <ul>
          <li>
            <p className={styles.name} >서핑하우스</p>
            <p className={styles.period} >2024-04-25 ~ 2024-04-27</p>
            <p className={styles.status} >예약완료</p>
          </li>
          <li>
            <p className={styles.name} >서핑하우스</p>
            <p className={styles.period} >2024-04-25 ~ 2024-04-27</p>
            <p className={styles.status} >예약완료</p>
          </li>
          <li>
          ...
          </li>
        </ul>

        <Link 
            className={styles.reservationDetail}
            href=""
          >더 보기</Link> */}
        
      </section>

      {/* setting area */}
      <section
        className={styles.setting}
      >
        <h3>세팅</h3>
        <ul>
          <li
          
          >
            <p>환경설정</p>
            <BsChevronRight />
          </li>
          <li>
            <p>공지사항</p>
            <BsChevronRight />
          </li>
          <li>
            <p>개인 약관 및 이용 정책</p>
            <BsChevronRight />
          </li>
          <div
            className={styles.tellphone}
          >
            <p>고객전화<BsHeadphones /></p>
            <p>1588-7070</p>
          </div>
        </ul>
        <p className={styles.version} >현재 버전 2.01.</p>
      </section>

      <button
        className={styles.logout}
      >
        Log-Out
      </button>
    </main>
  )
}

export default page