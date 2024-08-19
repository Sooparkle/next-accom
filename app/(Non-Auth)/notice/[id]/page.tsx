import React from 'react';
import styles from '../../../styles/Boards.module.scss';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { createClient } from '@/supabase/clientt';
import BackButton from '@/app/components/BackButton';
import { formatDescription } from '@/app/util/format';

export const runtime = 'edge';


interface dataType {
  id: number;
  created_ad :string;
  title : string;
  description : string;
}

const page = async ({
  params,
} : {
  params : { id : string};
}) => {
  
  const supabase = createClient();
  const { data, error } = await supabase
  .from('notices')
  .select('*')
  .eq('numbers', params.id)

  if (error) {
    console.error("Supabase data fetch failed", error);
    return null;
  }

  if (!data || data.length === 0) {
    console.error("No data found");
    return null;
  }

  const notice = data[0] as dataType;



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
          <h3
            className={styles.noticeDetailH3}
          >공지사항 </h3>
          <h4>{notice?.title }</h4>
        </section>

        <section
          className={styles.noticeDetailBody}
        >
          {
            data ?(
              <>
                <div>{formatDescription(notice?.description)()}</div>
              </>
            ) : (
              <div>{error}</div>
            )
          }
        </section>
        
      </main>
    <Footer />
    </>

  )
}



export default page