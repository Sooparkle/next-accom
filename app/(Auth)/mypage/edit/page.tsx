import React from 'react'
import styles from '../../../styles/Edit.module.scss';
import EditPart from '@/app/components/EditPart';
import BackButton from '@/app/components/BackButton';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const page = () => {


  return (
    <>
      <Header type="" />
      <main
        className={styles.mypageMain}
      >
              {/* head area */}
              <section
          className={styles.head}
        >
          <h3>개인정보 편집</h3>
        </section>



        {/* edit body */}
        <EditPart />

        <BackButton />
      </main>
      <Footer />
    </>
  )
}

export default page