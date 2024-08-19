'use client'
import React,{useState, useEffect} from 'react'
import { useStore } from 'zustand'
import { useSearchStore } from '../util/useSearchStore';
import { createClient } from '@/supabase/clientt'
import styles from '../styles/Main.module.scss';
import Link from 'next/link'
import Image from 'next/image'
import { AccomDataType } from '../util/types'


const AccomDataList = ({data} : {data:AccomDataType[]}) => {
  const accoms = useStore(useSearchStore, (state => state.searchResults));
  const supabase = createClient();

  let accommodationList  = accoms.data!

  return ( accoms.message === 'initial' || accoms.message === 'null'  ? (
  
    <section>
        <h3> 검색결과 : {accoms.data?.length}</h3>
        검색된 데이터가 없습니다.
    </section>
  ) : (
    <article
    className={styles.AccommodationListWrap}
    >
      <h4> 검색결과 : {accoms.data?.length}</h4>

      <section>
        
        <ul>
        {
          accoms.data?.map((accom) => (
            <li key={accom.id} className={styles.accomCardWrap}>
              <Link 
                href={`accommodation/${accom.id}`}
              >
                <div
                  className={styles.mainImageWrap}
                >
                  <Image 
                    src={accom.img_url}
                    fill
                    alt={accom.accom_name}
                    sizes="(min-width: 250pxpx) 100%, (max-width: 400px) 100%"
    
                  />
                </div>
                <div
                  className={styles.maininfo}
                >
                  <p
                    className={styles.typeScore}
                  >
                    <span>{accom.accom_type}</span>
                    <span>{accom.score}</span>
                  </p>
                  <h4>{accom.province} {accom.cityGu}</h4>
                  <p>인원 : 최소<span>{accom.min_occupancy}</span> ~ 최대<span>{accom.max_occupancy}</span></p>
                  <p className={styles.mainPrice}>{accom.price} ₩</p>
                </div>
                
              </Link>
              </li>
          ))
          }
        </ul>
      </section>
    </article>
  )
  )
}

export default AccomDataList