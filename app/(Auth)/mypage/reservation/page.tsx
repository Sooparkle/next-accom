import React from 'react';
import styles from '../../../styles/Mypage.module.scss';
import BackButton from '@/app/components/BackButton';
import Image from 'next/image';


export const page = () => {
  return (
    <main
      className={styles.mypageMain}
    >
      {/* header area */}
      <section
        className={styles.head}
      >
        <h3>예약한 숙소</h3>
        <p>총 : 4개</p>
      </section>

      {/* contents area */}
      <section>
        <ul
          className={styles.reservationListWrap}
        >
          <li>
            <div
              className={styles.reservationEachImageWrap}
            >
            <Image 
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              alt='0000 숙소'
              />
            </div>

            <div
              className={styles.reservationDetail}
            >
              <p>호텔 인더 비치 바다 앞 서핑</p>
              <p>2024-07-07 ~ 2024-08-08</p>
              <p>성인 <span>4</span>, 어린이 <span>8</span> </p>
            </div>

            <div
              className={styles.reservationStatus}
            >
              <p>예약 완료</p>
              <p>10,100,000 원</p>
              <button
                className={styles.reservationCancelBtn}
              >
                예약취소
              </button>
            </div>

          </li>
          <li>
            <div
              className={styles.reservationEachImageWrap}
            >
            <Image 
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              alt='0000 숙소'
              />
            </div>

            <div
              className={styles.reservationDetail}
            >
              <p>호텔 인더 비치 바다 앞 서핑</p>
              <p>2024-07-07 ~ 2024-08-08</p>
              <p>성인 <span>4</span>, 어린이 <span>8</span> </p>
            </div>

            <div
              className={styles.reservationStatus}
            >
              <p>예약 완료</p>
              <p>10,100,000 원</p>
              <button
                className={styles.reservationCancelBtn}
              >
                예약취소
              </button>
            </div>

          </li>
          <li>
            <div
              className={styles.reservationEachImageWrap}
            >
            <Image 
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              fill
              alt='0000 숙소'
              />
            </div>

            <div
              className={styles.reservationDetail}
            >
              <p>호텔 인더 비치 바다 앞 서핑</p>
              <p>2024-07-07 ~ 2024-08-08</p>
              <p>성인 <span>4</span>, 어린이 <span>8</span> </p>
            </div>

            <div
              className={styles.reservationStatus}
            >
              <p>예약 완료</p>
              <p>10,100,000 원</p>
              <button
                className={styles.reservationCancelBtn}
              >
                예약취소
              </button>
            </div>

          </li>
        </ul>
      </section>


      <BackButton />
    </main>
  )
}

export default page