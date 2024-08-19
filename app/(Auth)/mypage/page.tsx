

import React from 'react'
import styles from '../../styles/Mypage.module.scss';
import { BsChevronRight, BsHeadphones, BsPencilFill } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';
import { createClient as DB } from '@/supabase/clientt';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { singOut } from '@/app/login/actions';

export const runtime = 'edge';

const page = async () => {
  const supabaseDB = DB();
  const supabase = await createClient();

  const { data : { user} } = await supabase.auth.getUser();

  if(!user){
    redirect("/login");
  }


  //synchronise user and userDB by supabaseDB
  const { data:fetchDB, error } = await supabaseDB
  .from('bookings')
  .select('*')
  .eq('guest_email', user.email);


  if(error){
    console.log("Supabase BOOKINGS Data Fetch failed", error)
  };
  if(!fetchDB || fetchDB === null){
    console.log("Supabase BOOKINGS Data has got some issue")
  };

  const userBookingData = fetchDB 


  // Fetch use information from supabaseDB
  const {data:userDB, error : userError} = await supabaseDB
  .from('users')
  .select('*')
  .eq('email', user.email);

  if(error){
    console.log("Supabase USER Data Fetch failed", error)
  };
  if(!fetchDB || fetchDB === null){
    console.log("Supabase USER Data has got some issue")
  };

  const userData = userDB && userDB[0];


  return (
    <main
      className={styles.mypageMain}
    >
      {/* header area */}
      <section
        className={styles.head}
      >
        <div
          className={styles.imageWrap}
        >
          <Image 
            src={ userData.image || `https://static.vecteezy.com/system/resources/previews/013/360/247/non_2x/default-avatar-photo-icon-social-media-profile-sign-symbol-vector.jpg`}
            fill
            sizes='width:72px hieght:72px'
            alt={ userData }
            className={styles.avatar}
          />
          <button
            className={styles.edit}
          >
            <BsPencilFill 
            />
          </button>
        </div>

        <p className={styles.name} >{userData.name} 님</p>
      </section>

      {/* content body area */}
      <section
        className={styles.infoWrap}
      >
        <ul
          className={styles.accomInfo}
        >
          <li>
            <p>예약한 숙소</p>
            <Link
              href="/mypage/reservation"
            >{userBookingData?.length}
            </Link>
          </li>
          <li>
            <p>찜한 숙소</p>
            <Link
              href="/mypage/likes"
            >9
            </Link>
          </li>

        </ul>


        
      </section>

      {/* setting area */}
      <section
        className={styles.setting}
      >
        <ul>
          <li>
            <Link
              href='/mypage/coupons'
            >
              <p>쿠폰</p>
              <BsChevronRight />
            </Link>
          </li>
          <li>
            <Link
              href='/mypage/notification'
            >
              <p>알람 설정</p>
              <BsChevronRight />
            </Link>
          </li>
          <div
            className={styles.tellphone}
          >
            <p>고객전화<BsHeadphones /></p>
            <p>1588-7070</p>
          </div>
        </ul>
        <p className={styles.version} >현재 버전 2.01.</p>
      </section>

    </main>
  )
}

export default page