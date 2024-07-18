import React from 'react'
import styles from '../../../styles/Setting.module.scss';
import BackButton from '@/app/components/BackButton';

const page = () => {
  return (
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
      <section
        className={styles.eventNoticeWrap}
      >
      <div className={styles.eventHead}>
        <div>번호</div>
        <div>제목</div>
      </div>
        <ul className="notice-table">
          <li>
              <div className="notice-order">8</div>
              <div className="notice-title">우리 고향 어떻게 여행하면 좋을까?</div>
            </li>
          <li>
              <div className="notice-order">7</div>
              <div className="notice-title">반려견/묘를 대리고 갈 수 있는 숙박</div>
            </li>
          <li>
              <div className="notice-order">6</div>
              <div className="notice-title">숙박 선택 시 유의해야 할 사항</div>
            </li>
          <li>
              <div className="notice-order">5</div>
              <div className="notice-title">점검 안내 안전한 여름 휴가를 위해서</div>
            </li>
          <li>
            <div className="notice-order">4</div>
            <div className="notice-title">여름 휴가 숙박비 이벤트 안내</div>
          </li>
          <li>
            <div className="notice-order">3</div>
            <div className="notice-title">점검 안내, 2024년 6월 홈페이지 점검 안내</div>
          </li>
          <li>
            <div className="notice-order">2</div>
            <div className="notice-title" >좀쉼쉼 홈페이지 오픈 이벤트를 진행하오니 많은 참여 하겠습니다.</div>
          </li>
          <li>
            <div className="notice-order">1</div>
            <div className="notice-title">2024.03월 홈페이지가 오픈하였습니다.</div>
          </li>
        </ul>

        {/* pagenaition 필요 */}
      </section>

      <BackButton />

    </main>
  )
}

export default page