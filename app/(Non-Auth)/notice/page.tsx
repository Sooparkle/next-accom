import React from 'react';
import styles from '../../styles/Boards.module.scss';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { createClient } from '@/supabase/clientt';

interface noticeContentsProps {
  id:number,
  title : string,
  created_at: Date
  index : number,
  data : supabaseData
}

interface supabaseData {
  id :number,
  created_at : Date,
  title : string,
  description : string
}

const NoticeList = ({
  id,
  title,
  created_at,
  index,
  
} : noticeContentsProps) => {
  const refinedDate = new Date(created_at).toLocaleDateString('en-CA');
  
  return (
    <>
    {
      <li
        className={styles.noticeEachWrap}
      >
        <Link 
          href={`notice/${id}`}
          className={styles.noticeEachTitle}
        >
          {title}
        </Link>
        <p className={styles.noticeEachId}>{ refinedDate }</p>
      </li>
    }
    </>
  )
}


export const revalidate = 0;

const page = async () => {

  const supabase = createClient();

const { data, error:supabaseError } = await supabase
.from('notices')
.select()

if(supabaseError){
  console.error("Fetching Error occured", supabaseError)
  return
}


  
  return (
    <>
      <Header type='' />
      <main
        className={styles.mypageMain}
      >
        
        {/* head area */}
        <section
          className={styles.head}
        >
          <h3>공지사항</h3>
        </section>

        {/* notice body */}
        <article
          className={styles.mypageNotice}
        >
          <div
            className={styles.noticeHeader}
          >
            <p>제목</p>
            <p>날짜</p>
          </div>

          <ul
            className={styles.noticeListWrap}
          >
            {
              data ? (
                data.map((item, index) =>(
                  <NoticeList {...item} index={index} key={item.id} data={data} />
                ))

              ) : (
                <p>{supabaseError} </p>
              )

            }

          </ul>

        </article>
      </main>
      <Footer />
    </>
  )
}

export default page