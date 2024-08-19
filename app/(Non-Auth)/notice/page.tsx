

import React from 'react';
import styles from '../../styles/Boards.module.scss';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { createClient } from '@/supabase/clientt';
import NoticeList from './NoticeList';


export const runtime = 'edge';

interface NoticeDataType {
  id : string;
  created_at : string;
  title : string;
  description : string;
  numbers : number;
}


const page = async ({ searchParams} : { searchParams: {page?:string | null} } ) => {
  const supabase = createClient();
  const ITEMS_PER_PAGE = 4;
  
  const page = searchParams.page ? parseInt(searchParams.page) : 1 ;
  const offset = (page - 1) * ITEMS_PER_PAGE;

  let fetchDatas: NoticeDataType[] | null = null;


  //Supabase fetch for only a certain table count
  const { data:totalTableCount, count, error } = await supabase
  .from('notices')
  .select('*', { count: 'exact', head: true});
  
  if(error){
    console.log("TotlatalbCound fatch failed", error)
  }
  

  //Supabase fetch based on range setting
  const { data, error:supabaseError } = await supabase
  .from('notices')
  .select()
  .order('created_at', { ascending: false })
  .range(offset, offset + ITEMS_PER_PAGE - 1); 
  //Limit the query result by starting at an offset (from) and ending at the offset (from + to).

  if(supabaseError){
    console.error("Fetching Error occured", supabaseError)
    return
  }
  if (data && data.length > 0 ){
    fetchDatas = data
  }

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);


  // console.log(fetchDatas)
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

          <NoticeList data={fetchDatas} totalPages={totalPages} />


        </article>
      </main>
      <Footer />
    </>
  )
}

export default page