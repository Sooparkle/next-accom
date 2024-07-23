'use client'
import React, { useState } from 'react'
import styles from '../../styles/Boards.module.scss';
import EventDatas from '@/app/data/eventDatas';
import { formatDescription } from '@/app/util/format';


const initialCounter = 6;

const EventContentsDetails = () => {
  const [ visualCount, setVisualCount ] = useState<number>(initialCounter)


  console.log(visualCount)

  return (
    <> 
      {
        EventDatas?.slice(0, visualCount).map(item  => (
          <details
            className={styles.eventDetailsTag}
            key={item.id}
          >
            <summary>{item.title} <span className={styles.eventDate}>{item.date}</span></summary>
              <div
                className={styles.eventBody}
              >{formatDescription(item.contents)}</div>
          </details>
        ))
      }

      {
          <button
            className={styles.eventIncrementBtn}
            onClick={()=>setVisualCount(prev => prev + prev)}
            disabled={visualCount === EventDatas.length||visualCount > EventDatas.length}
          >더보기 {Math.ceil(visualCount/initialCounter)} / {Math.ceil(EventDatas.length/initialCounter)}
          </button>
        
      }

    </>
  )
}

export default EventContentsDetails