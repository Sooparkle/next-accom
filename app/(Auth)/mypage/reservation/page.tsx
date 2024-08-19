
import React from 'react';
import styles from '../../../styles/Mypage.module.scss';
import BackButton from '@/app/components/BackButton';
import Image from 'next/image';
import { createClient as DB } from '@/supabase/clientt';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { formatCurrency } from '@/app/util/currencyFormat';
import CancleButton from './CancelButton';

export const runtime = 'edge';

 const page = async () => {
  const supabaseDB = DB();
  const supabase = await createClient();

  // Call User
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Synchronise user with DB
  const { data: fetchDB, error } = await supabaseDB
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('guest_email', user.email);

  if (error) {
    console.log("Supabase BOOKINGS Data Fetch failed", error);
  }

  if (!fetchDB || fetchDB === null) {
    console.log("Supabase BOOKINGS Data has some issue");
  }


  // Fetch Booking data 
  const userBookingData = fetchDB || []; 
  // Fetch only for accommodation images
  const accomsImages = async (id :number) => {
    let { data, error } = await supabaseDB
      .from('accoms')
      .select('img_url')  // Assuming the column name for the image URL is 'image_url'
      .eq('id', id)
      .single();
  
    if (error) {
      console.log("Supabase ACCOMS Data Fetch failed", error);
      return null;
    }
  
    if (!data || data === null) {
      console.log("Supabase ACCOMS Data has some issue");
      return null;
    }
  
    return data.img_url;
  };
  


  // Pre-fetch all image URLs
  const imagePromises = userBookingData.map(async (item) => {
    const imageUrl = await accomsImages(item.accom_id);
    return {
      ...item,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Fallback image URL
    };
  });

  // Wait for all image URLs to be fetched
  const userBookingDataWithImages = await Promise.all(imagePromises);
  

  return (
    <main className={styles.mypageMain}>
      {/* header area */}
      <section className={styles.head}>
        <h3>예약한 숙소</h3>
        <p>총 : {userBookingDataWithImages.length}</p>
      </section>

      {/* contents area */}
      <section>
        <ul className={styles.reservationListWrap}>
          {userBookingDataWithImages.map((item, index) => (
            <li key={`${item.id} - ${index}`}>
              <div className={styles.reservationEachImageWrap}>
                <Image 
                  src={item.imageUrl}
                  fill
                  sizes='(max-width: 150px) 100vw, 150px'
                  alt={`${item.accom_name} 숙소`}
                />
              </div>

              <div className={styles.reservationDetail}>
                <p>{item.accom_name}</p>
                <p>{item.start_date} ~ {item.end_date}</p>
                <p>성인 <span>{item.extra_adult || 0}</span>, 어린이 <span>{item.extra_child || 0}</span> </p>
              </div>

              <div className={styles.reservationStatus}>
                <p>{item.order_status === 'confirm' ? <span className={styles.confirmDone}>예약완료</span> 
                : <span className={styles.confirmIng}>예약 진행중</span> }</p>
                <p>{formatCurrency(item.total_price)}</p>

                <CancleButton bookingId={item.id} />

              </div>
            </li>
          ))}
        </ul>
      </section>

      <BackButton href='/mypage'/>
    </main>
  );
}

export default page;
