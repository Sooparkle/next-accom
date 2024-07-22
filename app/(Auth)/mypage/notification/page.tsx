import React from 'react'
import styles from '../../../styles/Setting.module.scss';
import BackButton from '../../../components/BackButton';
import NotificationThings from '@/app/components/NotificationThings';

const page = () => {
  
  return (
    <main
      className={styles.mypageMain}
    >
      {/* head area */}
      <section
        className={styles.head}
      >
        <h3>알람 설정</h3>
      </section>

      {/* body area */}
      <NotificationThings />

      <BackButton href='/mypage' />
    </main>
  )
}

export default page