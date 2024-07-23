import React, { useState } from 'react'
import styles from '../../styles/Boards.module.scss';
import BackButton from '@/app/components/BackButton';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import EventContentsDetails from './EventContentsDetails';


interface EventTypes {
  id : number,
  date : string,
  title : string,
  contents : string,
}
const page = () => {

  
  return (
    <>
      <Header type=''/>
      <main
      className={styles.mypageMain}
    >
      {/* head area */}
      <section
        className={styles.head}
      >
        <h3>이벤트</h3>
      </section>


      {/* event notice area */}
      <article
        className={styles.eventNoticeWrap}
      >
      <div className={styles.eventHead}>
        <div>제목</div>
        <div>번호</div>
      </div>

        <EventContentsDetails />

      </article>

      <BackButton href='/mypage' />

      </main>
      <Footer />
    </>
  )
}

export default page