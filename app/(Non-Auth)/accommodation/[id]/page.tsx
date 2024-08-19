
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import React from 'react';
import styles from '../../../styles/AccommmodationDetail.module.scss';
import { createClient as DB } from '@/supabase/clientt';
import Image from 'next/image';
import { AccomDataType, UserDBType } from '../../../util/types';
import AsidePrice from './AsidePrice';
import CalendarArea from './CalendarArea';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export const runtime = 'edge';

interface AccomType {
  params: {
    id: string;
  };
}

 const page = async ({ params }: AccomType) => {
  const supabaseDB = DB();
  const supabase = await createClient();
  let accomData: AccomDataType | null = null;


  try {
    const { data, error } = await supabaseDB
      .from('accoms')
      .select()
      .eq('id', params.id);

    if (error) {
      throw new Error('Supabase Data is an issue');
    }

    if (data && data.length > 0) {
      accomData = data[0] as AccomDataType;
    } else {
      console.log("There is no data for the given ID");
    }
  } catch (error) {
    console.log("Supabase has some issue", error);
  }

  const info = accomData?.accom_info.split('/');
  const benefits = accomData?.accom_benefit.split('/');
  const cancels = accomData?.cancel.split('/');

// get User data fetch
  let userDB : UserDBType | null = null;

  try{
    const {data : {user} } = await supabase.auth.getUser();
    
    if(user && userDB == null){
      const { data, error } = await supabaseDB
      .from('users')
      .select()
      .eq('email', user?.email)

      if(error){
        console.log("사용자를 불러 올 수 없습니다.");
      }

      if(data && data.length > 0 ){
        userDB = data[0]
      }
      
    }
  } catch(e){
    console.log("Supabase Data Fetch failed", e);
    userDB = null;
  }



  return (
    <>
      <Header type='' />

      <main className={styles.accomsDetailMain}>
        
        <article>

          {/* Header Image area */}
          <section className={styles.accomDetailImagWrap}>
            {accomData ? (
              <Image 
                src={accomData.img_url} 
                alt={accomData.accom_name} 
                fill
                sizes=''
              />
            ) : (
              <p>No image available</p>
            )}
          </section>

            
          <section className={styles.accomBody}>
            {/* left body area */}
            <div 
              className={styles.accomBodyHeaderWrap}
            >
              <h2>{accomData ? accomData.accom_name : "현재 불러올 수 있는 데이터가 없습니다."}</h2>
              <ul>
                <li>
                  <span>{accomData?.province}</span>
                  <span>{accomData?.cityGu}</span>
                </li>
                <li>
                  <span>{accomData?.accom_type}</span>
                  <div>
                    <span>수용 인원 : 최소{accomData?.min_occupancy}</span>
                    ~
                    <span>최대 {accomData?.max_occupancy}</span>
                  </div>
                </li>
              </ul>
              <section>
                <h3>숙박 설명</h3>
                {accomData ? accomData.description : "현재 불러올 수 있는 데이터가 없습니다."}
              </section>


              <section>
                <h3>숙박 안내</h3>
                {accomData ? (
                  info &&
                  info.map((item, index) => (
                    <p key={`${item} ${index}`} className={styles.accomInfoListDot} >{item}</p>
                  ))
                ) : "현재 불러올 수 있는 데이터가 없습니다."}
              </section>

              <section>
              <h3>숙박 이용</h3>
                {accomData ? (
                  benefits&&
                  benefits.map((item, index) =>(
                    <p key={`${item} ${index}`} className={styles.accomInfoListDot} >{item}</p>
                  ))
                  ) : "현재 불러올 수 있는 데이터가 없습니다."}
              </section>

              <section>
              <h3>숙박 취소</h3>
                {accomData ? (
                  cancels&&
                  cancels.map((item, index)=>(
                    <p key={`${item} ${index}`} className={styles.accomInfoListDot} >{item}</p>
                  ))
                ) : "현재 불러올 수 있는 데이터가 없습니다."}
              </section>
            </div>

            {/* right body area */}
            {
              accomData &&    <AsidePrice accomData={accomData} user={userDB} />
            }

          </section>


          
        </article>
      </main>

      <Footer />
    </>
  );
}

export default page;
