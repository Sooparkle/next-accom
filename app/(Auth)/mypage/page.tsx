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
            <BsPencilFill 
            />
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
            <Link
              href="/mypage/reservation"
            >9
            </Link>
          </li>
          <li>
            <p>찜한 숙소</p>
            <Link
              href="/mypage/likes"
            >9
            </Link>
          </li>

        </ul>


        
      </section>

      {/* setting area */}
      <section
        className={styles.setting}
      >
        <ul>
          <li>
            <p>쿠폰</p>
            <BsChevronRight />
          </li>
          <li>
            <p>알람 설정</p>
            <BsChevronRight />
          </li>
          <li>
            <p>개인 약관 및 이용 정책</p>
            <BsChevronRight />
          </li>
          <li>
            <p>이벤트</p>
            <BsChevronRight />
          </li>
          <li>
            <p>자주 하는 질문</p>
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

      {/* button area */}
      <button
        className={styles.logout}
      >
        Log-Out
      </button>

    </main>
  )
}

export default page