
import React from 'react'
import styles from '../../styles/Boards.module.scss';
import BackButton from '@/app/components/BackButton';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import EventContentsDetails from './EventContentsDetails';
import { createClient as DB} from '@/supabase/clientt';

export const runtime = 'edge';

interface EventTypes {
  id : number,
  date : string,
  title : string,
  contents : string,
}
const page = async () => {
  const supabaseDB = DB();



  let { data: events, error } = await supabaseDB
  .from('events')
  .select('*')
  .order('created_at', { ascending: false })

          
  if(error){
    console.log('Supabase Event Data Fetch failed',error)
  }
  if(!events || events.length === 0){
    console.log('Supbase Event Data has issue')
  }



  
  return (
    <>
      <Header type=''/>
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
      <article
        className={styles.eventNoticeWrap}
      >
      <div className={styles.eventHead}>
        <div>제목</div>
        <div>번호</div>
      </div>

        <EventContentsDetails EventDatas={events} />

      </article>

      <BackButton href='/mypage' />

      </main>
      <Footer />
    </>
  )
}

export default page