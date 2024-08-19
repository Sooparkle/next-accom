'use client'
import React, { useState } from 'react'
import styles from '../../styles/Boards.module.scss';
import { formatDescription } from '@/app/util/format';
import { EventDataType } from '@/app/util/types';


const initialCounter = 6;

const EventContentsDetails = ({EventDatas}: {EventDatas : EventDataType[] | null}) => {
  const [ visualCount, setVisualCount ] = useState<number>(initialCounter)
  

  return (
    <> 
      {
        EventDatas?.slice(0, visualCount).map(item  => (
          <details
            className={styles.eventDetailsTag}
            key={item.id}
          >
            <summary>{item.title} <span className={styles.eventDate}>{item.created_at}</span></summary>
              <div
                className={styles.eventBody}
              >{formatDescription(item.contents)()}</div>
          </details>
        ))
      }

      {
          <button
            className={styles.eventIncrementBtn}
            onClick={()=>setVisualCount(prev => prev + prev)}
            disabled={visualCount === EventDatas?.length||visualCount > EventDatas!.length}
          >더보기 {Math.ceil(visualCount/initialCounter)} / {Math.ceil(EventDatas!.length/initialCounter)}
          </button>
        
      }

    </>
  )
}

export default EventContentsDetails