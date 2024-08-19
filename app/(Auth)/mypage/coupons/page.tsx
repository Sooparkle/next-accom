
import React from 'react';
import styles from "../../../styles/Setting.module.scss";
import BackButton from '@/app/components/BackButton';

export const runtime = 'edge';

const page = async () => {
  return (
    <main
      className={styles.mypageMain}
    >
      {/* head area */}
      <section
        className={styles.head}
      >
        <h3>받은 쿠폰</h3>
        <p>총 : 4개</p>
      </section>

      {/* coupons list area */}
      <section
        className={styles.couponsListWrap}
      >
        <ul>
          <li>
            {/* left area */}
            <div
              className={styles.couponsImg}
            >
              <p>여름맞이 바닷가 행사</p>
              <p>2024.09.01 까지 사용 가능</p>
              <p>10%</p>
            </div>

            {/* right area */}
            <div
              className={styles.couponsInfo}
            >
              <p>총 10번 이상 숙박 예약한 회원</p>
              <p>100,000원 이상 결제시 사용가능</p>
            </div>
          </li>
          <li>
            {/* left area */}
            <div
              className={styles.couponsImg}
            >
              <p>여름맞이 바닷가 행사</p>
              <p>2024.09.01 까지 사용 가능</p>
              <p>8%</p>
            </div>

            {/* right area */}
            <div
              className={styles.couponsInfo}
            >
              <p>총 10번 이상 숙박 예약한 회원</p>
              <p>100,000원 이상 결제시 사용가능</p>
            </div>
          </li>
          <li>
            {/* left area */}
            <div
              className={styles.couponsImg}
            >
              <p>여름맞이 바닷가 행사</p>
              <p>2024.09.01 까지 사용 가능</p>
              <p>20%</p>
            </div>

            {/* right area */}
            <div
              className={styles.couponsInfo}
            >
              <p>총 10번 이상 숙박 예약한 회원</p>
              <p>100,000원 이상 결제시 사용가능</p>
            </div>
          </li>
        </ul>
      </section>
      <BackButton href='/mypage'/>
    </main>
    
    
  )
}

export default page