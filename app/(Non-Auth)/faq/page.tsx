
import React from 'react';
import styles from '../../styles/Boards.module.scss';
import faq from '../../data/faq';
import BackButton from '@/app/components/BackButton';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FaqBody from './FaqBody';

export const runtime = 'edge';

type contentsType = {
  id : number,
  category : string,
  title : string,
  contents : string,
}

const page = async () => {


  return (
    <>
    <Header type=''/>
    <main
      className={styles.mypageMain}
    >
      {/* head */}

      <section
        className={styles.head}
      >
        <h3>자주하는 질문</h3>
      </section>


      {/* faq content area */}
      <FaqBody data={faq} />

      <BackButton href='/mypage' />
    </main>
  <Footer />
  </>
  )
}

export default page