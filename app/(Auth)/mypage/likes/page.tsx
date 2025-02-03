import React from 'react';
import styles from '../../../styles/Mypage.module.scss';
import BackButton from '@/app/components/BackButton';
import Image from 'next/image';
import { IoCloseOutline } from "react-icons/io5";
import { createClient as DB } from '@/supabase/clientt';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
export const runtime = 'edge';

const page = async () => {
  const supabaseDB = DB();
  const supbase = await createClient();

  const { data: { user } } = await supbase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: likeDB, error: likesError } = await supabaseDB
    .from("likes")
    .select("*")
    .eq('users', user.email);

  if (likesError) {
    console.log("Supabase LIKES Data Fetch Failed", likesError);
    return (
      <main className={styles.mypageMain}>
        <section className={styles.head}>
          <h3>찜한 숙소</h3>
          <p>총 : 0개</p>
        </section>
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        <BackButton href='/mypage' />
      </main>
    );
  }

  console.log("LIKES", likeDB)

  if (!likeDB || likeDB.length === 0) {
    return (
      <main className={styles.mypageMain}>
        <section className={styles.head}>
          <h3>찜한 숙소</h3>
          <p>총 : 0개</p>
        </section>
        <p>찜한 숙소가 없습니다.</p>
        <BackButton href='/mypage' />
      </main>
    );
  }

  // Filter and validate accom_ids before querying
  const validAccomIds = likeDB
    .filter(like => like.accom)  // Remove entries with null/undefined accom_id
    .map(like => {
      const id = parseInt(like.accom);
      return isNaN(id) ? null : id;
    })
    .filter(id => id !== null);  // Remove any invalid conversions

    console.log("ACCOME------", validAccomIds)

  if (validAccomIds.length === 0) {
    return (
      <main className={styles.mypageMain}>
        <section className={styles.head}>
          <h3>찜한 숙소</h3>
          <p>총 : 0개</p>
        </section>
        <p>유효한 숙소 정보가 없습니다.</p>
        <BackButton href='/mypage' />
      </main>
    );
  }

  const { data: accomDB, error: accomError } = await supabaseDB
    .from("accoms")
    .select("id, accom_name, img_url, description")
    .in('id', validAccomIds);  // Use IN operator with validated IDs

  if (accomError) {
    console.error("Supabase ACCOMS Data Fetch Failed", accomError);
    return (
      <main className={styles.mypageMain}>
        <section className={styles.head}>
          <h3>찜한 숙소</h3>
          <p>총 : {validAccomIds.length}개</p>
        </section>
        <p>숙소 정보를 불러오는 중 오류가 발생했습니다.</p>
        <BackButton href='/mypage' />
      </main>
    );

  }
  console.log('ACCOM', accomDB)

  return (
    <main className={styles.mypageMain}>
      <section className={styles.head}>
        <h3>찜한 숙소</h3>
        <p>총 : {accomDB?.length || 0}개</p>
      </section>
      
      {accomDB && accomDB.length > 0 && (
        <article>
          <ul className={styles.likesListWrap}>
            {accomDB.map((accom) => (
              <li key={accom.id}>
                <h4>{accom.accom_name}</h4>
                <div className={styles.likesDetailWrap}>
                  <div className={styles.likesEachImageWrap}>
                    <Image 
                      src={accom.img_url || "/placeholder-image.jpg"}
                      fill
                      alt={`${accom.accom_name} 숙소`}
                    />
                  </div>
                  <div className={styles.likesDetail}>
                    <p>{accom.description}</p>
                  </div>
                  <button className={styles.likesCancelBtn}>
                    <IoCloseOutline className={styles.heatFilled}/>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </article>
      )}
      <BackButton href='/mypage' />
    </main>
  );
};

export default page;