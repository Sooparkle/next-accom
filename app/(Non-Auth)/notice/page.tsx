
import React from 'react';
import styles from '../../styles/Boards.module.scss';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { createClient } from '@/supabase/clientt';
import NoticeList from '@/app/components/NoticeList';

interface supabaseData {
  id :number,
  created_at : Date,
  title : string,
  description : string,
  numbers : number
}

interface NoticeListProps {
  data :supabaseData[]
}

const ITEMS_PER_PAGE = 2;


export const revalidate = 6000;

const page = async ({ searchParams} : { searchParams: {page?:string | null} } ) => {
  const supabase = createClient();

  const page = searchParams.page ? parseInt(searchParams.page) : 1 ;
  const offset = (page - 1) * ITEMS_PER_PAGE;
  console.log("searchParams", searchParams)


  //Supabase fetch for only a certain table count
  const { data:totalTableCount, count } = await supabase
  .from('notices')
  .select('*', { count: 'exact', head: true})

console.log("a certain", count)

  //Supabase fetch based on range setting
  const { data, error:supabaseError } = await supabase
  .from('notices')
  .select()
  .order('created_at', { ascending: false })
  .range(offset, offset + ITEMS_PER_PAGE - 1); //Limit the query result by starting at an offset (from) and ending at the offset (from + to).

  if(supabaseError){
    console.error("Fetching Error occured", supabaseError)
    return
  }

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  console.log("totalPages",totalPages)
  console.log("--------------------")
  // console.log(data)
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


            {
              data ? (
                  <NoticeList data={data} totalPages={totalPages} />
              ) : (
                <p>{supabaseError} </p>
              )
            }


        </article>
      </main>
      <Footer />
    </>
  )
}

export default page