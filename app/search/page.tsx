'usee client'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AccomDataList from '../components/AccomDataList'
import { useSearchStore } from '../util/useSearchStore'
import { useStore } from 'zustand'
import { AccomDataType } from '../util/types'
import styles from '@/app/styles/Main.module.scss';

const page = () => {

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