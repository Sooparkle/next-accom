import Link from 'next/link';
import React from 'react';
import styles from '../styles/Mypage.module.scss';

export const BackButton = () => {

  return (
    <div
      className={styles.backBtn}
    >
      <Link
        href="/mypage"
        >뒤로가기
      </Link>
    </div>
  )
}

export default BackButton