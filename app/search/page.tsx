
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AccomDataList from '../components/AccomDataList'
import styles from '@/app/styles/Main.module.scss';

export const runtime = 'edge';

const page = async () => {

  return (
    <>
    <Header type='search'/>
    <main
    className={styles.mainMain}
    >
      <AccomDataList data={[]} />

    </main>
    <Footer />
    </>
  )
}

export default page