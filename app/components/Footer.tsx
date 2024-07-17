import React from 'react';
import styles from '../styles/Footer.module.scss';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className={styles.footerWrap}>
      <div
        className={styles.footerHeader}
      >
        <Link href='#' >이용약관</Link>
        <Link href='#' >개인정보 처리방침</Link>
      </div>

      <section>
        <p><strong><i>좀쉼쉼</i></ strong></p>
        <p>주소 : 서울특별시 어딘가 산속로 숨어지내리 | 대표이사 : 임수한 | 사업자등록번호 : 154-09-94750</p>
        <p>전자우편주소 :imsoohanmu@gmail.com | 통신판매번호 : 2024-서울강남-9999 | 관광사업자 등록번호 : 제9999-01호 | 전화번호 : 1588-7070 | 호스팅서비스제공자의 상호 표시 : 좀쉼쉼</p>
        <p>좀쉼쉼은 통신판매중개자로서 통신판매의 당사자가 아니며, 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.</p>

      </section>
    </footer>
    
  )
}

export default Footer
